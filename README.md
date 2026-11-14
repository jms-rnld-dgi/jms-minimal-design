# James Ronald Daguio --- Personal Portfolio

A personal portfolio website showcasing my background, projects,
technical interests, and journey as a **BS Computer Science student at
Cavite State University -- Bacoor City Campus**, with a growing interest
in cybersecurity.

```{=html}
<p align="center">
```
`<a href="https://jms-rnld-dgi.github.io/jms-minimal-design/">`{=html}`<strong>`{=html}Visit
the Live Website`</strong>`{=html}`</a>`{=html}  · 
`<a href="https://github.com/jms-rnld-dgi/jms-minimal-design">`{=html}`<strong>`{=html}View
Source Code`</strong>`{=html}`</a>`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<img src="https://img.shields.io/badge/status-live-success" alt="Live status">`{=html}
`<img src="https://img.shields.io/badge/HTML5-structure-orange" alt="HTML5">`{=html}
`<img src="https://img.shields.io/badge/CSS3-styling-blue" alt="CSS3">`{=html}
`<img src="https://img.shields.io/badge/JavaScript-vanilla-yellow" alt="JavaScript">`{=html}
`<img src="https://img.shields.io/badge/hosting-GitHub%20Pages-222" alt="GitHub Pages">`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

## About the Project

This portfolio presents my profile, interests, selected projects,
learning activities, and contact information through a responsive,
minimalist interface.

It is built with semantic HTML, CSS, and vanilla JavaScript. The project
does not require a front-end framework, package manager, or build
process.

## Features

-   **Responsive layout** -- adapts to desktop, tablet, and mobile
    screens.
-   **Portfolio sections** -- Home, About, Labs, Projects, Background,
    Credentials, and Contact.
-   **Theme controls** -- light and dark appearance.
-   **Interactive utilities** -- chatbot and additional interface
    interactions.
-   **Résumé download** -- downloadable PDF résumé.
-   **Protected contact form** -- Cloudflare Turnstile verification and
    a Cloudflare Worker backend.

## Built With

  Technology             Purpose
  ---------------------- -----------------------------------------------------
  HTML5                  Semantic page structure and content
  CSS3                   Layout, styling, transitions, and responsive design
  JavaScript (Vanilla)   Navigation and interactive features
  Cloudflare Turnstile   Visitor verification
  Cloudflare Workers     Contact form API and server-side validation
  FormSubmit             Email delivery
  GitHub Pages           Static website hosting
  GitHub Actions         Automated deployment

No framework, package manager, or build step is required.

## Project Structure

``` text
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

1.  Clone the repository:

    ``` bash
    git clone https://github.com/jms-rnld-dgi/jms-minimal-design.git
    ```

2.  Open the project folder:

    ``` bash
    cd jms-minimal-design
    ```

3.  Start a local static server.

    **Windows:**

    ``` powershell
    py -m http.server 8000
    ```

    **macOS / Linux:**

    ``` bash
    python3 -m http.server 8000
    ```

4.  Open <http://localhost:8000> in your browser.

You can also open `index.html` directly. A local server is recommended
for consistent behavior.

## Deployment (GitHub Pages)

This repository uses GitHub Actions to publish the static website.

1.  Open **Settings → Pages** in the repository.
2.  Under **Build and deployment**, select **GitHub Actions** as the
    source.
3.  Push a commit to `main`, or manually run the deployment workflow
    from the **Actions** tab.
4.  Wait for the workflow to complete successfully.
5.  Visit the [live
    portfolio](https://jms-rnld-dgi.github.io/jms-minimal-design/).

Every new push to `main` triggers a deployment.

## Contact Form

The contact form uses the following request flow:

1.  A visitor completes the form and the Cloudflare Turnstile challenge.
2.  `js/main.js` sends the form fields and verification token to the
    Cloudflare Worker.
3.  `cloudflare-worker/src-worker.js` checks the request origin, applies
    rate limiting, validates the form fields, and verifies the token
    through Cloudflare Siteverify.
4.  Accepted messages are forwarded to FormSubmit for email delivery.

**Worker endpoint:**

`https://jr-portfolio-contact.jamesrdaguio.workers.dev/api/contact`

### Worker Configuration

The deployed Worker requires:

-   `TURNSTILE_SECRET_KEY` --- private secret stored in Cloudflare
    Worker settings.
-   `CONTACT_LIMITER` --- rate-limit binding.
-   Rate limit --- 5 requests per IP per 60 seconds.
-   Allowed origin --- `https://jms-rnld-dgi.github.io`.
-   Expected Turnstile hostname --- `jms-rnld-dgi.github.io`.

The Turnstile sitekey is public and is configured in `index.html`.
**Never publish the Turnstile secret key or place it in client-side
code.**

**Current verification status:** The portfolio and Worker are deployed.
Turnstile rendering has been observed on mobile data, while rendering on
the Wi-Fi network is still being troubleshot. End-to-end email delivery
has not yet been confirmed.

## Featured Project

### Hyouka Character Tribute --- Houtarou Oreki

-   **Live website:**
    https://jms-rnld-dgi.github.io/Character-Tribute-Website-Project/
-   **Source repository:**
    https://github.com/jms-rnld-dgi/Character-Tribute-Website-Project

## Cybersecurity Learning Profiles

-   **TryHackMe:** https://tryhackme.com/p/jamesrdaguio
-   **Hack The Box:**
    https://profile.hackthebox.com/profile/01a1da48-59f2-739e-94ac-3b824cd6ca5b

These are learning profiles and do not imply completed certifications.

## Academic Information

-   **Developer:** James Ronald Daguio
-   **Program:** Bachelor of Science in Computer Science
-   **Institution:** Cavite State University -- Bacoor City Campus
-   **Interest:** Cybersecurity

## Credits and Privacy

This portfolio uses third-party tools and services where noted. Project
media, fonts, and other assets remain the property of their respective
owners.

The public résumé is stored at `assets/james-ronald-daguio-resume.pdf`.
Review personal information in the PDF before distributing or replacing
it.

------------------------------------------------------------------------

```{=html}
<p align="center">
```
Made as a personal portfolio and a continuing front-end development
project.
```{=html}
</p>
```
