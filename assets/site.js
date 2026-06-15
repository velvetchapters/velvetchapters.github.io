(function () {
  function setupChapterNav() {
    var navs = document.querySelectorAll('[data-auto-chapter-nav]');
    if (!navs.length) return;

    fetch('/chapters.json')
      .then(function (response) { return response.json(); })
      .then(function (chapters) {
        navs.forEach(function (nav) {
          var novel = nav.getAttribute('data-novel');
          var number = Number(nav.getAttribute('data-chapter-number'));
          var list = chapters.filter(function (chapter) { return chapter.novel === novel; })
            .sort(function (a, b) { return a.chapter_number - b.chapter_number; });
          var index = list.findIndex(function (chapter) { return Number(chapter.chapter_number) === number; });
          if (index < 0) return;

          var prev = nav.querySelector('[data-prev]');
          var next = nav.querySelector('[data-next]');

          if (prev && list[index - 1]) {
            prev.href = list[index - 1].url;
            prev.classList.remove('disabled');
            prev.removeAttribute('aria-disabled');
          }

          if (next && list[index + 1]) {
            next.href = list[index + 1].url;
            next.classList.remove('disabled');
            next.removeAttribute('aria-disabled');
          }
        });
      })
      .catch(function () {});
  }

  function setupChapterSearch() {
    var search = document.getElementById('chapter-search');
    var sort = document.getElementById('chapter-sort');
    var list = document.querySelector('[data-chapter-list]');
    if (!list) return;

    var rows = Array.prototype.slice.call(list.querySelectorAll('.chapter-row'));

    function render() {
      var term = search ? search.value.toLowerCase().trim() : '';
      var direction = sort ? sort.value : 'asc';
      var sorted = rows.slice().sort(function (a, b) {
        return Number(a.dataset.number) - Number(b.dataset.number);
      });
      if (direction === 'desc') sorted.reverse();
      sorted.forEach(function (row) {
        var title = row.dataset.title.toLowerCase();
        var number = row.dataset.number;
        row.style.display = !term || title.indexOf(term) !== -1 || number.indexOf(term) !== -1 ? '' : 'none';
        list.appendChild(row);
      });
    }

    if (search) search.addEventListener('input', render);
    if (sort) sort.addEventListener('change', render);
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupChapterNav();
    setupChapterSearch();
  });
})();
