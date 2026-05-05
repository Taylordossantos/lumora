// ==========================================
// LUMORA - Data Layer
// Integração com API do TMDB
// ==========================================

const API = {
  // Busca filmes populares
  async getPopular() {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/movie/popular?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&page=1`,
    );
    const data = await res.json();
    return data.results;
  },

  // Busca filmes de ação
  async getAction() {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/discover/movie?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&with_genres=28&sort_by=popularity.desc`,
    );
    const data = await res.json();
    return data.results;
  },

  // Busca detalhes de um filme
  async getDetails(movieId) {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/movie/${movieId}?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&append_to_response=credits`,
    );
    const data = await res.json();
    return data;
  },

  // Busca filmes por texto
  async searchMovies(query) {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/search/movie?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&query=${encodeURIComponent(query)}`,
    );
    const data = await res.json();
    return data.results;
  },

  // Busca filmes por gênero
  async getByGenre(genreId) {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/discover/movie?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&with_genres=${genreId}&sort_by=popularity.desc`,
    );
    const data = await res.json();
    return data.results;
  },

  // Formata o poster do filme
  getPosterUrl(path) {
    if (!path) return "https://picsum.photos/seed/noposter/400/600";
    return `${CONFIG.TMDB_IMAGE_URL}${path}`;
  },

  // Formata o backdrop do filme
  getBackdropUrl(path) {
    if (!path)
      return "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80";
    return `${CONFIG.TMDB_BACKDROP_URL}${path}`;
  },

  // Formata a nota do filme
  formatRating(vote) {
    return (vote / 2).toFixed(1);
  },

  // Formata o ano do filme
  formatYear(date) {
    if (!date) return "N/A";
    return date.split("-")[0];
  },

  // Formata a duração do filme
  formatDuration(minutes) {
    if (!minutes) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}min`;
  },

  // Busca trailer do filme no YouTube via TMDB
  async getTrailer(movieId) {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}`,
    );
    const data = await res.json();

    // Tenta achar trailer em português primeiro
    let trailer = data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    );

    // Se não achar, busca em inglês
    if (!trailer) {
      const resEn = await fetch(
        `${CONFIG.TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${CONFIG.TMDB_API_KEY}&language=en-US`,
      );
      const dataEn = await resEn.json();
      trailer = dataEn.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube",
      );
    }

    return trailer ? trailer.key : null;
  },
  // Busca filmes mais bem avaliados
  async getTopRated() {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/movie/top_rated?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&page=1`,
    );
    const data = await res.json();
    return data.results;
  },

  // Busca lançamentos
  async getUpcoming() {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/movie/upcoming?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&page=1`,
    );
    const data = await res.json();
    return data.results;
  },
  // Busca filme em destaque para o Hero
  async getNowPlaying() {
    const res = await fetch(
      `${CONFIG.TMDB_BASE_URL}/movie/now_playing?api_key=${CONFIG.TMDB_API_KEY}&language=${CONFIG.TMDB_LANGUAGE}&page=1`,
    );
    const data = await res.json();
    const top5 = data.results.slice(0, 5);
    return top5[Math.floor(Math.random() * top5.length)];
  },
};

// Mapa de gêneros TMDB para português
const GENRE_MAP = {
  Ação: 28,
  Aventura: 12,
  Comédia: 35,
  Crime: 80,
  Drama: 18,
  "Ficção Científica": 878,
  Terror: 27,
};
