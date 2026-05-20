(function () {
  const KEY = 'agentic-ai-course.progress';
  const NAME_KEY = 'agentic-ai-course.user-name';
  const PASS = 80;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }

  function save(p) {
    try { localStorage.setItem(KEY, JSON.stringify(p)); }
    catch (e) { console.warn('Progress save failed', e); }
  }

  function getStatus(moduleId) {
    const p = load();
    const m = p[moduleId];
    if (!m) return { score: 0, passed: false, attempted: false };
    return {
      score: m.bestScore || 0,
      passed: (m.bestScore || 0) >= PASS,
      attempted: true,
      lastAttempt: m.lastAttempt
    };
  }

  function record(moduleId, score) {
    const p = load();
    const existing = p[moduleId] || {};
    const bestScore = Math.max(existing.bestScore || 0, score);
    p[moduleId] = {
      bestScore: bestScore,
      lastAttempt: new Date().toISOString(),
      passed: bestScore >= PASS
    };
    save(p);
    return { bestScore: bestScore, passed: bestScore >= PASS };
  }

  function reset() {
    if (confirm('Reset all course progress and saved name? This cannot be undone.')) {
      localStorage.removeItem(KEY);
      localStorage.removeItem(NAME_KEY);
      location.reload();
    }
  }

  function isUnlocked(/* moduleId, syllabus */) {
    // All modules are open from the start. The certificate is the only gate.
    return true;
  }

  function overallProgress(syllabus) {
    const required = syllabus.filter(function (m) { return !m.optional; });
    const passed = required.filter(function (m) { return getStatus(m.id).passed; });
    return {
      passed: passed.length,
      total: required.length,
      pct: required.length ? Math.round((passed.length / required.length) * 100) : 0
    };
  }

  function allRequiredPassed(syllabus) {
    const required = syllabus.filter(function (m) { return !m.optional; });
    if (!required.length) return false;
    return required.every(function (m) { return getStatus(m.id).passed; });
  }

  function getUserName() {
    try { return localStorage.getItem(NAME_KEY) || ''; }
    catch (e) { return ''; }
  }

  function setUserName(name) {
    try { localStorage.setItem(NAME_KEY, String(name || '').trim()); }
    catch (e) { console.warn('Name save failed', e); }
  }

  window.CourseProgress = {
    load: load,
    save: save,
    getStatus: getStatus,
    record: record,
    reset: reset,
    isUnlocked: isUnlocked,
    overall: overallProgress,
    allRequiredPassed: allRequiredPassed,
    getUserName: getUserName,
    setUserName: setUserName,
    PASS_THRESHOLD: PASS
  };
})();
