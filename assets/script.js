// ============================================================
    // NAVIGATION — sticky + mobile toggle
    // ============================================================
    const nav       = document.getElementById('nav');
    const toggle    = document.getElementById('nav-toggle');
    const navLinks  = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // ============================================================
    // SCROLL REVEAL
    // ============================================================
    const revealEls = document.querySelectorAll('.reveal');
    const observer  = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Trigger skill bar animation
          entry.target.querySelectorAll('.skill-bar__fill').forEach(bar => {
            bar.classList.add('animated');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    // Animate skill bars that are already in viewport
    document.querySelectorAll('.skill-bar__fill').forEach(bar => {
      const w = getComputedStyle(bar).getPropertyValue('--w') || 1;
      bar.style.width = (parseFloat(w) * 100) + '%';
    });

    // ============================================================
    // FORM SUBMIT (demo)
    // ============================================================
    function handleFormSubmit() {
      const nome     = document.getElementById('nome').value.trim();
      const email    = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();
      const status   = document.getElementById('form-status');
      const btn      = document.getElementById('submit-btn');

      if (!nome || !email || !mensagem) {
        status.style.display = 'block';
        status.style.background = 'rgba(201,105,122,0.1)';
        status.style.borderColor = 'rgba(201,105,122,0.3)';
        status.style.color = '#C9697A';
        status.className = 'form-status';
        status.textContent = '⚠ Preencha ao menos nome, e-mail e mensagem.';
        return;
      }

      btn.textContent = 'Enviando…';
      btn.disabled = true;

      // Simulate async send
      setTimeout(() => {
        status.className = 'form-status success';
        status.style = '';
        status.textContent = '✓ Mensagem enviada com sucesso! Responderei em breve.';
        btn.textContent = 'Enviado ✓';
        ['nome','email','assunto','mensagem'].forEach(id => document.getElementById(id).value = '');
      }, 1200);
    }

    // ============================================================
    // ACTIVE NAV LINK highlight on scroll
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      navLinks.querySelectorAll('a').forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current
          ? 'var(--txt-primary)' : '';
      });
    });