# James Ronald Daguio — Personal Portfolio

<p align="center">
  <strong>Computer Science Student | Aspiring Cybersecurity Professional</strong>
</p>

<p align="center">
  A minimalist personal portfolio showcasing my background, projects, technical interests, and journey in Computer Science.
</p>

<p align="center">
  <a href="https://jms-rnld-dgi.github.io/jms-minimal-design/">Live Website</a> ·
  <a href="https://github.com/jms-rnld-dgi/jms-minimal-design">Source Code</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

---

## 01. Overview

Hi, I'm **James Ronald Daguio**, a Computer Science student at Cavite State University – Bacoor City Campus.

I'm interested in technology, software development, and cybersecurity. This portfolio serves as my personal space to document my background, showcase my projects, and share what I'm learning.

The website follows a minimalist, monochrome design approach, focusing on typography, simplicity, and interactive details.

## 02. Preview

<p align="center">
  <a href="https://jms-rnld-dgi.github.io/jms-minimal-design/">
    <strong>Visit the Live Portfolio ↗</strong>
  </a>
</p>

## 03. Features

| Feature | Description |
|---|---|
| Responsive Layout | Adapts to desktop, tablet, and mobile screens |
| Theme Controls | Interactive visual theme options |
| Live Clock | Displays the current Philippine time |
| Activity Matrix | Visual representation of activity |
| Stack Inspector | Showcases my development tools and technologies |
| Ask JR | Interactive portfolio chatbot |
| CLI Typing Test | Terminal-inspired typing interaction |
| Guided Tour | Helps visitors explore the portfolio |
| Keyboard Shortcuts | Quick navigation and interactions |
| Contact Form | Contact interface with Turnstile verification |
| Resume Download | Provides access to my résumé |

## 04. Technology Stack

### Frontend

- HTML5 — Website structure
- CSS3 — Styling, animations, and responsive layouts
- JavaScript — Interactions and dynamic functionality

### Services and Deployment

- Cloudflare Workers — Contact form backend
- Cloudflare Turnstile — Bot protection
- GitHub Pages — Website hosting
- Git — Version control

## 05. Project Structure

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

## 06. Getting Started

To run the portfolio locally:

**1. Clone the repository**

```bash
git clone https://github.com/jms-rnld-dgi/jms-minimal-design.git
```

**2. Open the project folder**

```bash
cd jms-minimal-design
```

**3. Run the website**

Open `index.html` in your browser or use the VS Code Live Server extension.

No frontend framework or package installation is required.

## 07. Deployment

This portfolio is hosted using GitHub Pages.

The repository includes a GitHub Actions workflow for deployment.

**Live URL:**

https://jms-rnld-dgi.github.io/jms-minimal-design/

For deployment configuration, see [DEPLOY.md](DEPLOY.md).

## 08. Contact Form Architecture

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
   ├── Input Validation
   ├── Rate Limiting
   └── Turnstile Verification
   │
   ▼
FormSubmit
   │
   ▼
Email Delivery
```

**Security considerations:**

- Turnstile verification is performed server-side.
- Contact submissions are validated before processing.
- Rate limiting helps prevent excessive requests.
- Secret keys are stored as Cloudflare Worker secrets and should never be committed to the repository.

*Note: Successful email delivery should be verified through an end-to-end test.*

## 09. Academic Background

**Bachelor of Science in Computer Science**

Cavite State University – Bacoor City Campus

Areas of interest:

- Cybersecurity
- Network Security
- Ethical Hacking
- Web Development
- Software Engineering

## 10. Technical Interests

I'm continuously learning and exploring technologies related to:

- Cybersecurity and penetration testing
- Network analysis and security
- Linux environments
- Programming and web technologies
- System and application security

## 11. Credits and Acknowledgment

This portfolio is a personal project designed and developed by **James Ronald Daguio**.

The design, layout, interactions, and implementation are part of my ongoing learning and development as a Computer Science student.

---

<p align="center">
  <strong>James Ronald Daguio</strong><br>
  <sub>Learning. Building. Improving.</sub>
</p>

<p align="center">
  <a href="https://github.com/jms-rnld-dgi">GitHub</a> ·
  <a href="https://jms-rnld-dgi.github.io/jms-minimal-design/">Portfolio</a> ·
  <a href="mailto:jamesrdaguio@gmail.com">Email</a>
</p>
