const config = window.siteConfig || {};
const info = window.siteInfo || {};
const travauxData = window.travauxData || { filters: [], items: [] };
const materiauxData = window.materiauxData || [];

const heroKicker = document.getElementById("heroKicker");
const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const heroLocation = document.getElementById("heroLocation");
const heroCardText = document.getElementById("heroCardText");
const footerText = document.getElementById("footerText");
const footerLinks = document.getElementById("footerLinks");
const contactCards = document.getElementById("contactCards");
const travauxFilters = document.getElementById("travauxFilters");
const travauxGrid = document.getElementById("travauxGrid");
const materiauxGrid = document.getElementById("materiauxGrid");
const headerWhatsappBtn = document.getElementById("headerWhatsappBtn");
const siteNav = document.getElementById("site-nav");
const menuToggle = document.querySelector(".menu-toggle");

const travauxSection = document.getElementById("travaux");
const materiauxSection = document.getElementById("materiaux");
const contactSection = document.getElementById("contact");

const mediaModal = document.getElementById("mediaModal");
const mediaModalViewer = document.getElementById("mediaModalViewer");
const mediaModalTitle = document.getElementById("mediaModalTitle");
const mediaModalMeta = document.getElementById("mediaModalMeta");

let currentFilter = "all";

function setTextContent(element, value) {
  if (element && value) {
    element.textContent = value;
  }
}

function renderConfig() {
  if (config.siteTitle) {
    document.title = config.siteTitle;
  }

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag && config.siteDescription) {
    descriptionTag.setAttribute("content", config.siteDescription);
  }

  if (config.hero) {
    setTextContent(heroKicker, config.hero.kicker);
    setTextContent(heroTitle, config.hero.title);
    setTextContent(heroText, config.hero.text);
    setTextContent(heroLocation, config.hero.location);
    setTextContent(heroCardText, config.hero.cardText);
  }

  if (config.sections?.travaux && travauxSection) {
    const kicker = travauxSection.querySelector(".section-kicker");
    const title = travauxSection.querySelector("h2");
    const text = travauxSection.querySelector(".section-head p");
    setTextContent(kicker, config.sections.travaux.kicker);
    setTextContent(title, config.sections.travaux.title);
    setTextContent(text, config.sections.travaux.text);
  }

  if (config.sections?.materiaux && materiauxSection) {
    const kicker = materiauxSection.querySelector(".section-kicker");
    const title = materiauxSection.querySelector("h2");
    const text = materiauxSection.querySelector(".section-head p");
    setTextContent(kicker, config.sections.materiaux.kicker);
    setTextContent(title, config.sections.materiaux.title);
    setTextContent(text, config.sections.materiaux.text);
  }

  if (config.sections?.contact && contactSection) {
    const kicker = contactSection.querySelector(".section-kicker");
    const title = contactSection.querySelector("h2");
    const text = contactSection.querySelector(".section-head p");
    setTextContent(kicker, config.sections.contact.kicker);
    setTextContent(title, config.sections.contact.title);
    setTextContent(text, config.sections.contact.text);
  }

  if (config.footer?.text) {
    setTextContent(footerText, config.footer.text);
  }
}

function renderInfo() {
  if (headerWhatsappBtn && info.social?.whatsapp) {
    headerWhatsappBtn.href = info.social.whatsapp;
  }

  if (Array.isArray(info.contactCards) && contactCards) {
    contactCards.innerHTML = info.contactCards
      .map(
        (card) => `
          <article class="contact-card">
            <h3>${card.title}</h3>
            <p>${card.text}</p>
            <p>${card.value}</p>
            <a href="${card.link}">${card.linkLabel}</a>
          </article>
        `
      )
      .join("");
  }

  if (Array.isArray(info.footerLinks) && footerLinks) {
    footerLinks.innerHTML = info.footerLinks
      .map(
        (link) => `
          <a href="${link.url}">${link.label}</a>
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
          ${filter.label}
        </button>
      `
    )
    .join("");

  travauxFilters.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      renderTravauxFilters();
      renderTravauxItems();
    });
  });
}

function openPlaceholderModal(item) {
  if (!mediaModal || !mediaModalViewer || !mediaModalTitle || !mediaModalMeta) return;

  mediaModalTitle.textContent = item.title;
  mediaModalMeta.textContent = item.description;
  mediaModalViewer.innerHTML = `
    <div class="travail-media-placeholder">
      <div>
        <p>Médias à ajouter plus tard</p>
        <p>${item.title}</p>
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
    .map(
      (item) => `
        <article class="travail-card" data-id="${item.id}">
          <div class="travail-media-placeholder">
            <div>
              <p>Image / Vidéo plus tard</p>
              <p>${item.title}</p>
            </div>
          </div>
          <div class="travail-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="travail-meta">
              ${item.tags.map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
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
    .map(
      (item) => `
        <article class="materiau-card">
          <div class="materiau-media-placeholder">
            <div>
              <p>Image produit plus tard</p>
              <p>${item.title}</p>
            </div>
          </div>
          <div class="materiau-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="materiau-meta">
              ${item.tags.map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function setupMenu() {
  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
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
  renderConfig();
  renderInfo();
  renderTravauxFilters();
  renderTravauxItems();
  renderMateriaux();
  setupMenu();
  setupModal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
};
