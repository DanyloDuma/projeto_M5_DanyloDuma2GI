document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const usernameInput = document.getElementById("username");
  const ageInput = document.getElementById("age");
  const nationalityInput = document.getElementById("nationality");
  const bioInput = document.getElementById("bio");
  const photoInput = document.getElementById("photoUpload");
  const profileImg = document.getElementById("profileImg");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");
  const bioCounter = document.getElementById("bioCounter");

  // Limite máximo para a biografia
  const maxBioLength = 500;
  let remaining = maxBioLength; // Variável global para acompanhar os caracteres restantes

  // Atualizar contador de caracteres da biografia
  bioInput.addEventListener("input", function () {
    remaining = maxBioLength - bioInput.value.length;
    bioCounter.textContent = `Restam ${remaining} caracteres.`;
    bioCounter.style.color = remaining < 0 ? "red" : "#555";
  });

  // Carregar dados do LocalStorage
  function loadProfile() {
    const profileData = JSON.parse(localStorage.getItem("profileData"));
    if (profileData) {
      nameInput.value = profileData.name || "";
      usernameInput.value = profileData.username || "";
      ageInput.value = profileData.age || "";
      nationalityInput.value = profileData.nationality || "";
      bioInput.value = profileData.bio || "";
      remaining = maxBioLength - bioInput.value.length;
      bioCounter.textContent = `Restam ${remaining} caracteres.`;
      bioCounter.style.color = remaining < 0 ? "red" : "#555";
      if (profileData.photo) {
        profileImg.src = profileData.photo;
      }
    }
  }

  // Selecionar elementos do modal
  const notificationModal = document.getElementById("notificationModal");
  const notificationMessage = document.getElementById("notificationMessage");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Função para exibir o modal com uma mensagem
  function showNotification(message) {
    notificationMessage.textContent = message;
    notificationModal.style.display = "flex";
  }

  // Fechar o modal ao clicar no botão "OK"
  closeModalBtn.addEventListener("click", () => {
    notificationModal.style.display = "none";
  });

  // Guardar dados no LocalStorage
  function saveProfile() {
    // Verificar se os campos obrigatórios estão preenchidos
    if (
      !nameInput.value.trim() ||
      !usernameInput.value.trim() ||
      !ageInput.value.trim() ||
      !nationalityInput.value.trim() ||
      !bioInput.value.trim()
    ) {
      showNotification("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Verificar o limite de caracteres da biografia
    if (remaining < 0) {
      showNotification(
        "Não é possível guardar. A biografia excedeu o número máximo de caracteres!"
      );
      return;
    }

    // Salvar os dados no LocalStorage
    const profileData = {
      name: nameInput.value,
      username: usernameInput.value,
      age: ageInput.value,
      nationality: nationalityInput.value,
      bio: bioInput.value,
      photo: profileImg.src,
    };
    localStorage.setItem("profileData", JSON.stringify(profileData));
    showNotification("Dados guardados com sucesso!");
  }

  // Limpar todos os campos
  function clearProfile() {
    nameInput.value = "";
    usernameInput.value = "";
    ageInput.value = "";
    nationalityInput.value = "";
    bioInput.value = "";
    profileImg.src = "img/default-avatar.png";
    remaining = maxBioLength;
    bioCounter.textContent = `Restam ${remaining} caracteres.`;
    bioCounter.style.color = "#555";
    localStorage.removeItem("profileData");
    showNotification("Dados apagados com sucesso!");
  }

  // Carregar imagem de perfil
  photoInput.addEventListener("change", function () {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Eventos para salvar e limpar dados
  saveBtn.addEventListener("click", saveProfile);
  clearBtn.addEventListener("click", clearProfile);

  // Carregar perfil ao iniciar
  loadProfile();
});
