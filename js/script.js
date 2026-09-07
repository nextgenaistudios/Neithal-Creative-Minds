/* ==========================================================================
   Neithal Creatives — Site Script
   ========================================================================== */

// ---- IMPORTANT ----
// Paste your deployed Google Apps Script Web App URL below.
// You get this after deploying Code.gs — see README.md, Step 2.
const APPS_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

// ---- Footer year ----
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ---- Contact form submission ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (APPS_SCRIPT_URL.indexOf('PASTE_YOUR') === 0) {
      showStatus('error', 'The contact form isn\'t connected yet. Follow Step 2 in README.md to link it to Google Apps Script.');
      return;
    }

    const data = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      phone: contactForm.phone.value.trim(),
      service: contactForm.service.value,
      message: contactForm.message.value.trim(),
      page: window.location.href,
      submittedAt: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // text/plain avoids a CORS preflight request, which Apps Script
      // web apps don't handle. Code.gs still parses this as JSON.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result && result.result === 'success') {
          showStatus('success', 'Thanks — your message is in. We\'ll get back to you within a day.');
          contactForm.reset();
        } else {
          showStatus('error', 'Something went wrong on our end. Please try again or email us directly.');
        }
      })
      .catch(function () {
        showStatus('error', 'Could not send your message. Please check your connection and try again.');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });

  function showStatus(type, text) {
    statusEl.textContent = text;
    statusEl.className = 'form-status visible ' + type;
  }
}
