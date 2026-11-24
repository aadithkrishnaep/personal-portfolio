/**
 * Editorial Underwater / Ocean Portfolio Logic
 * Handles slide-snap progression, menu/search drawers, clippings filtering, and inspection modals.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderHeroContent();
  renderAboutContent();
  renderClippingsGallery("all");
  renderStatementAndContact();
  setupSlideSnapController();
  setupDrawers();
  setupSearch();
  setupModalDismiss();
  setupContactForm();

  // Ensure background video is playing smoothly
  const bgVideo = document.getElementById("bg-video");
  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.defaultMuted = true;
    const tryPlay = () => {
      bgVideo.play().catch(() => {});
    };
    tryPlay();
    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true });
  }

  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// -------------------------------------------------------------
// 1. Hero Screen Rendering (Text Only)
// -------------------------------------------------------------
function renderHeroContent() {
  // Title & Dates
  const titleEl = document.getElementById("hero-main-title");
  const subtitleEl = document.getElementById("hero-date-range");
  if (titleEl) {
    titleEl.innerHTML = `
      <span class="block">${personalInfo.exhibitionTitle}</span>
      <span class="block italic font-normal text-sky-100 whitespace-nowrap">${personalInfo.exhibitionSubtitle}</span>
    `;
  }
  if (subtitleEl) {
    subtitleEl.innerHTML = `${personalInfo.dateRange}`;
  }
}

// -------------------------------------------------------------
// 2. About Screen Rendering
// -------------------------------------------------------------
function renderAboutContent() {
  const bioP1 = document.getElementById("about-p1");
  const bioP2 = document.getElementById("about-p2");
  const disciplinesList = document.getElementById("about-disciplines");

  if (bioP1) bioP1.textContent = personalInfo.biographyParagraph1;
  if (bioP2) bioP2.textContent = personalInfo.biographyParagraph2;

  if (disciplinesList) {
    disciplinesList.innerHTML = personalInfo.disciplines
      .map(
        (disc) => `
        <span class="inline-block text-xs font-medium px-3 py-1 border border-sky-400/25 bg-[#031526]/80 text-sky-200 rounded-full">
          ${disc}
        </span>
      `
      )
      .join("");
  }
}

// -------------------------------------------------------------
// 3. Clippings Gallery Rendering
// -------------------------------------------------------------
let activeFilter = "all";

function renderClippingsGallery(category = "all", searchQuery = "") {
  activeFilter = category;
  const container = document.getElementById("clippings-catalog-grid");
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const filtered = workClippings.filter((item) => {
    const matchCat = category === "all" || item.category === category;
    const matchQuery =
      query === "" ||
      item.title.toLowerCase().includes(query) ||
      item.excerpt.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query)) ||
      item.publisher.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <p class="font-serif text-2xl text-sky-200/50 italic">No corresponding clippings found.</p>
        <button onclick="renderClippingsGallery('all')" class="mt-4 text-xs font-semibold uppercase tracking-widest text-[#38bdf8] hover:text-[#7dd3fc] underline">
          Reset Filter Catalogue
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((item) => {
      return `
      <div class="artwork-container border border-sky-400/20 bg-[#05192d]/70 backdrop-blur-md p-5 flex flex-col justify-between group rounded-3xl shadow-md hover:border-sky-400/40" onclick="openClipModal('${item.id}')">
        <div>
          <!-- Date & Publication meta -->
          <div class="text-[10px] uppercase tracking-wider text-sky-200/60 font-medium mb-1.5 flex items-center justify-between">
            <span>${item.date}</span>
            <span class="text-[#38bdf8] font-bold">${item.type}</span>
          </div>

          <!-- Title in Playfair Display -->
          <h3 class="font-serif text-lg md:text-xl font-bold leading-snug text-[#f0fdfa] group-hover:text-[#38bdf8] transition-colors mb-3">
            ${item.title}
          </h3>

          <!-- Artwork / Clipping Visual -->
          <div class="overflow-hidden bg-[#071f36] mb-3 aspect-[16/10] relative border border-sky-400/20 rounded-2xl">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl" />
            <div class="absolute bottom-0 inset-x-0 bg-[#020b14]/85 text-sky-200 text-[10px] px-2 py-1 truncate font-mono">
              ${item.caption}
            </div>
          </div>

          <!-- Excerpt -->
          <p class="text-xs text-sky-100/75 leading-relaxed line-clamp-3 mb-3">
            ${item.excerpt}
          </p>
        </div>

        <!-- Tags and Metric Footer -->
        <div class="pt-3 border-t border-sky-400/20 flex items-center justify-between text-[11px]">
          <div class="text-[#38bdf8] font-semibold truncate mr-2">
            ${item.metrics || item.publisher}
          </div>
          <span class="inline-flex items-center gap-1 font-semibold text-sky-200 uppercase tracking-wider text-[10px] group-hover:translate-x-1 group-hover:text-[#38bdf8] transition-all">
            Inspect <i data-lucide="arrow-right" class="w-3 h-3"></i>
          </span>
        </div>
      </div>
    `;
    })
    .join("");

  if (window.lucide) window.lucide.createIcons();
}

// Setup Category Filter Buttons
function setupFilterTabs() {
  const tabs = document.querySelectorAll(".editorial-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active", "active-rust"));
      tab.classList.add("active");
      const cat = tab.getAttribute("data-category");
      renderClippingsGallery(cat);
    });
  });
}

// -------------------------------------------------------------
// 4. Slide 4: Statement & Contact Rendering
// -------------------------------------------------------------
function renderStatementAndContact() {
  const quoteEl = document.getElementById("statement-quote");
  const authorEl = document.getElementById("statement-author");
  if (quoteEl) quoteEl.textContent = personalInfo.statementQuote;
  if (authorEl) authorEl.textContent = personalInfo.statementAuthor;
}

// -------------------------------------------------------------
// 5. Continuous Scroll Controller (Fluid scroll & active slide sync)
// -------------------------------------------------------------
let currentSlideIndex = 0;
const slideIds = ["slide-hero", "slide-about", "slide-clippings", "slide-statement"];

function setupSlideSnapController() {
  setupFilterTabs();

  const deck = document.getElementById("slides-deck");
  const scrollDownBtn = document.getElementById("scroll-next-btn");
  if (!deck || !scrollDownBtn) return;

  // Track scroll position to update current slide indicator dynamically
  const updateActiveSlide = () => {
    const deckRect = deck.getBoundingClientRect();
    const deckCenter = deckRect.top + deckRect.height / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    slideIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const slideCenter = rect.top + rect.height / 2;
        const dist = Math.abs(slideCenter - deckCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      }
    });

    if (currentSlideIndex !== closestIdx) {
      currentSlideIndex = closestIdx;
      updateScrollButtonState();
    }
  };

  deck.addEventListener("scroll", updateActiveSlide, { passive: true });

  // Clicking bottom-right button advances smoothly to next slide or loops to top
  scrollDownBtn.addEventListener("click", () => {
    if (currentSlideIndex < slideIds.length - 1) {
      currentSlideIndex += 1;
    } else {
      currentSlideIndex = 0;
    }
    const targetSlide = document.getElementById(slideIds[currentSlideIndex]);
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: "smooth" });
    }
    updateScrollButtonState();
  });
}

function updateScrollButtonState() {
  const scrollDownBtn = document.getElementById("scroll-next-btn");
  if (!scrollDownBtn) return;

  if (currentSlideIndex === slideIds.length - 1) {
    scrollDownBtn.innerHTML = `<i data-lucide="arrow-up" class="w-5 h-5 text-white"></i>`;
    scrollDownBtn.setAttribute("title", "Return to top");
  } else {
    scrollDownBtn.innerHTML = `<i data-lucide="arrow-down" class="w-5 h-5 text-white"></i>`;
    scrollDownBtn.setAttribute("title", "Advance to next section");
  }
  if (window.lucide) window.lucide.createIcons();
}

function scrollToSlide(slideId) {
  const target = document.getElementById(slideId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    closeDrawer("menu-drawer");
  }
}

// -------------------------------------------------------------
// 6. Drawers (Menu ≡ and Search 🔍)
// -------------------------------------------------------------
function setupDrawers() {
  const menuBtn = document.getElementById("menu-trigger-btn");
  const menuDrawer = document.getElementById("menu-drawer");
  const menuCloseBtn = document.getElementById("menu-close-btn");

  if (menuBtn && menuDrawer) {
    menuBtn.addEventListener("click", () => {
      menuDrawer.classList.add("open");
    });
  }

  if (menuCloseBtn && menuDrawer) {
    menuCloseBtn.addEventListener("click", () => {
      menuDrawer.classList.remove("open");
    });
  }

  const searchBtn = document.getElementById("search-trigger-btn");
  const searchDrawer = document.getElementById("search-drawer");
  const searchCloseBtn = document.getElementById("search-close-btn");
  const searchInput = document.getElementById("search-input-field");

  if (searchBtn && searchDrawer) {
    searchBtn.addEventListener("click", () => {
      searchDrawer.classList.add("open");
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
    });
  }

  if (searchCloseBtn && searchDrawer) {
    searchCloseBtn.addEventListener("click", () => {
      searchDrawer.classList.remove("open");
    });
  }
}

function closeDrawer(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("open");
}

// -------------------------------------------------------------
// 7. Search Drawer Logic
// -------------------------------------------------------------
function setupSearch() {
  const searchInput = document.getElementById("search-input-field");
  const searchResults = document.getElementById("search-results-list");
  if (!searchInput || !searchResults) return;

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (val === "") {
      searchResults.innerHTML = `<p class="text-xs uppercase tracking-widest text-sky-300/50">Start typing to search titles, publications, or topics...</p>`;
      return;
    }

    const matches = workClippings.filter(
      (c) =>
        c.title.toLowerCase().includes(val) ||
        c.excerpt.toLowerCase().includes(val) ||
        c.tags.some((t) => t.toLowerCase().includes(val)) ||
        c.publisher.toLowerCase().includes(val)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p class="text-sm font-serif italic text-sky-200/60">No matching items found for "${val}".</p>`;
      return;
    }

    searchResults.innerHTML = matches
      .map(
        (item) => `
        <div class="py-3 border-b border-sky-400/20 cursor-pointer hover:pl-2 transition-all flex items-center justify-between group" onclick="openClipModal('${item.id}'); closeDrawer('search-drawer');">
          <div>
            <div class="text-[10px] uppercase font-bold text-[#38bdf8]">${item.type} • ${item.dateShort}</div>
            <div class="font-serif text-base font-bold text-[#f0fdfa] group-hover:text-[#38bdf8] transition-colors">${item.title}</div>
            <div class="text-xs text-sky-200/60">${item.publisher}</div>
          </div>
          <span class="text-xs text-[#38bdf8] font-semibold">Read</span>
        </div>
      `
      )
      .join("");
  });
}

// -------------------------------------------------------------
// 8. Clipping Detail Modal Lightbox
// -------------------------------------------------------------
function openClipModal(clipId) {
  const clip = workClippings.find((c) => c.id === clipId);
  if (!clip) return;

  openModalWithCustomContent(
    clip.title,
    `${clip.type} — ${clip.publisher}`,
    clip.date,
    clip.details,
    clip.image,
    clip.link,
    clip.tags,
    clip.metrics
  );
}

function openExhibitDetail(slotKey) {
  const ex = heroExhibits[slotKey];
  if (!ex) return;

  openModalWithCustomContent(
    ex.title,
    ex.subtitle,
    ex.category,
    ex.details,
    ex.image,
    ex.link,
    [ex.tag]
  );
}

function openModalWithCustomContent(title, subtitle, meta, description, imageUrl, externalLink, tags = [], metric = "") {
  const modal = document.getElementById("editorial-modal");
  const modalBody = document.getElementById("modal-body-content");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <!-- Top Image Feature -->
    <div class="relative bg-[#020b14] max-h-[380px] overflow-hidden">
      <img src="${imageUrl}" alt="${title}" class="w-full h-full object-contain mx-auto" />
      <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#020b14] via-[#020b14]/75 to-transparent p-4 text-[#f0fdfa]">
        <span class="text-[10px] uppercase tracking-widest bg-sky-500/20 border border-sky-400/30 px-3 py-1 rounded-full backdrop-blur-sm text-[#38bdf8]">${meta}</span>
        <h2 class="font-serif text-2xl md:text-3xl font-bold mt-1 leading-tight text-[#f0fdfa]">${title}</h2>
        <p class="text-xs text-sky-200/80 mt-0.5">${subtitle}</p>
      </div>
    </div>

    <!-- Content Breakdown -->
    <div class="p-6 md:p-8 space-y-6">
      ${metric ? `<div class="text-xs font-bold uppercase tracking-wider text-[#38bdf8] border-b border-sky-400/20 pb-2">Traction & Reception: ${metric}</div>` : ""}

      <div>
        <h4 class="text-[11px] uppercase tracking-widest font-bold text-sky-400/80 mb-2">Exhibition Analysis & Key Takeaways</h4>
        <p class="text-sm md:text-base text-sky-100/90 leading-relaxed font-sans">${description}</p>
      </div>

      ${
        tags && tags.length > 0
          ? `
        <div>
          <h4 class="text-[11px] uppercase tracking-widest font-bold text-sky-400/80 mb-2">Disciplines & Index Tokens</h4>
          <div class="flex flex-wrap gap-1.5">
            ${tags.map((t) => `<span class="text-xs px-3 py-1 bg-sky-950/60 border border-sky-400/30 text-sky-200 font-medium rounded-full">#${t}</span>`).join("")}
          </div>
        </div>
      `
          : ""
      }

      <!-- Actions -->
      <div class="pt-6 border-t border-sky-400/20 flex items-center justify-between">
        <button onclick="closeEditorialModal()" class="text-xs font-bold uppercase tracking-widest text-sky-300/70 hover:text-[#38bdf8] transition-colors">
          Dismiss
        </button>

        ${
          externalLink
            ? `
          <a href="${externalLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white transition-all text-xs uppercase tracking-widest font-semibold rounded-full shadow-md">
            <span>Access Full Work</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        `
            : ""
        }
      </div>
    </div>
  `;

  modal.classList.add("open");
  if (window.lucide) window.lucide.createIcons();
}

function closeEditorialModal() {
  const modal = document.getElementById("editorial-modal");
  if (modal) modal.classList.remove("open");
}

function setupModalDismiss() {
  const modal = document.getElementById("editorial-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeEditorialModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeEditorialModal();
      closeDrawer("menu-drawer");
      closeDrawer("search-drawer");
    }
  });
}

// -------------------------------------------------------------
// 9. Contact Form & Clipboard Copy
// -------------------------------------------------------------
function setupContactForm() {
  const form = document.getElementById("inquiry-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `Dispatched`;
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      showToast("Thank you. Your inquiry has been dispatched to Aadith Krishna.");
    }, 800);
  });
}

function copyEmailToClipboard() {
  navigator.clipboard.writeText(personalInfo.email).then(() => {
    showToast(`Copied to clipboard: ${personalInfo.email}`);
  }).catch(() => {
    showToast(`Email: ${personalInfo.email}`);
  });
}

function showToast(message) {
  let toast = document.getElementById("app-editorial-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-editorial-toast";
    toast.className = "editorial-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
