// Função para gerar o gráfico de distribuição de gêneros
function gerarGraficoGeneros() {
  let imagens = JSON.parse(localStorage.getItem("imagens")) || [];
  let generos = imagens.reduce((acc, imagem) => {
    acc[imagem.genero] = (acc[imagem.genero] || 0) + 1;
    return acc;
  }, {});

  let ctx = document.getElementById('graficoGeneros').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(generos),
      datasets: [{
        data: Object.values(generos),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF5733']
      }]
    }
  });
}

// Função para gerar o gráfico de favoritos vs não favoritos
function gerarGraficoFavoritos() {
  let imagens = JSON.parse(localStorage.getItem("imagens")) || [];
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let favoritosCount = favoritos.length;
  let naoFavoritosCount = imagens.length - favoritosCount;

  let ctx = document.getElementById('graficoFavoritos').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Favoritos', 'Não Favoritos'],
      datasets: [{
        data: [favoritosCount, naoFavoritosCount],
        backgroundColor: ['#FF6384', '#36A2EB']
      }]
    }
  });
}

// Gerar todos os gráficos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  gerarGraficoGeneros();
  gerarGraficoFavoritos();
  gerarGraficoImagensTempo();
});
