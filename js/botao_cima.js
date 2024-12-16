// Mostrar ou esconder o botão conforme o scroll
window.onscroll = function() {
  let btn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block"; // Exibir o botão após rolar 100px
  } else {
      btn.style.display = "none"; // Esconder o botão quando estiver no topo
  }
};

// Função para rolar até o topo
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth" // Rolar suavemente até o topo
  });
}