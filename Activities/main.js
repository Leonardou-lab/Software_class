function filterPieces(value) {
  const query = value.trim().toLowerCase();
  const cards = document.querySelectorAll('.piece-card');
  let anyVisible = false;

  cards.forEach(card => {
    const name = card.dataset.name;
    const matches = name.includes(query);
    card.hidden = !matches;
    if (matches) anyVisible = true;
  });

  document.getElementById('noResults').hidden = anyVisible;
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.querySelector('.seal-icon').textContent = isDark ? '☽' : '☀';
}
