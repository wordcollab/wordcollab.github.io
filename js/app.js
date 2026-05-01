const config = window.siteConfig || {};
const info = window.siteInfo || {};
const travauxData = window.travauxData || { filters: [], items: [] };
const materiauxData = window.materiauxData || [];

const defaultLanguage = config.defaultLanguage || "ar";
let currentLanguage = localStorage.getItem("siteLanguage") || defaultLanguage;
let currentFilter = "all";

const heroKicker = document.getElementById("heroKicker");
const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const heroLocation = document.getElementById("heroLocation");
const heroCardTitle = document.getElementById("heroCardTitle");
const heroCardText = document.getElementById("heroCardText");
const heroPrimaryBtn = document.getElementById("heroPrimaryBtn");
const heroSecondaryBtn = document.getElementById("heroSecondaryBtn");

const footerText = document.getElementById("footerText");
const footerLinks = document.getElementById("footerLinks");
const contactCards = document.getElementById("contactCards");
const travauxFilters = document.getElementById("travauxFilters");
const travauxGrid = document.getElementById("travauxGrid");
const materiauxGrid = document.getElementById("materiauxGrid");
const siteNav = document.getElementById("site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const langToggle = document.getElementById("langToggle");

const travauxSection = document.getElementById("travaux");
const materiauxSection = document.getElementById("materiaux");
const contactSection = document.getElementById("contact");

const mediaModal = document.getElementById("mediaModal");
const mediaModalViewer = document.getElementById("mediaModalViewer");
const mediaModalTitle = document.getElementById("mediaModalTitle");
const mediaModalMeta = document.getElementById("mediaModalMeta");
const prevSlideBtn = document.getElementById("prevSlideBtn");
const nextSlideBtn = document.getElementById("nextSlideBtn");

function pick(value) {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ("ar" in value || "fr" in value)
  ) {
    return value[currentLanguage] || value[defaultLanguage] || value.ar || value.fr || "";
  }

  return value;
}

function setTextContent(element, value) {
  if (element && typeof value === "string") {
    element.textContent = value;
  }
}

function applyLanguageSettings() {
  const langConfig = config.languages?.[currentLanguage] || config.languages?.[defaultLanguage];

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = langConfig?.dir || "rtl";

  if (langToggle) {
    const toggleText = langConfig?.toggleLabel || (currentLanguage === "ar" ? "FR" : "AR");
    langToggle.innerHTML = `
      <span class="lang-icon">🌐</span>
      <span>${toggleText}</span>
    `;
  }
}

function renderNavigation() {
  if (!siteNav) return;

  const items = config.navigation?.[currentLanguage] || config.navigation?.[defaultLanguage] || [];
  const whatsappLabel = pick(config.labels?.[currentLanguage]?.whatsapp) || "WhatsApp";
  const whatsappUrl = info.social?.whatsapp || "#";

  siteNav.innerHTML = `
    ${items
      .map(
        (item) => `
          <a href="${item.href}">${item.label}</a>
        `
      )
      .join("")}
    <a href="${whatsappUrl}" id="headerWhatsappBtn" class="nav-whatsapp">${whatsappLabel}</a>
  `;
}

function renderConfig() {
  const pageTitle = pick(config.siteTitles);
  const pageDescription = pick(config.siteDescriptions);
  const hero = config.hero?.[currentLanguage] || config.hero?.[defaultLanguage];
  const travaux = config.sections?.travaux?.[currentLanguage] || config.sections?.travaux?.[defaultLanguage];
  const materiaux = config.sections?.materiaux?.[currentLanguage] || config.sections?.materiaux?.[defaultLanguage];
  const contact = config.sections?.contact?.[currentLanguage] || config.sections?.contact?.[defaultLanguage];
  const footer = config.footer?.[currentLanguage] || config.footer?.[defaultLanguage];
  const labels = config.labels?.[currentLanguage] || config.labels?.[defaultLanguage];

  if (pageTitle) {
    document.title = pageTitle;
  }

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag && pageDescription) {
    descriptionTag.setAttribute("content", pageDescription);
  }

  if (hero) {
    setTextContent(heroKicker, hero.kicker);
    setTextContent(heroTitle, hero.title);
    setTextContent(heroText, hero.text);
    setTextContent(heroLocation, hero.location);
    setTextContent(heroCardTitle, hero.cardTitle);
    setTextContent(heroCardText, hero.cardText);
    setTextContent(heroPrimaryBtn, hero.primaryButton);
    setTextContent(heroSecondaryBtn, hero.secondaryButton);
  }

  if (travaux && travauxSection) {
    const kicker = travauxSection.querySelector(".section-kicker");
    const title = travauxSection.querySelector("h2");
    const text = travauxSection.querySelector(".section-head p:last-of-type");
    setTextContent(kicker, travaux.kicker);
    setTextContent(title, travaux.title);
    setTextContent(text, travaux.text);
  }

  if (materiaux && materiauxSection) {
    const kicker = materiauxSection.querySelector(".section-kicker");
    const title = materiauxSection.querySelector("h2");
    const text = materiauxSection.querySelector(".section-head p:last-of-type");
    setTextContent(kicker, materiaux.kicker);
    setTextContent(title, materiaux.title);
    setTextContent(text, materiaux.text);
  }

  if (contact && contactSection) {
    const kicker = contactSection.querySelector(".section-kicker");
    const title = contactSection.querySelector("h2");
    const text = contactSection.querySelector(".section-head p:last-of-type");
    setTextContent(kicker, contact.kicker);
    setTextContent(title, contact.title);
    setTextContent(text, contact.text);
  }

  if (footer?.text) {
    setTextContent(footerText, footer.text);
  }

  if (mediaModalTitle && !mediaModal.classList.contains("is-open")) {
    setTextContent(mediaModalTitle, labels?.modalTitle || "");
  }

  if (mediaModalMeta && !mediaModal.classList.contains("is-open")) {
    setTextContent(mediaModalMeta, labels?.modalMeta || "");
  }

  setTextContent(prevSlideBtn, labels?.prev || "");
  setTextContent(nextSlideBtn, labels?.next || "");
}

