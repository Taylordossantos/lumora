// ==========================================
// LUMORA - Video Player
// Gerencia o modal do player de vídeo
// ==========================================

async function openPlayer(movieId) {
  const modal = document.getElementById("player-modal");
  const iframe = document.getElementById("video-iframe");

  // Mostra o modal com loading
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  iframe.src = "";
  document.body.style.overflow = "hidden";

  try {
    const trailerKey = await API.getTrailer(movieId);

    if (trailerKey) {
      iframe.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`;
    } else {
      // Se não achar trailer, mostra mensagem
      iframe.srcdoc = `
                <div style="display:flex;align-items:center;justify-content:center;height:100%;background:#0a0a0a;color:white;font-family:Inter,sans-serif;flex-direction:column;gap:16px;">
                    <svg width="64" height="64" fill="none" stroke="#ff8c00" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <p style="font-size:18px;font-weight:600;">Trailer não disponível</p>
                    <p style="font-size:14px;color:#888;">Não encontramos um trailer para este filme.</p>
                </div>
            `;
    }
  } catch (error) {
    console.error("Erro ao carregar trailer:", error);
  }
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
