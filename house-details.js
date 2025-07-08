
const params = new URLSearchParams(window.location.search);
const propertyId = parseInt(params.get("id"));

const property = properties.find(p => p.id === propertyId);

if (property) {
  document.getElementById("property-title").textContent = property.title;
  document.getElementById("property-location").textContent = property.location;
  document.getElementById("property-price").textContent = `RWF ${property.price.toLocaleString()}`;
  document.getElementById("property-description").innerHTML = property.description;

  // Gallery Slider
  const gallerySlider = document.getElementById("gallery-slider");
  if (gallerySlider && property.images) {
    property.images.forEach(image => {
      const img = document.createElement("img");
      img.src = image;
      img.alt = property.title;
      img.classList.add("slider-image");
      gallerySlider.appendChild(img);
    });
  }

  // WhatsApp Contact Button
  const contactButton = document.querySelector(".contact-agent-btn");
  if (contactButton && property.whatsapp) {
    contactButton.href = `https://wa.me/${property.whatsapp}?text=Hi!%20I'm%20interested%20in%20the%20property:%20${encodeURIComponent(property.title)}`;
  }

  // Map
  const mapContainer = document.getElementById("property-map");
  if (property.latitude && property.longitude && mapContainer) {
    const mapIframe = document.createElement("iframe");
    mapIframe.src = `https://www.google.com/maps?q=${property.latitude},${property.longitude}&hl=en&z=15&output=embed`;
    mapIframe.width = "100%";
    mapIframe.height = "300";
    mapIframe.style.border = "0";
    mapIframe.loading = "lazy";
    mapIframe.allowFullscreen = true;
    mapContainer.appendChild(mapIframe);
  } else if (mapContainer) {
    mapContainer.innerHTML = "<p>Location information not available.</p>";
  }

} else {
  document.getElementById("property-title").textContent = "Property not found.";
}
