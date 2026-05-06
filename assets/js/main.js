// ==========================================
// LUMORA - Main
// Inicialização geral da aplicação
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializa ícones
  lucide.createIcons();

  // Renderiza hero e home em paralelo
  await Promise.all([renderHero(), renderHome()]);

  // Navega para a home
  navigateTo("home");

  // Esconde o loader
  const loader = document.getElementById("app-loader");
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.5s ease";
  setTimeout(() => (loader.style.display = "none"), 500);
});
