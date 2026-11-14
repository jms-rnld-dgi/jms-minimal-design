/* ==========================================================================
   James Ronald (JR.) — Minimalist Portfolio & Micro-Components
   ========================================================================== */

(function () {
  'use strict';

  // Sandbox-Safe Storage Helpers
  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, val) {
      try { localStorage.setItem(key, val); } catch (_) {}
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (_) {}
    }
  };

  // --------------------------------------------------------------------------
  // 1. Theme Switcher (Light / Dark / System + View Transitions Circular Wipe)
  // --------------------------------------------------------------------------
  const MODE_INDEX = { light: 0, dark: 1, system: 2 };
  const MODE_ORDER = ['light', 'dark', 'system'];
  const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');
  let currentMode = storage.get('jr_theme') || 'system';

  function resolveTheme(mode) {
    if (mode === 'system') return mediaDark.matches ? 'dark' : 'light';
    return mode;
  }

  function syncThemeControls(mode) {
    const idx = MODE_INDEX[mode] ?? 2;
    document.querySelectorAll('[data-theme-group]').forEach((group) => {
      group.style.setProperty('--idx', String(idx));
    });
    document.querySelectorAll('[data-set-theme]').forEach((btn) => {
      const active = btn.dataset.setTheme === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function applyTheme(mode, event) {
    const prevResolved = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const nextResolved = resolveTheme(mode);

    currentMode = mode;
    storage.set('jr_theme', mode);
    document.documentElement.dataset.themeMode = mode;
    syncThemeControls(mode);

    const commit = () => {
      document.documentElement.classList.toggle('dark', nextResolved === 'dark');
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (
      !reduceMotion &&
      prevResolved !== nextResolved &&
      typeof document.startViewTransition === 'function'
    ) {
      const x = event && typeof event.clientX === 'number' ? event.clientX : window.innerWidth / 2;
      const y = event && typeof event.clientY === 'number' ? event.clientY : 28;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(commit);
      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
              ]
            },
            {
              duration: 540,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        })
        .catch(() => {});
    } else {
      commit();
    }
  }

  document.querySelectorAll('[data-set-theme]').forEach((btn) => {
    btn.addEventListener('click', (e) => applyTheme(btn.dataset.setTheme, e));
  });

  mediaDark.addEventListener('change', () => {
    if (currentMode === 'system') applyTheme('system');
  });

  syncThemeControls(currentMode);

  // --------------------------------------------------------------------------
  // 2. Micro: Live PHT Clock (Bacoor, Cavite · Asia/Manila) & Reading Progress
  // --------------------------------------------------------------------------
  const phtTimeEl = document.getElementById('phtTime');
  const scrollProgressEl = document.getElementById('scrollProgress');

  function updatePhtClock() {
    if (!phtTimeEl) return;
    try {
      const formatted = new Intl.DateTimeFormat('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());
      phtTimeEl.textContent = `${formatted} PHT`;
    } catch (_) {
      phtTimeEl.textContent = 'UTC+8 PHT';
    }
  }

  updatePhtClock();
  setInterval(updatePhtClock, 30000);

  function updateScrollProgress() {
    if (!scrollProgressEl) return;
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - doc.clientHeight;
    const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0;
    scrollProgressEl.style.width = `${pct.toFixed(1)}%`;
  }

  // --------------------------------------------------------------------------
  // 3. Micro: Halftone 16-Week Lab Activity Matrix
  // --------------------------------------------------------------------------
  const activityGrid = document.getElementById('activityGrid');
  const activitySummary = document.getElementById('activitySummary');

  if (activityGrid) {
    const pattern = [
      [0, 1, 2, 1, 0, 2, 1],
      [1, 2, 1, 0, 1, 3, 2],
      [0, 1, 1, 2, 1, 2, 1],
      [1, 0, 2, 2, 1, 3, 2],
      [0, 2, 1, 1, 2, 2, 3],
      [1, 1, 0, 2, 1, 3, 2],
      [0, 2, 2, 1, 2, 2, 1],
      [1, 1, 1, 0, 2, 3, 2],
      [0, 1, 2, 2, 1, 3, 3],
      [1, 2, 1, 1, 2, 2, 2],
      [0, 1, 2, 1, 2, 3, 2],
      [1, 0, 1, 2, 2, 3, 3],
      [0, 2, 2, 1, 3, 2, 2],
      [1, 1, 2, 2, 1, 3, 3],
      [0, 2, 1, 2, 2, 3, 2],
      [1, 0, 0, 0, 0, 0, 0]
    ];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const labels = ['No lab session', '1 Lab Room', '2 Lab Rooms + Notes', 'Deep Lab + Recon Session'];

    pattern.forEach((week, wIdx) => {
      const col = document.createElement('div');
      col.className = 'act-col';
      week.forEach((lvl, dIdx) => {
        const dot = document.createElement('span');
        dot.className = `act-dot lvl-${lvl}`;
        const detail = `W${wIdx + 1} · ${days[dIdx]} — ${labels[lvl]}`;
        dot.title = detail;
        dot.addEventListener('mouseenter', () => {
          if (activitySummary) activitySummary.textContent = detail.toUpperCase();
        });
        col.appendChild(dot);
      });
      activityGrid.appendChild(col);
    });

    activityGrid.addEventListener('mouseleave', () => {
      if (activitySummary) activitySummary.textContent = 'W16 ACTUAL / 15 SAMPLE';
    });
  }

  // --------------------------------------------------------------------------
  // 5. Projects: one featured project, so category filters are unnecessary
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // 6. Micro: Interactive Stack Skill Inspector
  // --------------------------------------------------------------------------
  const stackTags = document.getElementById('stackTags');
  const stackNote = document.getElementById('stackNote');

  if (stackTags && stackNote) {
    stackTags.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-note]');
      if (!btn) return;
      const wasActive = btn.classList.contains('is-active');
      stackTags.querySelectorAll('.tag-btn').forEach((t) => t.classList.remove('is-active'));
      if (wasActive) {
        stackNote.textContent = 'CLICK ANY CHIP TO INSPECT USAGE';
      } else {
        btn.classList.add('is-active');
        stackNote.textContent = btn.dataset.note.toUpperCase();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Mobile Navigation Overlay & Scroll-Spy
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function setMenuOpen(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileOverlay.classList.toggle('open', open);
    mobileOverlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileOverlay.classList.contains('open');
    setMenuOpen(!isOpen);
  });

  document.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  const navLinks = document.querySelectorAll('.nav-desktop a');
  const trackedSections = ['about', 'labs', 'projects', 'background', 'credentials', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActiveNav(id) {
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.dataset.nav === id);
    });
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    const offset = window.scrollY + 140;
    let current = '';
    for (const sec of trackedSections) {
      if (sec.offsetTop <= offset) current = sec.id;
    }
    setActiveNav(current);
  }, { passive: true });

  updateScrollProgress();

  // --------------------------------------------------------------------------
  // 8. Copy Email & Contact Form
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyLabel = document.getElementById('copyLabel');
  const copyIcon = document.getElementById('copyIcon');
  const emailText = document.getElementById('emailAddress').textContent.trim();

  const ICON_COPY = '<rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
  const ICON_CHECK = '<polyline points="20 6 9 17 4 12"></polyline>';

  copyEmailBtn.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).catch(() => {});
    }
    copyLabel.textContent = 'COPIED';
    copyIcon.innerHTML = ICON_CHECK;
    setTimeout(() => {
      copyLabel.textContent = 'COPY';
      copyIcon.innerHTML = ICON_COPY;
    }, 1800);
  });

  // Contact form: Turnstile token is verified by the Cloudflare Worker before
  // the Worker forwards the message to FormSubmit.
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const config = window.JR_CONTACT_CONFIG || {};
      const tokenField = contactForm.querySelector('[name="cf-turnstile-response"]');
      const token = tokenField ? tokenField.value : '';
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const submitLabel = submitButton ? submitButton.querySelector('span') : null;

      if (!config.siteKey || config.siteKey === 'YOUR_TURNSTILE_SITE_KEY' ||
          !config.apiUrl || config.apiUrl.includes('YOUR-WORKER-NAME')) {
        formStatus.textContent = 'Contact form setup is incomplete. Please email jamesrdaguio@gmail.com directly.';
        return;
      }

      if (!token) {
        formStatus.textContent = 'Please complete the security check before sending.';
        return;
      }

      const originalLabel = submitLabel ? submitLabel.textContent : '';
      if (submitButton) submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'sending...';
      formStatus.textContent = 'Sending your message...';

      const payload = {
        name: contactForm.elements.name.value.trim(),
        email: contactForm.elements.email.value.trim(),
        message: contactForm.elements.message.value.trim(),
        token
      };

      try {
        const response = await fetch(config.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Message could not be sent.');
        }

        contactForm.reset();
        if (window.turnstile) window.turnstile.reset();
        formStatus.textContent = 'Message sent. Thank you for reaching out!';
      } catch (error) {
        formStatus.textContent = error.message || 'Unable to send. Please email jamesrdaguio@gmail.com.';
        if (window.turnstile) window.turnstile.reset();
      } finally {
        if (submitButton) submitButton.disabled = false;
        if (submitLabel) submitLabel.textContent = originalLabel || 'send message';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. Modals: Ask JR., CLI Typing Test & Shortcuts Cheat Sheet
  // --------------------------------------------------------------------------
  function openModal(id) {
    setMenuOpen(false);
    closeAllModals();
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    const input = el.querySelector('input');
    if (input) setTimeout(() => input.focus(), 60);
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop.open').forEach((m) => {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
    });
  }

  document.getElementById('openAskBtn').addEventListener('click', () => openModal('askModal'));
  document.getElementById('openCliBtn').addEventListener('click', () => {
    resetCliTest();
    openModal('cliModal');
  });
  document.getElementById('openKeysBtn').addEventListener('click', () => openModal('keysModal'));

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  // Ask JR. Q&A Logic
  const askLog = document.getElementById('askLog');
  const askForm = document.getElementById('askForm');
  const askInput = document.getElementById('askInput');

  const QA_RULES = [
    {
      match: /learn|focus|soc|study|fundamental/i,
      reply: 'I am focused on building solid fundamentals in Linux administration, TCP/IP networking, log analysis, and defensive alert triage for an entry-level SOC Analyst role.'
    },
    {
      match: /bug|bounty|side|hustle|recon|owasp/i,
      reply: 'Bug bounty hunting is my side hustle. I practice web reconnaissance and test authorized programs or labs, then report vulnerabilities responsibly.'
    },
    {
      match: /cert|comptia|security\+|credential/i,
      reply: 'I currently have 0 commercial certifications earned and list that transparently. Right now I am finishing TryHackMe SOC Level 1 labs while preparing for CompTIA Security+ (SY0-701).'
    },
    {
      match: /school|education|cvsu|work|barista|college/i,
      reply: 'I am pursuing a BS in Computer Science at Cavite State University – Bacoor Campus while working part-time as a barista and shift operator.'
    },
    {
      match: /project|tool|ssh|github/i,
      reply: 'My projects include frontend web projects, including my Hyouka Character Tribute Website.'
    }
  ];

  function handleAsk(question) {
    const q = question.trim();
    if (!q) return;

    const uMsg = document.createElement('div');
    uMsg.className = 'ask-msg user';
    uMsg.textContent = q;
    askLog.appendChild(uMsg);

    const found = QA_RULES.find((r) => r.match.test(q));
    const answer = found
      ? found.reply
      : 'I am James Ronald B. Daguio, a BS CS student at CvSU Bacoor focused on a SOC analyst career, with ethical bug bounty hunting as my side hustle. Ask me about my labs, stack, certifications, or projects!';

    const bMsg = document.createElement('div');
    bMsg.className = 'ask-msg bot';
    bMsg.textContent = answer;
    askLog.appendChild(bMsg);
    askLog.scrollTop = askLog.scrollHeight;
  }

  askForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleAsk(askInput.value);
    askInput.value = '';
  });

  document.getElementById('askChips').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-q]');
    if (btn) handleAsk(btn.dataset.q);
  });

  // CLI Typing Test Logic
  const CLI_COMMANDS = [
    'nmap -sC -sV -oN recon.txt 10.10.14.22',
    `grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c`,
    'tcpdump -i eth0 -nn port 53 -w dns_capture.pcap',
    'curl -I -s https://target.example.com | grep -iE "server|x-powered-by"',
    'find / -perm -4000 -type f 2>/dev/null'
  ];

  const cliPrompt = document.getElementById('cliPrompt');
  const cliInput = document.getElementById('cliInput');
  const cliWpm = document.getElementById('cliWpm');
  const cliAcc = document.getElementById('cliAcc');
  const cliTime = document.getElementById('cliTime');

  let targetCmd = '';
  let cliStart = null;
  let cliTimer = null;
  let timeLeft = 30;

  function renderCliPrompt(typed) {
    let html = '';
    for (let i = 0; i < targetCmd.length; i++) {
      const ch = targetCmd[i]
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      if (i < typed.length) {
        html += typed[i] === targetCmd[i]
          ? `<span class="ch-ok">${ch}</span>`
          : `<span class="ch-err">${ch}</span>`;
      } else {
        html += `<span class="ch-rem">${ch}</span>`;
      }
    }
    cliPrompt.innerHTML = html;
  }

  function resetCliTest() {
    clearInterval(cliTimer);
    cliTimer = null;
    cliStart = null;
    timeLeft = 30;
    targetCmd = CLI_COMMANDS[Math.floor(Math.random() * CLI_COMMANDS.length)];
    cliInput.value = '';
    cliInput.disabled = false;
    cliWpm.textContent = '0';
    cliAcc.textContent = '100%';
    cliTime.textContent = '30s';
    renderCliPrompt('');
  }

  cliInput.addEventListener('input', () => {
    const typed = cliInput.value;
    if (!cliStart && typed.length > 0) {
      cliStart = Date.now();
      cliTimer = setInterval(() => {
        timeLeft -= 1;
        cliTime.textContent = `${Math.max(0, timeLeft)}s`;
        if (timeLeft <= 0) {
          clearInterval(cliTimer);
          cliInput.disabled = true;
        }
      }, 1000);
    }

    renderCliPrompt(typed);

    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === targetCmd[i]) correct += 1;
    }

    const elapsedMin = Math.max((Date.now() - (cliStart || Date.now())) / 60000, 1 / 60);
    const wpm = Math.round((correct / 5) / elapsedMin);
    const acc = typed.length ? Math.round((correct / typed.length) * 100) : 100;

    cliWpm.textContent = String(wpm);
    cliAcc.textContent = `${acc}%`;

    if (typed === targetCmd) {
      clearInterval(cliTimer);
      setTimeout(resetCliTest, 450);
    }
  });

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      resetCliTest();
    }
  });

  document.getElementById('cliResetBtn').addEventListener('click', () => {
    resetCliTest();
    cliInput.focus();
  });

  // --------------------------------------------------------------------------
  // 10. Synchronized 7-Step Guided Tour HUD
  // --------------------------------------------------------------------------
  const TOUR_STEPS = [
    { id: 'home', title: 'Overview & Telemetry', desc: 'Centered reading measure, halftone portrait card, focus strip, and live study telemetry.' },
    { id: 'about', title: '01 — About', desc: 'Mindset and transition from Computer Science fundamentals into defensive security operations.' },
    { id: 'labs', title: '02 — Labs & Cadence', desc: '16-week halftone practice matrix plus hands-on TryHackMe and Hack The Box tracks.' },
    { id: 'projects', title: '03 — Featured Project', desc: 'A completed academic web project: the Hyouka Character Tribute, with links to its live website and source repository.' },
    { id: 'background', title: '04 — Background & Stack', desc: 'Academic timeline at CvSU Bacoor, working-student experience, and interactive skill chips.' },
    { id: 'credentials', title: '05 — Credentials', desc: 'Transparent certification status separating earned vendor certs from active study targets.' },
    { id: 'contact', title: '06 — Contact', desc: 'One-click email copy and direct inquiry form.' }
  ];

  const commandDock = document.getElementById('commandDock');
  const tourHud = document.getElementById('tourHud');
  const tourStepLabel = document.getElementById('tourStepLabel');
  const tourTitle = document.getElementById('tourTitle');
  const tourDesc = document.getElementById('tourDesc');
  const tourDots = document.getElementById('tourDots');
  const tourPrevBtn = document.getElementById('tourPrevBtn');
  const tourNextBtn = document.getElementById('tourNextBtn');

  let tourIndex = -1;

  TOUR_STEPS.forEach((step, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'tour-dot';
    dot.setAttribute('aria-label', `Step ${idx + 1}: ${step.title}`);
    dot.addEventListener('click', () => goToTourStep(idx));
    tourDots.appendChild(dot);
  });

  function clearTourHighlight() {
    document.querySelectorAll('.tour-focus').forEach((el) => el.classList.remove('tour-focus'));
  }

  function goToTourStep(idx) {
    tourIndex = Math.max(0, Math.min(TOUR_STEPS.length - 1, idx));
    const step = TOUR_STEPS[tourIndex];
    const target = document.getElementById(step.id);

    clearTourHighlight();
    if (target) {
      target.classList.add('tour-focus');
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      setActiveNav(step.id === 'home' ? '' : step.id);
    }

    tourStepLabel.textContent = `STEP 0${tourIndex + 1} / 0${TOUR_STEPS.length}`;
    tourTitle.textContent = step.title;
    tourDesc.textContent = step.desc;
    tourPrevBtn.disabled = tourIndex === 0;
    tourNextBtn.textContent = tourIndex === TOUR_STEPS.length - 1 ? 'finish ✓' : 'next →';

    tourDots.querySelectorAll('.tour-dot').forEach((d, i) => {
      d.classList.toggle('active', i === tourIndex);
    });
  }

  function startTour() {
    setMenuOpen(false);
    closeAllModals();
    commandDock.hidden = true;
    tourHud.hidden = false;
    goToTourStep(0);
  }

  function endTour() {
    clearTourHighlight();
    tourHud.hidden = true;
    commandDock.hidden = false;
    tourIndex = -1;
  }

  document.getElementById('startTourBtn').addEventListener('click', startTour);
  document.getElementById('tourCloseBtn').addEventListener('click', endTour);
  tourPrevBtn.addEventListener('click', () => goToTourStep(tourIndex - 1));
  tourNextBtn.addEventListener('click', () => {
    if (tourIndex >= TOUR_STEPS.length - 1) {
      endTour();
    } else {
      goToTourStep(tourIndex + 1);
    }
  });

  // --------------------------------------------------------------------------
  // 11. Global Keyboard Shortcuts
  // --------------------------------------------------------------------------
  const SECTION_KEYS = ['about', 'labs', 'projects', 'background', 'credentials', 'contact'];

  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement && document.activeElement.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

    if ((e.metaKey || e.ctrlKey || e.altKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal('askModal');
      return;
    }
    if (e.altKey && e.key.toLowerCase() === 'j') {
      e.preventDefault();
      resetCliTest();
      openModal('cliModal');
      return;
    }
    if (e.key === 'Escape') {
      closeAllModals();
      if (mobileOverlay.classList.contains('open')) setMenuOpen(false);
      if (!tourHud.hidden) endTour();
      return;
    }

    if (isTyping) return;

    if (e.key === '?') {
      e.preventDefault();
      openModal('keysModal');
    } else if (e.key.toLowerCase() === 'd' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const nextIdx = ((MODE_INDEX[currentMode] ?? 2) + 1) % MODE_ORDER.length;
      applyTheme(MODE_ORDER[nextIdx]);
    } else if (/^[1-6]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const target = document.getElementById(SECTION_KEYS[Number(e.key) - 1]);
      if (target) {
        const topOffset = target.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      }
    } else if (!tourHud.hidden) {
      if (e.key === 'ArrowRight') goToTourStep(tourIndex + 1);
      if (e.key === 'ArrowLeft') goToTourStep(tourIndex - 1);
    }
  });
})();
