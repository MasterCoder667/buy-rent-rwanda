document.addEventListener("DOMContentLoaded", function () {
  const locationInput = document.getElementById("search-location");
  const advertTypeInput = document.getElementById("filter-advertType");
    const typeInput = document.getElementById("filter-type");
    const bedroomsInput = document.getElementById("filter-bedrooms");
    const priceInput = document.getElementById("filter-price");
    const searchButton = document.querySelector(".search-bar-container button");
    const propertyList = document.querySelector(".mini-property-list");

    // Render property cards
    function renderProperties(list) {
      propertyList.innerHTML = "";

      if (list.length === 0) {
        propertyList.innerHTML = "<p>No properties found.</p>";
        return;
      }

      list.forEach((prop) => {
        const card = document.createElement("div");
        card.classList.add("mini-property-card");

        card.innerHTML = `
          <a href="${prop.link}">
            <img src="${prop.image}" alt="${prop.title}" class="card-image" />
            <div class="card-info">
              <h3 class="card-title">${prop.title}</h3>
              <ul class="card-tags">
                <li><strong>Advert:</strong> ${prop.advertType}</li>
                <li><strong>Type:</strong> ${prop.type}</li>
                <li><strong>Bedrooms:</strong> ${prop.bedrooms}</li>
                <li><strong>Location:</strong> ${prop.location}</li>
              </ul>
              <p class="card-price">${prop.price}</p>
            </div>
          </a>
        `;

        propertyList.appendChild(card);
      });
    }

    // Filter logic
    function filterProperties() {
      const location = locationInput.value.toLowerCase();
      const advertType = advertTypeInput.value;
      const type = typeInput.value;
      const bedrooms = bedroomsInput.value;
      const maxPrice = parseInt(priceInput.value);

      const filtered = properties.filter((prop) => {
        const matchesLocation =
          location === "" || prop.location.toLowerCase().includes(location);

        const matchesAdvert =
          advertType === "" || prop.advertType.toLowerCase() === advertType.toLowerCase();

        const matchesType =
          type === "" || prop.type.toLowerCase() === type.toLowerCase();

        const matchesBedrooms =
          bedrooms === "" ||
          (bedrooms === "2-4" && prop.bedrooms >= 2 && prop.bedrooms <= 4) ||
          (bedrooms === "5-7" && prop.bedrooms >= 5 && prop.bedrooms <= 7) ||
          (bedrooms === "8-9" && prop.bedrooms >= 8 && prop.bedrooms <= 9) ||
          (bedrooms === "9+" && prop.bedrooms >= 9) ||
          parseInt(bedrooms) === prop.bedrooms;

        const priceValue = parseInt(prop.price.replace(/[^\d]/g, ""));
        const matchesPrice = isNaN(maxPrice) || priceValue <= maxPrice;

        return (
          matchesLocation &&
          matchesAdvert &&
          matchesType &&
          matchesBedrooms &&
          matchesPrice
        );
      });

      renderProperties(filtered);
    }

    // Detect current page to auto-filter for Rent/Sale
    const page = location.pathname.split("/").pop();
    let displayProps = properties;

    if (page === "forrent.html") {
      displayProps = properties.filter((p) => p.advertType === "Rent");
    } else if (page === "forsale.html") {
      displayProps = properties.filter((p) => p.advertType === "Sale");
    }

    // Render initial properties
    renderProperties(displayProps);

    // Trigger filtering when search button is clicked
    if (searchButton) {
      searchButton.addEventListener("click", filterProperties);
    }
});