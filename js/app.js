document.addEventListener("DOMContentLoaded", () => {
  const portfolioGrid = document.getElementById("portfolioGrid");
  const productsGrid = document.getElementById("productsGrid");

  const travaux = Array.isArray(window.siteTravaux) ? window.siteTravaux : [];
  const materiaux = Array.isArray(window.siteMateriaux) ? window.siteMateriaux : [];

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
    if (travaux.length > 0) {
      portfolioGrid.innerHTML = travaux.map(createPortfolioCard).join("");
    } else {
      portfolioGrid.innerHTML = `
        <p class="empty-state">
          Les réalisations seront ajoutées bientôt.
        </p>
      `;
    }
  }

  if (productsGrid) {
    if (materiaux.length > 0) {
      productsGrid.innerHTML = materiaux.map(createProductCard).join("");
    } else {
      productsGrid.innerHTML = `
        <p class="empty-state">
          Les produits seront ajoutés bientôt.
        </p>
      `;
    }
  }

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
