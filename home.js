(function () {
  const properties = (window.PLG_PROPERTIES || []).filter((property) => {
    return property.published && property.paidActive;
  });

  const grid = document.getElementById("propertyGrid");
  const emptyState = document.getElementById("propertyEmpty");
  const hero = document.querySelector(".hero-box");
  const form = document.getElementById("propertyFilters");
  const countrySelect = document.getElementById("filterCountry");
  const citySelect = document.getElementById("filterCity");
  const neighborhoodSelect = document.getElementById("filterNeighborhood");
  const transactionSelect = document.getElementById("filterTransaction");
  const typeSelect = document.getElementById("filterType");
  const resetButton = document.getElementById("filterReset");

  window.toggleMenu = function toggleMenu() {
    document.getElementById("navMenu")?.classList.toggle("open");
    document.getElementById("hamburger")?.classList.toggle("active");
  };

  if (!grid || !form) {
    return;
  }

  function getUniqueValues(items, key) {
    return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort();
  }

  function setOptions(select, values, defaultLabel) {
    const currentValue = select.value;
    select.innerHTML = `<option value="">${defaultLabel}</option>`;

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });

    if (values.includes(currentValue)) {
      select.value = currentValue;
    }
  }

  function getFilteredBase() {
    return properties.filter((property) => {
      const countryMatch = !countrySelect.value || property.country === countrySelect.value;
      const cityMatch = !citySelect.value || property.city === citySelect.value;
      const transactionMatch = !transactionSelect.value || property.transaction === transactionSelect.value;
      const typeMatch = !typeSelect.value || property.propertyType === typeSelect.value;

      return countryMatch && cityMatch && transactionMatch && typeMatch;
    });
  }

  function updateDependentFilters() {
    const countryScoped = properties.filter((property) => {
      return !countrySelect.value || property.country === countrySelect.value;
    });

    setOptions(citySelect, getUniqueValues(countryScoped, "city"), "Todas las ciudades");

    const neighborhoodScoped = properties.filter((property) => {
      const countryMatch = !countrySelect.value || property.country === countrySelect.value;
      const cityMatch = !citySelect.value || property.city === citySelect.value;

      return countryMatch && cityMatch;
    });

    setOptions(neighborhoodSelect, getUniqueValues(neighborhoodScoped, "neighborhood"), "Todos los barrios");
  }

  function getFilteredProperties() {
    return getFilteredBase().filter((property) => {
      return !neighborhoodSelect.value || property.neighborhood === neighborhoodSelect.value;
    });
  }

  function formatMeta(property) {
    const livingRooms = property.livingRooms ? ` | ${property.livingRooms} salas` : "";
    return `${property.beds} habitaciones | ${property.baths} ba\u00f1os${livingRooms} | ${property.areaM2} m\u00b2`;
  }

  function getWhatsAppUrl(property) {
    const message = `Hola, me interesa recibir el precio de ${property.title} en ${property.city}.`;
    return `https://wa.me/50498547689?text=${encodeURIComponent(message)}`;
  }

  function renderPropertyCard(property) {
    const badgeClass = property.transaction === "sale" ? "status-sale" : "status-rent";
    const showPriceContact = property.priceLabel.toLowerCase().includes("cont");

    return `
      <article class="house houses-main property-card">
        <a class="property-card-image-link" href="${property.detailUrl}" aria-label="Ver ${property.title}">
          <div class="status ${badgeClass}">
            <p class="webText">${property.transactionLabel}</p>
          </div>

          <img class="houseImage houseMainImg" src="${property.thumbnail}" alt="${property.title}" loading="lazy">
        </a>

        <div class="characteristics property-card-content">
          <a class="property-card-copy-link" href="${property.detailUrl}" aria-label="Ver detalles de ${property.title}">
            <p class="property-type webText">${property.propertyTypeLabel}</p>
            <h3 class="property-title webText">${property.title}</h3>
            <h4 class="price webText">${property.priceLabel}</h4>
            ${property.available === false ? `<p class="property-unavailable webText">${property.availabilityLabel || "No disponible en este momento"}</p>` : ""}
          </a>
          ${showPriceContact ? `
            <a class="property-whatsapp-cta" href="${getWhatsAppUrl(property)}" target="_blank" rel="noopener">
              Consultar por WhatsApp
            </a>
          ` : ""}
          <a class="property-card-copy-link" href="${property.detailUrl}" aria-label="Ver ubicación y características de ${property.title}">
            <p class="webText property-meta">${formatMeta(property)}</p>
            <p class="webText location">${property.city}, ${property.country}</p>
          </a>
        </div>
      </article>
    `;
  }

  function renderProperties() {
    const filteredProperties = getFilteredProperties();

    grid.innerHTML = filteredProperties.map(renderPropertyCard).join("");
    emptyState.hidden = filteredProperties.length > 0;
  }

  function updateHeroCity(city) {
    hero?.classList.toggle("hero-tegucigalpa", city === "Tegucigalpa");
    hero?.classList.toggle("hero-san-pedro-sula", city === "San Pedro Sula");
  }

  function syncFilters() {
    updateDependentFilters();
    updateHeroCity(citySelect.value);
    renderProperties();
  }

  function syncDependentFiltersOnly() {
    updateDependentFilters();
    updateHeroCity(citySelect.value);
  }

  setOptions(countrySelect, getUniqueValues(properties, "country"), "Todos los pa\u00edses");
  setOptions(transactionSelect, ["rent", "sale"], "Renta o venta");
  setOptions(typeSelect, getUniqueValues(properties, "propertyType"), "Todos los tipos");

  transactionSelect.querySelector('option[value="rent"]').textContent = "Renta";
  transactionSelect.querySelector('option[value="sale"]').textContent = "En Venta";
  typeSelect.querySelector('option[value="house"]').textContent = "Casa";

  countrySelect.value = "Honduras";
  updateDependentFilters();
  updateHeroCity("");
  renderProperties();

  form.addEventListener("change", syncDependentFiltersOnly);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    syncFilters();
    document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetButton.addEventListener("click", () => {
    countrySelect.value = "Honduras";
    citySelect.value = "";
    neighborhoodSelect.value = "";
    transactionSelect.value = "";
    typeSelect.value = "";
    syncFilters();
  });

  const whyGrid = document.querySelector(".why-choose-grid");
  const whyCards = [...document.querySelectorAll(".why-card")];
  const whyDots = [...document.querySelectorAll(".why-carousel-dot")];
  const whyPrev = document.querySelector(".why-carousel-prev");
  const whyNext = document.querySelector(".why-carousel-next");

  function setWhySlide(index) {
    const nextIndex = (index + whyCards.length) % whyCards.length;

    whyCards[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });

    whyDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === nextIndex);
    });
  }

  function getCurrentWhyIndex() {
    if (!whyGrid || !whyCards.length) {
      return 0;
    }

    return Math.round(whyGrid.scrollLeft / whyGrid.clientWidth);
  }

  if (whyGrid && whyCards.length && whyDots.length) {
    whyDots.forEach((dot, index) => {
      dot.addEventListener("click", () => setWhySlide(index));
    });

    whyPrev?.addEventListener("click", () => setWhySlide(getCurrentWhyIndex() - 1));
    whyNext?.addEventListener("click", () => setWhySlide(getCurrentWhyIndex() + 1));

    whyGrid.addEventListener("scroll", () => {
      const currentIndex = getCurrentWhyIndex();

      whyDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    });
  }
})();
