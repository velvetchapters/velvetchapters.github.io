(() => {
  const key = 'quiet-chapter-v1';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (_) {}
  const save = () => { try { localStorage.setItem(key, JSON.stringify(state)); } catch (_) {} };
  const apply = () => {
    document.body.dataset.theme = ['light', 'sepia', 'night'].includes(state.theme) ? state.theme : 'light';
    const size = Number(state.size);
    document.documentElement.style.setProperty('--reader-size', `${Number.isFinite(size) ? Math.max(16, Math.min(28, size)) : 20}px`);
  };
  delete state.chapter; delete state.title; save();
  apply();
  const search = document.querySelector('#search'), status = document.querySelector('#status');
  if (search) {
    const cards = [...document.querySelectorAll('.novel-card')];
    const filter = () => {
      let count = 0;
      cards.forEach(card => { card.hidden = !card.dataset.title.includes(search.value.trim().toLowerCase()) || Boolean(status.value && card.dataset.status !== status.value); if (!card.hidden) count++; });
      document.querySelector('#no-results').hidden = count > 0 || cards.length === 0;
      document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'story' : 'stories'} shown`;
    };
    search.addEventListener('input', filter); status.addEventListener('change', filter);
  }
  const theme = document.querySelector('#theme');
  if (theme) {
    theme.value = document.body.dataset.theme;
    theme.addEventListener('change', () => { state.theme = theme.value; save(); apply(); });
    for (const [id, delta] of [['smaller', -2], ['larger', 2]]) document.getElementById(id).addEventListener('click', () => { state.size = Math.max(16, Math.min(28, (Number(state.size) || 20) + delta)); save(); apply(); });
    const progress = document.querySelector('.progress');
    const update = () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 100}%`; };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
  }
  document.querySelector('#clear-data')?.addEventListener('click', () => { state = {}; try { localStorage.removeItem(key); } catch (_) {} apply(); document.querySelector('#clear-status').textContent = 'Reading preferences cleared in this browser.'; });
})();