function renderInfo() {
  if (Array.isArray(info.contactCards) && contactCards) {
    contactCards.innerHTML = info.contactCards
      .map(
        (card) => `
          <article class="contact-card">
            <h3>${pick(card.title)}</h3>
            <p>${pick(card.text)}</p>
            <p>${card.value}</p>
            <a href="${card.link}">${pick(card.linkLabel)}</a>
          </article>
        `
      )
      .join("");
  }

  if (Array.isArray(info.footerLinks) && footerLinks) {
    footerLinks.innerHTML = info.footerLinks
      .map(
        (link) => `
          <a href="${link.url}">${pick(link.label)}</a>
        `
      )
      .join("");
  }
}

function renderTravauxFilters() {
  if (!travauxFilters || !Array.isArray(travauxData.filters)) return;

  travauxFilters.innerHTML = travauxData.filters
    .map(
      (filter) => `
        <button
          type="button"
          class="filter-btn ${filter.key === currentFilter ? "active" : ""}"
          data-filter="${filter.key}"
        >
          ${pick(filter.label)}
        </button>
      `
    )
    .join("");
}

function openPlaceholderModal(item) {
  if (!mediaModal || !mediaModalViewer || !mediaModalTitle || !mediaModalMeta) return;

  const labels = config.labels?.[currentLanguage] || config.labels?.[defaultLanguage];
  mediaModalTitle.textContent = pick(item.title);
  mediaModalMeta.textContent = pick(item.description);
  mediaModalViewer.innerHTML = `
    <div class="travail-media-placeholder">
      <div>
        <p>${labels?.mediaLater || ""}</p>
        <p>${pick(item.title)}</p>
      </div>
    </div>
  `;
  mediaModal.classList.add("is-open");
  document.body.classList.add("modal-open");
  mediaModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!mediaModal) return;
  mediaModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  mediaModal.setAttribute("aria-hidden", "true");
}

function renderTravauxItems() {
  if (!travauxGrid || !Array.isArray(travauxData.items)) return;

  const filteredItems =
    currentFilter === "all"
      ? travauxData.items
      : travauxData.items.filter((item) => item.category === currentFilter);

  travauxGrid.innerHTML = filteredItems
    .map((item) => {
      const tags = pick(item.tags) || [];
      return `
        <article class="travail-card" data-id="${item.id}">
          <div class="travail-media-placeholder">
            <div>
              <p>${config.labels?.[currentLanguage]?.mediaLater || ""}</p>
              <p>${pick(item.title)}</p>
            </div>
          </div>
          <div class="travail-body">
            <h3>${pick(item.title)}</h3>
            <p>${pick(item.description)}</p>
            <div class="travail-meta">
              ${tags.map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  travauxGrid.querySelectorAll(".travail-card").forEach((card) => {
    card.addEventListener("click", () => {
      const item = travauxData.items.find((entry) => entry.id === card.dataset.id);
      if (item) openPlaceholderModal(item);
    });
  });
}

function renderMateriaux() {
  if (!materiauxGrid || !Array.isArray(materiauxData)) return;

  materiauxGrid.innerHTML = materiauxData
    .map((item) => {
      const tags = pick(item.tags) || [];
      return `
        <article class="materiau-card">
          <div class="materiau-media-placeholder">
            <div>
              <p>${config.labels?.[currentLanguage]?.productLater || ""}</p>
              <p>${pick(item.title)}</p>
            </div>
          </div>
          <div class="materiau-body">
            <h3>${pick(item.title)}</h3>
            <p>${pick(item.description)}</p>
            <div class="materiau-meta">
              ${tags.map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAll() {
  applyLanguageSettings();
  renderNavigation();
  renderConfig();
  renderInfo();
  renderTravauxFilters();
  renderTravauxItems();
  renderMateriaux();
}

function setupMenu() {
  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    if (event.target.classList.contains("filter-btn")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupFilters() {
  if (!travauxFilters) return;

  travauxFilters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    currentFilter = button.dataset.filter;
    renderTravauxFilters();
    renderTravauxItems();
  });
}

function setupLanguageToggle() {
  if (!langToggle) return;

  langToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "ar" ? "fr" : "ar";
    localStorage.setItem("siteLanguage", currentLanguage);
    renderAll();
  });
}

function setupModal() {
  if (!mediaModal) return;

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function init() {
  renderAll();
  setupMenu();
  setupFilters();
  setupLanguageToggle();
  setupModal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
