# Deploy JMS DGI portfolio to GitHub Pages

This package is ready to upload as **files**, not as a ZIP archive.

## Step 1 — Create a repository

On the GitHub account `jms-rnld-dgi`, visit https://github.com/new and create a **public** repository named `portfolio`. Do not initialize it with a README, .gitignore, or license.

## Step 2 — Upload files

Open the empty repository > **uploading an existing file**. Drag all the files and folders from **inside** this package into the upload area, including the hidden `.github` directory and `.nojekyll` file. Commit to `main`.

GitHub's browser upload may not reliably preserve hidden folders on all systems. If `.github/workflows/deploy.yml` does not appear in the repository after upload, use Git in VS Code instead:

```powershell
cd path\to\jms-dgi-portfolio-deploy
git init
git add .
git commit -m "Deploy personal portfolio"
git branch -M main
git remote add origin https://github.com/jms-rnld-dgi/portfolio.git
git push -u origin main
```

## Step 3 — Enable GitHub Pages

Repository > **Settings** > **Pages** > **Build and deployment** > **Source: GitHub Actions**. The included `.github/workflows/deploy.yml` automatically deploys on every push to `main`. Check **Actions** for the deployment result.

Expected website URL (once deployed):
https://jms-rnld-dgi.github.io/portfolio/

If you later change your GitHub username, update the expected URL and Cloudflare hostname. The repository name `portfolio` does not become a Turnstile hostname.

## Step 4 — Finish Cloudflare Turnstile later

The contact form is **temporarily hidden** on the public site because the Turnstile sitekey and Worker URL are placeholders. Visitors can still email you via the contact section.

After configuring Turnstile and deploying the Worker:
1. Replace both `YOUR_TURNSTILE_SITE_KEY` placeholders in `index.html`.
2. Replace the placeholder Worker URL in `window.JR_CONTACT_CONFIG`.
3. Uncomment the Turnstile script tag near the end of `index.html`.
4. Remove the `hidden` attribute from `<form id="contactForm">`.
5. Remove the `<p id="contactSetupNotice">` block.
6. Commit and push the changes; GitHub Actions redeploys automatically.
7. Test a real form submission and check your email (including any FormSubmit activation message).

The Cloudflare Worker files are in `cloudflare-worker/`. GitHub Pages does not execute Workers; the workflow deliberately excludes that directory from the public website.
