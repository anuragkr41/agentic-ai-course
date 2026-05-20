(function () {
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function formatAnswer(text) {
    return escapeHtml(text)
      .replace(/\n\n+/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  function renderTest(test, container, opts) {
    opts = opts || {};
    const passThreshold = window.CourseProgress ? window.CourseProgress.PASS_THRESHOLD : 80;
    const isOptional = opts.optional === true;

    let html = '<h2>' + (opts.title || 'Module Test') + '</h2>';
    html += '<p class="test__intro">';
    if (isOptional) {
      html += 'Quick self-check. Not required to advance — use it to spot weak areas.';
    } else {
      html += 'Answer all multiple-choice questions. Scenarios are self-reflection — the model answer reveals on submit. ';
      html += '<strong>You need ' + passThreshold + '% on the MCQs to unlock the next module.</strong>';
    }
    html += '</p>';

    test.mcqs.forEach(function (mcq, i) {
      html += '<div class="test__q" data-q-idx="' + i + '">';
      html += '<div class="test__q-num">Question ' + (i + 1) + '</div>';
      html += '<div class="test__q-text">' + escapeHtml(mcq.q) + '</div>';
      html += '<div class="test__opts">';
      mcq.options.forEach(function (opt, j) {
        html += '<label class="test__opt">';
        html += '<input type="radio" name="mcq-' + i + '" value="' + j + '">';
        html += escapeHtml(opt);
        html += '</label>';
      });
      html += '</div>';
      html += '<div class="test__explain" hidden></div>';
      html += '</div>';
    });

    if (test.scenarios && test.scenarios.length) {
      html += '<h3 style="margin-top: 2rem;">Scenario Questions</h3>';
      html += '<p class="test__intro">Write your reasoning. After you submit, compare with the model answer.</p>';
      test.scenarios.forEach(function (sc, i) {
        html += '<div class="test__q test__scenario" data-sc-idx="' + i + '">';
        html += '<div class="test__q-num">Scenario ' + (i + 1) + '</div>';
        html += '<div class="test__q-text">' + escapeHtml(sc.q) + '</div>';
        html += '<textarea placeholder="Type your reasoning here..."></textarea>';
        html += '<div class="model-answer" hidden>';
        html += '<h5>Model answer</h5>';
        html += '<div class="model-answer__body"></div>';
        html += '</div>';
        html += '</div>';
      });
    }

    html += '<div class="test__actions">';
    html += '<button class="btn" data-action="submit">Submit Test</button>';
    html += '<button class="btn btn--ghost" data-action="retake" hidden>Retake</button>';
    html += '</div>';
    html += '<div class="test__score" id="test-score" hidden></div>';

    container.innerHTML = html;

    container.querySelector('[data-action="submit"]').addEventListener('click', function () {
      gradeTest(test, container, opts);
    });
    container.querySelector('[data-action="retake"]').addEventListener('click', function () {
      renderTest(test, container, opts);
    });
  }

  function gradeTest(test, container, gradeOpts) {
    const passThreshold = window.CourseProgress ? window.CourseProgress.PASS_THRESHOLD : 80;
    let correct = 0;

    test.mcqs.forEach(function (mcq, i) {
      const qEl = container.querySelector('[data-q-idx="' + i + '"]');
      const selected = qEl.querySelector('input[name="mcq-' + i + '"]:checked');
      const explainEl = qEl.querySelector('.test__explain');
      const optEls = qEl.querySelectorAll('.test__opt');
      const userChoice = selected ? parseInt(selected.value, 10) : -1;
      const isRight = userChoice === mcq.correct;
      if (isRight) correct++;

      optEls.forEach(function (optEl, j) {
        optEl.classList.remove('test__opt--correct', 'test__opt--wrong');
        const input = optEl.querySelector('input');
        input.disabled = true;
        if (j === mcq.correct) optEl.classList.add('test__opt--correct');
        if (userChoice === j && j !== mcq.correct) optEl.classList.add('test__opt--wrong');
      });

      explainEl.hidden = false;
      const prefix = isRight ? '✓ Correct.' : (selected ? '✗ Not quite. Correct answer: ' + escapeHtml(mcq.options[mcq.correct]) + '.' : '— Skipped. Correct answer: ' + escapeHtml(mcq.options[mcq.correct]) + '.');
      explainEl.innerHTML = '<strong>' + prefix + '</strong><br>' + escapeHtml(mcq.explain);
    });

    if (test.scenarios) {
      test.scenarios.forEach(function (sc, i) {
        const scEl = container.querySelector('[data-sc-idx="' + i + '"]');
        if (!scEl) return;
        const modelEl = scEl.querySelector('.model-answer');
        modelEl.hidden = false;
        modelEl.querySelector('.model-answer__body').innerHTML = formatAnswer(sc.modelAnswer);
        scEl.querySelector('textarea').disabled = true;
      });
    }

    const total = test.mcqs.length;
    const pct = Math.round((correct / total) * 100);
    const isOptional = gradeOpts && gradeOpts.optional === true;
    let result = { passed: pct >= passThreshold, bestScore: pct };
    if (!isOptional && window.CourseProgress) {
      result = window.CourseProgress.record(test.moduleId, pct);
    }

    const scoreEl = container.querySelector('#test-score');
    scoreEl.hidden = false;
    scoreEl.className = 'test__score ' + (result.passed ? 'test__score--pass' : 'test__score--fail');

    let scoreHtml = '<span class="big">' + correct + '/' + total + ' — ' + pct + '%</span>';
    if (isOptional) {
      scoreHtml += '<div>Self-check complete. Review explanations above for anything you missed.</div>';
    } else if (result.passed) {
      scoreHtml += '<div>✓ Passed (≥' + passThreshold + '%). This module now counts toward your Pictu-e-Learning completion certificate.</div>';
    } else {
      scoreHtml += '<div>You need ' + passThreshold + '% for this module to count toward the certificate. Best score saved: ' + result.bestScore + '%. Review the explanations above and retake.</div>';
    }
    scoreEl.innerHTML = scoreHtml;

    container.querySelector('[data-action="submit"]').hidden = true;
    container.querySelector('[data-action="retake"]').hidden = false;

    if (window.refreshModuleNav) window.refreshModuleNav();
    scoreEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  window.renderTest = renderTest;
})();
