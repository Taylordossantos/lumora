// ==========================================
// LUMORA - Main
// Inicialização geral da aplicação
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializa ícones
  lucide.createIcons();

  // Renderiza a home com dados do TMDB
  await renderHome();

  // Navega para a home
  navigateTo("home");
});
