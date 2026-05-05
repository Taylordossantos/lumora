// ==========================================
// LUMORA - Render Engine
// Responsável por renderizar os cards e rows
// ==========================================

// Card HTML para os Swipers da Home
function createMovieCard(movie) {
  const poster = API.getPosterUrl(movie.poster_path);
  const rating = API.formatRating(movie.vote_average);
  const year = API.formatYear(movie.release_date);
  const title = movie.title || movie.name;

  return `
        <div class="swiper-slide">
            <div onclick="loadDetails(${movie.id})" class="movie-card relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer group border border-white/5 shadow-xl bg-[#0a0a0a]">
                <img src="${poster}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${title}">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p class="font-bold text-sm font-display">${title}</p>
                    <div class="flex justify-between items-center text-xs text-gray-300 mt-1">
                        <span>${year}</span>
                        <span class="flex items-center gap-1 text-brand-orange">
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i> ${rating}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Card HTML para o Grid de Busca
function createSearchCard(movie) {
  const poster = API.getPosterUrl(movie.poster_path);
  const rating = API.formatRating(movie.vote_average);
  const year = API.formatYear(movie.release_date);
  const title = movie.title || movie.name;
  const synopsis = movie.overview || "Sinopse não disponível.";

  return `
        <div onclick="loadDetails(${movie.id})" class="relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer group border border-white/5 shadow-xl bg-[#0a0a0a] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-orange/20 hover:z-20">
            <img src="${poster}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${title}">

            <!-- Info Base -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0">
                <h4 class="font-bold text-sm md:text-base leading-tight mb-1 drop-shadow-md font-display">${title}</h4>
                <div class="flex justify-between items-center text-xs text-gray-300 font-medium drop-shadow-md">
                    <span>${year}</span>
                    <span class="flex items-center gap-1 text-brand-orange">
                        <i data-lucide="star" class="w-3 h-3 fill-current"></i> ${rating}
                    </span>
                </div>
            </div>

            <!-- Hover Info -->
            <div class="absolute inset-0 bg-black/90 p-4 flex flex-col justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 class="font-bold text-brand-orange mb-2 font-display">${title}</h4>
                <p class="text-[10px] md:text-xs text-gray-300 line-clamp-4 md:line-clamp-5 mb-4">${synopsis}</p>
                <button class="mx-auto text-xs font-bold text-white bg-brand-red hover:bg-brand-orange transition-colors px-4 py-2 rounded-full flex items-center gap-2 btn-hover">
                    <i data-lucide="play-circle" class="w-4 h-4"></i> Detalhes
                </button>
            </div>
        </div>
    `;
}

// Renderiza os Swipers da Home
async function renderHome() {
  try {
    const [popular, action] = await Promise.all([
      API.getPopular(),
      API.getAction(),
    ]);

    document.getElementById("row-popular").innerHTML = popular
      .map(createMovieCard)
      .join("");
    document.getElementById("row-action").innerHTML = action
      .map(createMovieCard)
      .join("");

    // Inicializa os Swipers
    new Swiper(".swiper-popular", {
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: {
        nextEl: ".swiper-popular .swiper-button-next",
        prevEl: ".swiper-popular .swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1280: { slidesPerView: 6 },
      },
    });

    new Swiper(".swiper-action", {
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: {
        nextEl: ".swiper-action .swiper-button-next",
        prevEl: ".swiper-action .swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1280: { slidesPerView: 6 },
      },
    });

    lucide.createIcons();
  } catch (error) {
    console.error("Erro ao carregar filmes:", error);
  }
}

// Renderiza a página de detalhes
async function renderDetails(movieId) {
  try {
    const movie = await API.getDetails(movieId);

    document.getElementById("details-title").innerText = movie.title;
    document.getElementById("details-year").innerText = API.formatYear(
      movie.release_date,
    );
    document.getElementById("details-duration").innerText = API.formatDuration(
      movie.runtime,
    );
    document.getElementById("details-rating").innerText = API.formatRating(
      movie.vote_average,
    );
    document.getElementById("details-synopsis").innerText =
      movie.overview || "Sinopse não disponível.";
    document.getElementById("details-poster").src = API.getPosterUrl(
      movie.poster_path,
    );
    document.getElementById("details-backdrop").style.backgroundImage =
      `url('${API.getBackdropUrl(movie.backdrop_path)}')`;

    // Gêneros
    const genres = movie.genres.map((g) => g.name).join(", ");
    document.getElementById("details-genre").innerText = genres;

    // Elenco
    const cast = movie.credits?.cast?.slice(0, 6) || [];
    document.getElementById("details-cast").innerHTML = cast
      .map(
        (c) => `
            <div class="flex-shrink-0 text-center group">
                <div class="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-orange-500 transition-all">
                    <img src="${c.profile_path ? CONFIG.TMDB_IMAGE_URL + c.profile_path : "https://api.dicebear.com/7.x/avataaars/svg?seed=" + c.name}" 
                         class="w-full h-full object-cover" alt="${c.name}">
                </div>
                <p class="font-bold text-sm">${c.name}</p>
                <p class="text-xs text-gray-500">${c.character}</p>
            </div>
        `,
      )
      .join("");

    lucide.createIcons();
  } catch (error) {
    console.error("Erro ao carregar detalhes:", error);
  }
}
// Renderiza o Hero com filme real do TMDB
async function renderHero() {
  try {
    const movie = await API.getNowPlaying();
    if (!movie) return;

    // Atualiza o backdrop
    const heroSection = document.querySelector("#view-home section");
    const heroImg = heroSection.querySelector("img");
    heroImg.src = API.getBackdropUrl(movie.backdrop_path);
    heroImg.alt = movie.title;

    // Atualiza os textos
    heroSection.querySelector("h1").innerText = movie.title;
    heroSection.querySelector("p").innerText = movie.overview;

    // Atualiza o botão Assistir
    heroSection
      .querySelector("button")
      .setAttribute("onclick", `loadDetails(${movie.id})`);
  } catch (error) {
    console.error("Erro ao carregar hero:", error);
  }
}
