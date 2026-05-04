// ==========================================
// LUMORA - Video Player
// Gerencia o modal do player de vídeo
// ==========================================

function openPlayer() {
  const modal = document.getElementById("player-modal");
  const iframe = document.getElementById("video-iframe");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  iframe.src = "https://www.youtube.com/embed/vjF9GgrY9c0?autoplay=1";
  document.body.style.overflow = "hidden";
}

function closePlayer() {
  const modal = document.getElementById("player-modal");
  const iframe = document.getElementById("video-iframe");

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  iframe.src = "";
  document.body.style.overflow = "auto";
}

function addToList() {
  Toastify({
    text: "✅ Adicionado à sua lista!",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(135deg, #ff4b2b 0%, #ff8c00 100%)",
      borderRadius: "12px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "600",
      fontSize: "14px",
      padding: "12px 20px",
    },
  }).showToast();
}

// Fecha o modal ao clicar fora
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("player-modal").addEventListener("click", (e) => {
    if (e.target.id === "player-modal") closePlayer();
  });
});
