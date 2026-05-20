(function () {
  // Resume bullet copy-to-clipboard
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const bullet = btn.closest('.resume-bullet');
    if (!bullet) return;
    const text = bullet.dataset.copyText || bullet.textContent.replace(/Copy$/, '').trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        const original = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1500);
      });
    } else {
      // Fallback for older browsers
      const tmp = document.createElement('textarea');
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(tmp);
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1500);
    }
  });

  // Smooth scroll for anchor links
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.length <= 1) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Convert YouTube iframes to click-to-watch thumbnails.
  // Many YouTube channels disable iframe embedding ("Video player configuration error"),
  // so we replace every iframe with a thumbnail that links directly to YouTube — always works.
  function escapeAttr(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function extractYoutubeId(src) {
    const m = String(src || '').match(/(?:youtube(?:-nocookie)?\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
    return m ? m[1] : null;
  }

  function convertVideoEmbeds() {
    const iframes = document.querySelectorAll('.video-embed__frame iframe');
    iframes.forEach(function (iframe) {
      const src = iframe.getAttribute('src') || '';
      const id = extractYoutubeId(src);
      if (!id) return;
      const title = iframe.getAttribute('title') || 'YouTube video';
      const frame = iframe.parentElement;
      if (!frame) return;

      const link = document.createElement('a');
      link.className = 'video-embed__thumb';
      link.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', 'Watch on YouTube: ' + title);

      link.innerHTML =
        '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg"' +
        ' alt="' + escapeAttr(title) + '" loading="lazy"' +
        ' onerror="this.style.opacity=\'0.15\';">' +
        '<div class="video-embed__play-overlay">' +
          '<svg class="video-embed__play-icon" viewBox="0 0 68 48" aria-hidden="true">' +
            '<path fill="#FF0000" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"/>' +
            '<polygon fill="#FFFFFF" points="45,24 27,14 27,34"/>' +
          '</svg>' +
        '</div>' +
        '<div class="video-embed__thumb-cta">▶ Watch on YouTube</div>';

      // Replace the .video-embed__frame entirely (link replaces the wrapper)
      frame.replaceWith(link);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', convertVideoEmbeds);
  } else {
    convertVideoEmbeds();
  }
})();
