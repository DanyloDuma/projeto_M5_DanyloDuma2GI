// Selecionar o interruptor
const themeToggle = document.getElementById('dark-mode-toggle');

// Verificar e aplicar o tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.checked = true;
}

// Alterar tema ao clicar no interruptor
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark'); // Salvar preferência
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light'); // Salvar preferência
  }
});
