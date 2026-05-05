// ==========================================
// LUMORA - Main
// Inicialização geral da aplicação
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializa ícones
  lucide.createIcons();

  // Renderiza hero, popular e action em paralelo
  await Promise.all([renderHero(), renderHome()]);

  // Navega para a home
  navigateTo("home");
});
