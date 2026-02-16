// ============================================
// GOKHAN-NOIR - Minimal JavaScript
// Dark mode toggle, nav scroll, code copy, reading progress
// ============================================

(function() {
  'use strict';

  // --- Dark Mode Toggle ---
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    var iconSun = toggle.querySelector('.icon-sun');
    var iconMoon = toggle.querySelector('.icon-moon');

    function updateIcons() {
      var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (iconSun && iconMoon) {
        iconSun.style.display = isDark ? 'block' : 'none';
        iconMoon.style.display = isDark ? 'none' : 'block';
      }
    }

    updateIcons();

    toggle.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcons();
    });
  }

  // --- Nav Scroll Effect ---
  var nav = document.getElementById('nav');
  if (nav) {
    var scrollThreshold = 50;
    window.addEventListener('scroll', function() {
      if (window.scrollY > scrollThreshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Mobile Nav Toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // --- Reading Progress Bar ---
  var progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
  }

  // --- Code Copy Button ---
  document.querySelectorAll('pre').forEach(function(pre) {
    // Skip if already wrapped
    if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    wrapper.appendChild(btn);

    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
})();
