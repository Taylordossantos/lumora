// ==========================================
// LUMORA - Navigation Engine
// Gerencia a navegação entre as views
// ==========================================

function navigateTo(viewId) {
  // Esconde todas as views
  document
    .querySelectorAll(".page-content")
    .forEach((p) => p.classList.remove("active"));

  // Mostra a view correta
  document.getElementById(`view-${viewId}`).classList.add("active");

  // Scroll para o topo
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Ações específicas por view
  if (viewId === "search") {
    handleSearch();
    setTimeout(() => document.getElementById("search-input").focus(), 300);
  }

  // Re-inicializa ícones e animações
  lucide.createIcons();
  setTimeout(revealElements, 100);
}

function loadDetails(movieId) {
  navigateTo("details");
  renderDetails(movieId);
}

// Efeito de scroll no header da home
window.addEventListener("scroll", () => {
  revealElements();

  const header = document.getElementById("home-header");
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("bg-black/90", "backdrop-blur-md", "shadow-lg");
  } else {
    header.classList.remove("bg-black/90", "backdrop-blur-md", "shadow-lg");
  }
});

// Reveal elements on scroll
function revealElements() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) el.classList.add("active");
  });
}
