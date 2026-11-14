
# James Ronald Daguio — Personal Portfolio

A personal portfolio website showcasing my background, projects, technical skills, and journey as a Computer Science student interested in Cybersecurity.

<p align="center">
  <a href="https://jms-rnld-dgi.github.io/jms-minimal-design/">
    <strong>🌐 View Live Website</strong>
  </a>
  &nbsp; • &nbsp;
  <a href="https://github.com/jms-rnld-dgi/jms-minimal-design">
    <strong>📁 Source Code</strong>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

---

## 📖 About the Project

This project is my personal portfolio website, created to introduce myself, showcase my academic and personal projects, and document my development as a Computer Science student.

The website follows a minimalist, monochrome, and editorial-inspired design. It focuses on readability, simplicity, responsive layouts, and interactive elements.

## ✨ Features

- **Home** — Personal introduction and landing section.
- **About** — Background, interests, and technical skills.
- **Labs** — Technical experiments and cybersecurity learning activities.
- **Projects** — Selected academic and personal projects.
- **Background** — Education and experience.
- **Credentials** — Certificates and achievements.
- **Contact** — Contact form for inquiries.
- **Responsive Design** — Adapted for desktop, tablet, and mobile devices.
- **Theme Controls** — Customizable website appearance.
- **Interactive Chatbot** — Portfolio assistance and navigation.
- **Résumé** — Downloadable résumé.
- **Contact Security** — Cloudflare Turnstile verification and server-side validation through a Cloudflare Worker.

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling, animations, and responsive layout |
| JavaScript | Interactions and functionality |
| Cloudflare Turnstile | Contact form verification |
| Cloudflare Workers | Contact form backend |
| GitHub Pages | Website hosting |

## 📂 Project Structure

```text
jms-minimal-design/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── assets/
│   ├── james-ronald-daguio-resume.pdf
│   └── pfp.jpg
│
├── cloudflare-worker/
│   ├── src-worker.js
│   └── wrangler.toml
│
├── css/
│   └── styles.css
│
├── js/
│   └── main.js
│
├── .nojekyll
├── DEPLOY.md
├── index.html
└── README.md
```

## 🚀 Run Locally

To run the portfolio on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/jms-rnld-dgi/jms-minimal-design.git
   ```

2. Navigate to the project folder:

   ```bash
   cd jms-minimal-design
   ```

3. Open the folder in Visual Studio Code:

   ```bash
   code .
   ```

4. Open `index.html` using the Live Server extension or your preferred local development server.

## 🌐 Deployment

This portfolio is hosted using **GitHub Pages**.

Live Website:

https://jms-rnld-dgi.github.io/jms-minimal-design/

The repository includes a GitHub Actions workflow that handles deployment when changes are pushed to the `main` branch.

## 📬 Contact Form Architecture

The contact form uses a separate Cloudflare Worker to process submissions.

```text
Visitor
   │
   ▼
Portfolio Contact Form
   │
   ▼
Cloudflare Turnstile
   │
   ▼
Cloudflare Worker
   │
   ├── Request Validation
   ├── Rate Limiting
   └── Turnstile Verification
   │
   ▼
Email Forwarding
```

Security features include:

- Cloudflare Turnstile verification.
- Server-side token validation.
- Request and input validation.
- Rate limiting.
- Allowed-origin checking.
- Secret keys stored as Worker secrets.

**Note:** Turnstile has been observed working on mobile data, while Wi-Fi loading is still being investigated. End-to-end email delivery should be tested before considering the contact form fully verified.

## 🎓 Academic Information

| Information | Details |
|---|---|
| Name | James Ronald Daguio |
| Program | Bachelor of Science in Computer Science |
| Institution | Cavite State University – Bacoor City Campus |
| Interest | Cybersecurity |
| Career Goal | Cybersecurity Professional |

## 🔐 Areas of Interest

- Cybersecurity
- Vulnerability Assessment and Penetration Testing (VAPT)
- Network Security
- Ethical Hacking
- Web Development
- Information Security

## 📄 Credits and Disclaimer

This portfolio was developed for personal branding, academic presentation, and professional development.

All project descriptions and materials are presented for educational and portfolio purposes. Third-party trademarks, technologies, and resources belong to their respective owners.

---

<p align="center">
  Designed and developed by <strong>James Ronald Daguio</strong>
  <br>
  © 2026 All Rights Reserved.
</p>
