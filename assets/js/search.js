// ==========================================
// LUMORA - Search Engine
// Busca e filtros de filmes via TMDB
// ==========================================

// Debounce para não fazer requisição a cada tecla
let searchTimeout = null;

async function handleSearch() {
  const query = document.getElementById("search-input").value.trim();
  const genreFilter = document.getElementById("filter-genre").value;
  const yearFilter = document.getElementById("filter-year").value;
  const ratingFilter = parseFloat(
    document.getElementById("filter-rating").value,
  );

  // Cancela a busca anterior se o usuário ainda está digitando
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    try {
      let movies = [];

      // Se tem texto, busca por texto
      if (query.length > 0) {
        movies = await API.searchMovies(query);
      }
      // Se tem gênero selecionado, busca por gênero
      else if (genreFilter !== "all") {
        const genreId = GENRE_MAP[genreFilter];
        movies = await API.getByGenre(genreId);
      }
      // Se não tem nada, busca populares
      else {
        movies = await API.getPopular();
      }

      // Aplica filtros locais de ano e avaliação
      let filtered = movies.filter((m) => {
        const movieYear = parseInt(API.formatYear(m.release_date));
        const movieRating = parseFloat(API.formatRating(m.vote_average));

        let matchYear = true;
        if (yearFilter !== "all") {
          if (yearFilter === "2021") matchYear = movieYear <= 2021;
          else matchYear = movieYear === parseInt(yearFilter);
        }

        const matchRating = movieRating >= ratingFilter;

        return matchYear && matchRating;
      });

      renderSearchResults(filtered);
    } catch (error) {
      console.error("Erro na busca:", error);
    }
  }, 400); // Aguarda 400ms após o usuário parar de digitar
}

function renderSearchResults(movies) {
  const container = document.getElementById("search-results");
  const emptyState = document.getElementById("search-empty");

  if (movies.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
    container.innerHTML = movies.map(createSearchCard).join("");
    lucide.createIcons();
  }
}
