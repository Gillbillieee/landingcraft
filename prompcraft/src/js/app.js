// ===== LandingCraft — Landing Page Builder =====
(function() {
  'use strict';

  let currentTemplate = 'saas';

  const sampleData = {
    siteName: 'LaunchPad',
    heroHeadline: 'The fastest way to build beautiful landing pages',
    heroSubhead: 'No coding required. Choose a template, customize it in minutes, and export clean HTML ready to deploy.',
    ctaText: 'Get Started Free',
    ctaUrl: '#',
    featuresText: '⚡ Lightning fast setup
🎨 Beautiful templates
📱 Mobile responsive
🔒 Secure by default',
    aboutText: 'We help startups and entrepreneurs ship faster with beautiful, conversion-optimized landing pages. No design degree required.',
    footerText: '© 2026 LaunchPad. All rights reserved.',
    primaryColor: '#4f46e5',
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadDraft();
    updatePreview();
  });

  // ===== Template Selection =====
  window.selectTemplate = function(name) {
    currentTemplate = name;
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
    event.target.closest('.template-card').classList.add('active');
    document.getElementById('templateSelect').value = name;
    updatePreview();
  };

  window.changeTemplate = function(name) {
    selectTemplate(name);
  };

  // ===== Get Form Data =====
  function getFormData() {
    return {
      siteName: document.getElementById('siteName').value.trim() || 'MyProduct',
      heroHeadline: document.getElementById('heroHeadline').value.trim() || 'Build something amazing',
      heroSubhead: document.getElementById('heroSubhead').value.trim() || 'The simplest way to get started.',
      ctaText: document.getElementById('ctaText').value.trim() || 'Get Started',
      ctaUrl: document.getElementById('ctaUrl').value.trim() || '#',
      featuresText: document.getElementById('featuresText').value.trim(),
      aboutText: document.getElementById('aboutText').value.trim(),
      footerText: document.getElementById('footerText').value.trim() || '© 2026 MyProduct. All rights reserved.',
      primaryColor: document.getElementById('primaryColor').value,
    };
  }

  // ===== Generate Landing Page HTML =====
  function generateLandingPage(data) {
    const features = data.featuresText ? data.featuresText.split('
').filter(f => f.trim()) : [];
    const c = data.primaryColor;
    const cDark = adjustColor(c, -20);
    const cLight = adjustColor(c, 40);

    let body = '';

    if (currentTemplate === 'saas') {
      body = generateSaaSPage(data, features, c, cDark, cLight);
    } else if (currentTemplate === 'startup') {
      body = generateStartupPage(data, features, c, cDark, cLight);
    } else if (currentTemplate === 'portfolio') {
      body = generatePortfolioPage(data, features, c, cDark, cLight);
    } else if (currentTemplate === 'newsletter') {
      body = generateNewsletterPage(data, features, c, cDark, cLight);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.siteName)} — ${escapeHtml(data.heroHeadline)}</title>
  <meta name="description" content="${escapeHtml(data.heroSubhead)}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;color:#1a1a2e;line-height:1.6;overflow-x:hidden}
    .container{max-width:1100px;margin:0 auto;padding:0 24px}
    a{text-decoration:none;color:inherit}
    .btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;cursor:pointer;transition:all .2s ease;border:none}
    .btn-primary{background:${c};color:#fff}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px ${c}40}
    .btn-outline{border:2px solid var(--c);color:var(--c)}.btn-outline:hover{background:var(--c);color:#fff}
    .section{padding:80px 0}.hero{padding:120px 0 80px;text-align:center;background:linear-gradient(180deg,#f8f8ff 0%,#fff 100%)}
    .hero h1{font-size:clamp(32px,5vw,52px);font-weight:800;line-height:1.1;margin-bottom:16px;letter-spacing:-.02em}
    .hero p{font-size:18px;color:#6b7280;max-width:560px;margin:0 auto 32px}
    .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-top:48px}
    .feature-card{padding:28px;background:#fafafa;border-radius:12px;border:1px solid #eee;text-align:center}
    .feature-icon{font-size:32px;margin-bottom:12px}.feature-card h3{font-size:16px;font-weight:700;margin-bottom:8px}
    .feature-card p{font-size:14px;color:#6b7280}
    .about-section{text-align:center;padding:80px 0;background:#fafafa}
    .about-section h2{font-size:32px;font-weight:800;margin-bottom:16px}
    .about-section p{max-width:600px;margin:0 auto;font-size:16px;color:#6b7280}
    .cta-section{text-align:center;padding:80px 0;background:linear-gradient(135deg,${c},${cDark});color:#fff}
    .cta-section h2{font-size:32px;font-weight:800;margin-bottom:16px}
    .cta-section p{font-size:16px;opacity:.9;margin-bottom:24px}
    .cta-section .btn-primary{background:#fff;color:${c}}
    footer{text-align:center;padding:32px 0;border-top:1px solid #eee;font-size:14px;color:#6b7280}
    @media(max-width:768px){.hero h1{font-size:28px}.section{padding:48px 0}}
  </style>
</head>
<body>
  ${body}
  <footer>${escapeHtml(data.footerText)}</footer>
</body>
</html>`;
  }

  function generateSaaSPage(data, features, c, cDark, cLight) {
    let html = `<section class="hero">
      <div class="container">
        <h1>${escapeHtml(data.heroHeadline)}</h1>
        <p>${escapeHtml(data.heroSubhead)}</p>
        <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-primary">${escapeHtml(data.ctaText)}</a>
      </div>
    </section>`;

    if (features.length > 0) {
      html += `<section class="section"><div class="container">
        <h2 style="text-align:center;font-size:32px;font-weight:800;margin-bottom:8px;">Everything You Need</h2>
        <p style="text-align:center;color:#6b7280;margin-bottom:16px;">${escapeHtml(data.siteName)} has you covered.</p>
        <div class="features-grid">${features.map(f => {
          const icon = f.match(/^(\S+)/)?.[1] || '✨';
          const text = f.replace(/^\S+\s*/, '');
          return `<div class="feature-card"><div class="feature-icon">${icon}</div><h3>${escapeHtml(text)}</h3></div>`;
        }).join('')}</div>
      </div></section>`;
    }

    if (data.aboutText) {
      html += `<section class="about-section">
        <div class="container"><h2>About ${escapeHtml(data.siteName)}</h2><p>${escapeHtml(data.aboutText)}</p></div>
      </section>`;
    }

    html += `<section class="cta-section">
      <div class="container"><h2>Ready to get started?</h2>
      <p>Join thousands of happy customers today.</p>
      <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-primary">${escapeHtml(data.ctaText)}</a></div>
    </section>`;

    return html;
  }

  function generateStartupPage(data, features, c, cDark, cLight) {
    let html = `<section class="hero" style="background:linear-gradient(135deg,${c}08,${cLight}20);">
      <div class="container">
        <h1>${escapeHtml(data.heroHeadline)}</h1>
        <p>${escapeHtml(data.heroSubhead)}</p>
        <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-primary">${escapeHtml(data.ctaText)}</a>
      </div>
    </section>`;

    if (features.length > 0) {
      html += `<section class="section"><div class="container">
        <h2 style="text-align:center;font-size:32px;font-weight:800;margin-bottom:48px;">Why ${escapeHtml(data.siteName)}?</h2>
        <div class="features-grid">${features.map(f => {
          const icon = f.match(/^(\S+)/)?.[1] || '🚀';
          const text = f.replace(/^\S+\s*/, '');
          return `<div class="feature-card"><div class="feature-icon">${icon}</div><h3>${escapeHtml(text)}</h3></div>`;
        }).join('')}</div>
      </div></section>`;
    }

    html += `<section class="cta-section">
      <div class="container"><h2>Join the waitlist</h2>
      <p>Be first to access ${escapeHtml(data.siteName)}.</p>
      <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-primary">${escapeHtml(data.ctaText)}</a></div>
    </section>`;

    return html;
  }

  function generatePortfolioPage(data, features, c, cDark, cLight) {
    let html = `<section class="hero" style="background:#fff;border-bottom:1px solid #eee;">
      <div class="container">
        <h1>${escapeHtml(data.heroHeadline)}</h1>
        <p>${escapeHtml(data.heroSubhead)}</p>
        <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-outline">${escapeHtml(data.ctaText)}</a>
      </div>
    </section>`;

    if (features.length > 0) {
      html += `<section class="section"><div class="container">
        <h2 style="text-align:center;font-size:32px;font-weight:800;margin-bottom:48px;">Selected Work</h2>
        <div class="features-grid">${features.map(f => {
          const icon = f.match(/^(\S+)/)?.[1] || '💼';
          const text = f.replace(/^\S+\s*/, '');
          return `<div class="feature-card" style="text-align:left"><div class="feature-icon">${icon}</div><h3>${escapeHtml(text)}</h3></div>`;
        }).join('')}</div>
      </div></section>`;
    }

    if (data.aboutText) {
      html += `<section class="about-section">
        <div class="container"><h2>About Me</h2><p>${escapeHtml(data.aboutText)}</p></div>
      </section>`;
    }

    html += `<section class="cta-section" style="background:${c}10;color:#1a1a2e;">
      <div class="container"><h2>Let's work together</h2>
      <p>Get in touch to discuss your next project.</p>
      <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-primary">${escapeHtml(data.ctaText)}</a></div>
    </section>`;

    return html;
  }

  function generateNewsletterPage(data, features, c, cDark, cLight) {
    let html = `<section class="hero">
      <div class="container">
        <h1>${escapeHtml(data.heroHeadline)}</h1>
        <p>${escapeHtml(data.heroSubhead)}</p>
        <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-primary">${escapeHtml(data.ctaText)}</a>
      </div>
    </section>`;

    if (features.length > 0) {
      html += `<section class="section"><div class="container">
        <h2 style="text-align:center;font-size:32px;font-weight:800;margin-bottom:48px;">What You'll Get</h2>
        <div class="features-grid" style="max-width:600px;margin:0 auto">${features.map(f => {
          const icon = f.match(/^(\S+)/)?.[1] || '✅';
          const text = f.replace(/^\S+\s*/, '');
          return `<div class="feature-card"><div class="feature-icon">${icon}</div><h3>${escapeHtml(text)}</h3></div>`;
        }).join('')}</div>
      </div></section>`;
    }

    html += `<section class="cta-section">
      <div class="container"><h2>Don't miss out</h2>
      <p>Join 10,000+ subscribers getting weekly insights.</p>
      <a href="${escapeHtml(data.ctaUrl)}" class="btn btn-primary">${escapeHtml(data.ctaText)}</a></div>
    </section>`;

    return html;
  }

  function adjustColor(hex, amount) {
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  // ===== Update Preview =====
  window.updatePreview = function() {
    const data = getFormData();
    const html = generateLandingPage(data);
    const frame = document.getElementById('previewFrame');
    frame.srcdoc = html;
    saveDraft();
  };

  // ===== Export HTML =====
  window.exportHTML = function() {
    const data = getFormData();
    const html = generateLandingPage(data);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.siteName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-landing.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Landing page exported!');
  };

  // ===== Utilities =====
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#333;color:white;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 2000);
  }

  // ===== Persistence =====
  function saveDraft() {
    try {
      const data = getFormData();
      localStorage.setItem('landingcraft_draft', JSON.stringify({ ...data, template: currentTemplate, ts: Date.now() }));
    } catch (e) {}
  }

  function loadDraft() {
    try {
      const d = localStorage.getItem('landingcraft_draft');
      if (!d) return;
      const data = JSON.parse(d);
      if (Date.now() - data.ts > 86400000) return;

      Object.keys(data).forEach(key => {
        if (key === 'ts' || key === 'template') return;
        const el = document.getElementById(key);
        if (el) el.value = data[key] || '';
      });

      if (data.template) {
        currentTemplate = data.template;
        document.getElementById('templateSelect').value = data.template;
      }
    } catch (e) {}
  }

  // Auto-save on any input change
  document.querySelectorAll('.controls-panel input, .controls-panel textarea, .controls-panel select').forEach(el => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });

})();
