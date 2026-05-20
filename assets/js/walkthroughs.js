(function () {
  // Registry of walkthrough caption data, keyed by data-walkthrough-id.
  // SVG content lives in the HTML; elements opt in to per-frame visibility via data-wf="1,2,3".
  window.WALKTHROUGHS = window.WALKTHROUGHS || {};

  function initWalkthrough(el) {
    const id = el.dataset.walkthroughId;
    const data = window.WALKTHROUGHS[id];
    if (!data) {
      console.warn('No walkthrough data found for id:', id);
      return;
    }

    const viewport = el.querySelector('.walkthrough__viewport');
    const titleEl = el.querySelector('.walkthrough__step-title');
    const bodyEl = el.querySelector('.walkthrough__step-body');
    const indicatorEl = el.querySelector('.walkthrough__step-indicator');
    const prevBtn = el.querySelector('[data-action="prev"]');
    const nextBtn = el.querySelector('[data-action="next"]');
    const playBtn = el.querySelector('[data-action="play"]');

    const total = data.frames.length;
    let current = 1;
    let playTimer = null;

    function render() {
      // Toggle frame elements
      viewport.querySelectorAll('[data-wf]').forEach(function (node) {
        const frames = node.dataset.wf.split(',').map(function (s) { return parseInt(s.trim(), 10); });
        node.classList.toggle('wf--active', frames.indexOf(current) !== -1);
      });

      const frame = data.frames[current - 1];
      titleEl.textContent = frame.title;
      bodyEl.textContent = frame.body;
      indicatorEl.textContent = current + ' / ' + total;
      prevBtn.disabled = current === 1;
      nextBtn.disabled = current === total;
    }

    function go(delta) {
      const next = current + delta;
      if (next < 1 || next > total) return;
      current = next;
      render();
    }

    function stopPlay() {
      if (playTimer) {
        clearInterval(playTimer);
        playTimer = null;
        playBtn.textContent = '▶ Play';
      }
    }

    function startPlay() {
      playBtn.textContent = '⏸ Pause';
      playTimer = setInterval(function () {
        if (current < total) {
          go(1);
        } else {
          stopPlay();
        }
      }, 3500);
    }

    prevBtn.addEventListener('click', function () { stopPlay(); go(-1); });
    nextBtn.addEventListener('click', function () { stopPlay(); go(1); });
    playBtn.addEventListener('click', function () {
      if (playTimer) {
        stopPlay();
      } else {
        // Restart from beginning if at the end
        if (current === total) { current = 1; render(); }
        startPlay();
      }
    });

    render();
  }

  window.initWalkthroughs = function () {
    document.querySelectorAll('.walkthrough').forEach(initWalkthrough);
  };
})();
