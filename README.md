# jr. — Personal Portfolio

A responsive, minimalist portfolio for **James Ronald Daguio**, a BS Computer Science student at Cavite State University–Bacoor City Campus interested in cybersecurity.

**Live Website:** https://jms-rnld-dgi.github.io/jms-minimal-design/

Built with HTML5, CSS3, and Vanilla JavaScript. No framework or build step required.

## Features

- Responsive portfolio design
- Home, About, Labs, Projects, Background, Credentials, and Contact
- Light and dark themes
- Interactive chatbot and portfolio utilities
- Downloadable résumé
- Cloudflare Turnstile-protected contact form

## Project Structure

```text
jms-minimal-design/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
│   ├── pfp.jpg
│   └── james-ronald-daguio-resume.pdf
├── cloudflare-worker/
│   ├── src-worker.js
│   └── wrangler.toml
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── .nojekyll
├── DEPLOY.md
├── index.html
└── README.md
```

## Run Locally

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser or use Live Server.

No dependencies or build commands are required.

## Deployment

Hosted using GitHub Pages.

- Website: https://jms-rnld-dgi.github.io/jms-minimal-design/
- Repository: https://github.com/jms-rnld-dgi/jms-minimal-design
- Workflow: `.github/workflows/deploy.yml`

Every push to `main` triggers deployment.

## Contact Form

The contact form uses:

1. HTML form interface
2. Cloudflare Turnstile verification
3. Cloudflare Worker backend
4. IP-based rate limiting
5. FormSubmit email delivery

**Worker endpoint:**

`https://jr-portfolio-contact.jamesrdaguio.workers.dev/api/contact`

Required Worker configuration:

- `TURNSTILE_SECRET_KEY` — private Cloudflare secret
- `CONTACT_LIMITER` — rate-limit binding
- Rate limit: 5 requests per IP per 60 seconds

Never publish the Turnstile secret key.

**Current status:** The frontend and Worker are configured. Turnstile works on mobile data but is still being troubleshot on Wi-Fi. Email delivery has not yet been fully verified.

## Featured Project

### Hyouka Character Tribute — Houtarou Oreki

- Live: https://jms-rnld-dgi.github.io/Character-Tribute-Website-Project/
- Source: https://github.com/jms-rnld-dgi/Character-Tribute-Website-Project

## Cybersecurity Learning Profiles

- TryHackMe: https://tryhackme.com/p/jamesrdaguio
- Hack The Box: https://profile.hackthebox.com/profile/01a1da48-59f2-739e-94ac-3b824cd6ca5b

These are learning profiles, not completed certification claims.

## Customization

| File | Purpose |
|---|---|
| `index.html` | Portfolio content and configuration |
| `css/styles.css` | Styling and responsive layout |
| `js/main.js` | JavaScript interactions |
| `assets/` | Images and résumé |
| `cloudflare-worker/src-worker.js` | Contact API |
| `cloudflare-worker/wrangler.toml` | Worker configuration |

## Technology Stack

HTML5 · CSS3 · Vanilla JavaScript · GitHub Pages · Cloudflare Workers · Cloudflare Turnstile · FormSubmit
