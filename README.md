> **Deployment:** See [DEPLOY.md](DEPLOY.md). The public contact form is temporarily hidden until Cloudflare Turnstile and the Worker are configured.

# jr. — Minimalist Cybersecurity Portfolio

A responsive, monochrome personal portfolio for James Ronald Daguio, a BS Computer Science student at Cavite State University–Bacoor City Campus with an interest in cybersecurity. Built with semantic HTML, CSS, and vanilla JavaScript.

## Run locally

1. Open the `jr-portfolio/` folder in VS Code.
2. Launch `index.html` with Live Server, or open it directly in a browser.
3. The contact form is hidden until Cloudflare Turnstile and the Worker have been configured and deployed.

## Project structure

```text
jr-portfolio/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── pfp.jpg
│   └── james-ronald-daguio-resume.pdf
├── cloudflare-worker/
│   ├── src-worker.js
│   └── wrangler.toml
└── README.md
```

## Featured project

### Hyouka Character Tribute — Houtarou Oreki

- Live website: https://jms-rnld-dgi.github.io/Character-Tribute-Website-Project/
- Source repository: https://github.com/jms-rnld-dgi/Character-Tribute-Website-Project

The project card includes four preview screenshots hosted in the source repository.

## Cybersecurity learning profiles

- TryHackMe: https://tryhackme.com/p/jamesrdaguio
- Hack The Box: https://profile.hackthebox.com/profile/01a1da48-59f2-739e-94ac-3b824cd6ca5b

These are learning profiles, not claims of completed certifications.

## Contact form: Cloudflare Turnstile

The contact form is wired to a Cloudflare Worker. The Worker checks the request origin, validates the Turnstile token server-side, applies an IP-based rate limit (5 requests per minute), validates the form fields, and forwards accepted messages to FormSubmit at `jamesrdaguio@gmail.com`.

**Current status: prepared, not live.** The HTML contains a placeholder sitekey and Worker URL. The Worker needs your Cloudflare Turnstile secret as a Worker secret and must be deployed. Do not publish the secret key or paste it into HTML/JavaScript.

### One-time setup

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), open Turnstile and create a widget for the hostname `jms-rnld-dgi.github.io`. Managed mode is a suitable default.
2. Copy the public **sitekey** and private **secret key**.
3. In `index.html`, replace `YOUR_TURNSTILE_SITE_KEY` in both the Turnstile widget's `data-sitekey` and `window.JR_CONTACT_CONFIG.siteKey` with the public sitekey.
4. Install Node.js, then authenticate Wrangler:
   ```bash
   npx wrangler login
   ```
5. Open a terminal in `cloudflare-worker/` and set the secret:
   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```
   Paste the private Turnstile secret when prompted.
6. Deploy the Worker:
   ```bash
   npx wrangler deploy
   ```
7. Copy the deployed Worker URL. In `index.html`, set `window.JR_CONTACT_CONFIG.apiUrl` to that URL followed by `/api/contact`.
8. Commit and push the updated portfolio to GitHub Pages.
9. Test the live contact form. FormSubmit may send a one-time activation email to `jamesrdaguio@gmail.com`; confirm it if prompted.

### Important security notes

- The sitekey is public; the secret key must remain in the Cloudflare Worker secret store.
- Turnstile tokens are verified by the Worker through Cloudflare Siteverify; client-side widget display alone is not sufficient.
- The Worker only accepts requests from `https://jms-rnld-dgi.github.io` and checks the expected hostname.
- The configured rate limit is 5 requests per IP per 60 seconds.
- Do not test with sensitive personal information.

Official docs: [Turnstile setup](https://developers.cloudflare.com/turnstile/get-started/), [server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [Wrangler](https://developers.cloudflare.com/workers/wrangler/), and [FormSubmit AJAX](https://formsubmit.co/ajax-documentation).

## Resume and privacy

The downloadable resume is `assets/james-ronald-daguio-resume.pdf`. The public copy omits the personal phone number and residential street address.

## Customize

- Replace `assets/pfp.jpg` to change the profile photo (keep the same filename).
- Edit personal details, links, project content, and the public Turnstile sitekey/Worker URL in `index.html`.
- Edit styles in `css/styles.css` and interactions in `js/main.js`.

## Technology

HTML5 · CSS3 · Vanilla JavaScript · Cloudflare Turnstile · Cloudflare Workers · FormSubmit
