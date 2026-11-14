const ALLOWED_ORIGIN = "https://jms-rnld-dgi.github.io";
const ALLOWED_HOSTNAME = "jms-rnld-dgi.github.io";
const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/jamesrdaguio@gmail.com";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(origin) }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (origin !== ALLOWED_ORIGIN) return json({ success: false, message: "Origin not allowed." }, 403, origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") return json({ success: false, message: "Method not allowed." }, 405, origin);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const limit = await env.CONTACT_LIMITER.limit({ key: ip });
    if (!limit.success) return json({ success: false, message: "Too many attempts. Please try again later." }, 429, origin);

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ success: false, message: "Invalid request." }, 400, origin);
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";
    const token = typeof data.token === "string" ? data.token : "";

    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        email.length > 254 || message.length < 5 || message.length > 5000 ||
        !token || token.length > 2048) {
      return json({ success: false, message: "Please check your details and try again." }, 400, origin);
    }

    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip
      })
    });

    if (!verify.ok) return json({ success: false, message: "Security verification is temporarily unavailable." }, 502, origin);
    const verification = await verify.json();
    if (!verification.success || verification.hostname !== ALLOWED_HOSTNAME) {
      return json({ success: false, message: "Security check failed. Please try again." }, 403, origin);
    }

    const delivery = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: "New portfolio message — James Ronald Daguio",
        _template: "table"
      })
    });

    let deliveryResult = {};
    try { deliveryResult = await delivery.json(); } catch {}
    if (!delivery.ok || deliveryResult.success === false) {
      return json({ success: false, message: "Your message could not be delivered. Please email jamesrdaguio@gmail.com directly." }, 502, origin);
    }

    return json({ success: true }, 200, origin);
  }
};
