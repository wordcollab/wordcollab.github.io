document.addEventListener("DOMContentLoaded", () => {
  const portfolioGrid = document.getElementById("portfolioGrid");
  const productsGrid = document.getElementById("productsGrid");
  const langToggle = document.getElementById("langToggle");

  const travaux = Array.isArray(window.siteTravaux) ? window.siteTravaux : [];
  const materiaux = Array.isArray(window.siteMateriaux) ? window.siteMateriaux : [];

  const translations = {
    fr: {
      navHome: "Accueil",
      navPortfolio: "Portfolio",
      navProducts: "Produits",
      navContact: "Contact",

      heroLocation: "Relizane, Algérie",
      heroTitle: "Faux plafonds, cloisons et finition intérieure moderne",
      heroText:
        "Un savoir-faire propre, précis et élégant pour valoriser vos espaces résidentiels et professionnels.",
      heroPrimaryBtn: "Découvrir nos travaux",
      heroSecondaryBtn: "Nous contacter",

      portfolioLabel: "Portfolio",
      portfolioTitle: "Nos réalisations",
      portfolioText:
        "Une sélection de travaux en cloisons, faux plafonds, habillage mural et finitions.",

      productsLabel: "Galerie Produits",
      productsTitle: "Matériaux et produits",
      productsText:
        "Les matériaux et éléments utilisés pour garantir un rendu propre, durable et esthétique.",

      contactLabel: "Contact",
      contactTitle: "Parlons de votre projet",
      contactText:
        "Contactez-nous rapidement par WhatsApp ou téléphone pour discuter de votre besoin.",
      contactWhatsappLabel: "WhatsApp",
      contactPhoneLabel: "0672 25 35 70",

      footerLocation: "Relizane, Algérie",
      footerPortfolio: "Portfolio",
      footerProducts: "Produits",
      footerWhatsapp: "WhatsApp",
      footerPhone: "Téléphone"
    },

    ar: {
      navHome: "الرئيسية",
      navPortfolio: "الأعمال",
      navProducts: "المنتجات",
      navContact: "تواصل",

      heroLocation: "غليزان، الجزائر",
      heroTitle: "أسقف معلقة، قواطع وتشطيبات داخلية عصرية",
      heroText:
        "خبرة نظيفة ودقيقة وأنيقة لإبراز المساحات السكنية والمهنية.",
      heroPrimaryBtn: "اكتشف أعمالنا",
      heroSecondaryBtn: "تواصل معنا",

      portfolioLabel: "الأعمال",
      portfolioTitle: "بعض من أعمالنا",
      portfolioText:
        "مجموعة من أعمال القواطع والأسقف المعلقة وتغليف الجدران والتشطيبات.",

      productsLabel: "المنتجات",
      productsTitle: "المواد والمنتجات",
      productsText:
        "المواد والعناصر المستخدمة للحصول على نتيجة نظيفة ومتينة وأنيقة.",

      contactLabel: "تواصل",
      contactTitle: "لنتحدث عن مشروعك",
      contactText:
        "تواصل معنا بسرعة عبر واتساب أو الهاتف لمناقشة حاجتك.",
      contactWhatsappLabel: "واتساب",
      contactPhoneLabel: "0672 25 35 70",

      footerLocation: "غليزان، الجزائر",
      footerPortfolio: "الأعمال",
      footerProducts: "المنتجات",
      footerWhatsapp: "واتساب",
      footerPhone: "هاتف"
    }
  };

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function applyLanguage(lang) {
    const content = translations[lang] || translations.fr;

    document.documentElement.lang = lang === "ar" ? "ar" : "fr";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    setText("navHome", content.navHome);
    setText("navPortfolio", content.navPortfolio);
    setText("navProducts", content.navProducts);
    setText("navContact", content.navContact);

    setText("heroLocation", content.heroLocation);
    setText("heroTitle", content.heroTitle);
    setText("heroText", content.heroText);
    setText("heroPrimaryBtn", content.heroPrimaryBtn);
    setText("heroSecondaryBtn", content.heroSecondaryBtn);

    setText("portfolioLabel", content.portfolioLabel);
    setText("portfolioTitle", content.portfolioTitle);
    setText("portfolioText", content.portfolioText);

    setText("productsLabel", content.productsLabel);
    setText("productsTitle", content.productsTitle);
    setText("productsText", content.productsText);

    setText("contactLabel", content.contactLabel);
    setText("contactTitle", content.contactTitle);
    setText("contactText", content.contactText);
    setText("contactWhatsappLabel", content.contactWhatsappLabel);
    setText("contactPhoneLabel", content.contactPhoneLabel);

    setText("footerLocation", content.footerLocation);
    setText("footerPortfolio", content.footerPortfolio);
    setText("footerProducts", content.footerProducts);
    setText("footerWhatsapp", content.footerWhatsapp);
    setText("footerPhone", content.footerPhone);

    if (langToggle) {
      langToggle.setAttribute(
        "aria-label",
        lang === "fr" ? "Changer vers l’arabe" : "التحويل إلى الفرنسية"
      );
    }
  }

  function createPortfolioCard(item) {
    return `
      <article class="portfolio-card">
        <div class="portfolio-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="portfolio-body">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `;
  }

  function createProductCard(item) {
    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="product-body">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `;
  }

  if (portfolioGrid) {
    portfolioGrid.innerHTML = travaux.length
      ? travaux.map(createPortfolioCard).join("")
      : `<p class="empty-state">Les réalisations seront ajoutées bientôt.</p>`;
  }

  if (productsGrid) {
    productsGrid.innerHTML = materiaux.length
      ? materiaux.map(createProductCard).join("")
      : `<p class="empty-state">Les produits seront ajoutés bientôt.</p>`;
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  let currentLanguage = "fr";
  applyLanguage(currentLanguage);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLanguage = currentLanguage === "fr" ? "ar" : "fr";
      applyLanguage(currentLanguage);
    });
  }
});
