(function () {
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function getSyllabus() {
    return window.SYLLABUS || [];
  }

  function renderModuleNav(currentId, containerSelector) {
    const syllabus = getSyllabus();
    const idx = syllabus.findIndex(function (m) { return m.id === currentId; });
    if (idx === -1) return;

    const prev = idx > 0 ? syllabus[idx - 1] : null;
    const next = idx < syllabus.length - 1 ? syllabus[idx + 1] : null;
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let html = '';

    if (prev) {
      html += '<a class="module-nav__btn" href="' + escapeHtml(prev.file) + '">';
      html += '<div class="dir">← Previous</div>';
      html += '<div class="title">' + escapeHtml(prev.num + '. ' + prev.title) + '</div>';
      html += '</a>';
    } else {
      html += '<a class="module-nav__btn" href="../index.html">';
      html += '<div class="dir">← Back</div>';
      html += '<div class="title">Course Home</div>';
      html += '</a>';
    }

    if (next) {
      const unlocked = window.CourseProgress.isUnlocked(next.id, syllabus);
      const cls = 'module-nav__btn module-nav__btn--next' + (unlocked ? '' : ' module-nav__btn--locked');
      const href = unlocked ? escapeHtml(next.file) : '#';
      const dir = unlocked ? 'Next →' : '🔒 Locked — pass current test';
      html += '<a class="' + cls + '" href="' + href + '">';
      html += '<div class="dir">' + dir + '</div>';
      html += '<div class="title">' + escapeHtml(next.num + '. ' + next.title) + '</div>';
      html += '</a>';
    } else {
      html += '<a class="module-nav__btn module-nav__btn--next" href="../index.html">';
      html += '<div class="dir">Course complete →</div>';
      html += '<div class="title">Back to home</div>';
      html += '</a>';
    }

    container.innerHTML = html;
  }

  function renderSiteHeader(containerSelector, pathPrefix) {
    pathPrefix = pathPrefix || '';
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = '' +
      '<a class="brand" href="' + pathPrefix + 'index.html">Full Stack Agentic AI Engineering</a>' +
      '<nav>' +
      '  <a href="' + pathPrefix + 'index.html">Syllabus</a>' +
      '  <a href="' + pathPrefix + 'resume/index.html">Resume Kit</a>' +
      '  <a href="' + pathPrefix + 'resume/interview-bank.html">Interview Bank</a>' +
      '</nav>';
  }

  window.refreshModuleNav = function () {
    const currentId = document.body.dataset.moduleId;
    if (currentId) renderModuleNav(currentId, '#module-nav');
  };

  window.renderModuleNav = renderModuleNav;
  window.renderSiteHeader = renderSiteHeader;
})();
