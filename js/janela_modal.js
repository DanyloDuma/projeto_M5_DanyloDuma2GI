// Selecionar elementos
const modal = document.getElementById("modal");
const btnSim = document.getElementById("btn-sim");
const btnNao = document.getElementById("btn-nao");

// Verificar se o modal já foi confirmado
window.addEventListener("load", () => {
  const isConfirmed = localStorage.getItem("modalConfirmed"); // Verifica no armazenamento local
  if (!isConfirmed) {
    modal.style.display = "flex"; // Exibe o modal se não foi confirmado
  }
});

// Fechar a janela modal e armazenar a confirmação
btnSim.addEventListener("click", () => {
  alert("Obrigado pela confirmação!");
  localStorage.setItem("modalConfirmed", "true"); // Armazena a confirmação
  modal.style.display = "none"; // Fecha o modal
});

// Redirecionar ao clicar em "Não"
btnNao.addEventListener("click", () => {
  alert("Você será redirecionado para fora do site.");
  window.location.href = "https://www.google.com"; // Redireciona para o Google
});
