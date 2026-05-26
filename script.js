const WHATSAPP_URL = "https://wa.me/+919765261313";
const PHONE_NUMBER = "+919765261313";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1d_uRcnbtleax9MZRhC6FLLSPTw43_CeZFEFOLj0PG4w/viewform?usp=sf_link";
const SLIDE_DELAY = 4000;
const MAX_IMAGES = 6;
const IMAGE_EXTENSIONS = ["jpeg", "jpg", "png", "webp"];

// Builds candidate names such as kitchen1.jpeg, kitchen 1.jpeg, kitchen6.jpeg.
function buildCandidates(slideshow) {
  const explicitImages = (slideshow.dataset.images || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  const prefixes = (slideshow.dataset.prefixes || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const candidates = new Set(explicitImages);

  prefixes.forEach((prefix) => {
    for (let number = 1; number <= MAX_IMAGES; number += 1) {
      IMAGE_EXTENSIONS.forEach((extension) => {
        candidates.add(`${prefix}${number}.${extension}`);
        candidates.add(`${prefix} ${number}.${extension}`);
      });
    }
  });

  return Array.from(candidates);
}

function testImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

async function getAvailableImages(slideshow) {
  const candidates = buildCandidates(slideshow);
  const testedImages = await Promise.all(candidates.map(testImage));
  return testedImages.filter(Boolean).slice(0, MAX_IMAGES);
}

function updateSlide(slideshow, images, index) {
  const image = slideshow.querySelector("img");
  const status = slideshow.querySelector(".slide-status");

  if (!image || !images.length) return;

  image.classList.add("fade-out");
  window.setTimeout(() => {
    image.src = images[index];
    image.classList.remove("fade-out");
  }, 180);

  if (status) {
    status.textContent = `${index + 1} / ${images.length}`;
  }
}

async function setupSlideshow(slideshow) {
  const image = slideshow.querySelector("img");
  const previousButton = slideshow.querySelector('[data-slide="prev"]');
  const nextButton = slideshow.querySelector('[data-slide="next"]');
  const images = await getAvailableImages(slideshow);

  if (!image) return;

  if (!images.length) {
    image.removeAttribute("src");
    image.alt = "No images are available for this section yet.";
    slideshow.insertAdjacentHTML("beforeend", '<span class="slide-status">No images</span>');
    if (previousButton) previousButton.hidden = true;
    if (nextButton) nextButton.hidden = true;
    return;
  }

  let currentIndex = 0;
  image.src = images[currentIndex];

  const status = document.createElement("span");
  status.className = "slide-status";
  slideshow.appendChild(status);
  updateSlide(slideshow, images, currentIndex);

  const showPrevious = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide(slideshow, images, currentIndex);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide(slideshow, images, currentIndex);
  };

  if (previousButton) previousButton.addEventListener("click", showPrevious);
  if (nextButton) nextButton.addEventListener("click", showNext);

  if (images.length > 1) {
    window.setInterval(showNext, SLIDE_DELAY);
  } else {
    if (previousButton) previousButton.hidden = true;
    if (nextButton) nextButton.hidden = true;
  }
}

function setupAllSlideshows() {
  document.querySelectorAll(".js-slideshow").forEach(setupSlideshow);
}

function openPopup() {
  const popup = document.getElementById("enquiry-popup");
  if (!popup) return;
  popup.hidden = false;
  const firstInput = popup.querySelector("input");
  if (firstInput) firstInput.focus();
}

function closePopup() {
  const popup = document.getElementById("enquiry-popup");
  if (!popup) return;
  popup.hidden = true;
  sessionStorage.setItem("jayshankarPopupClosed", "true");
}

function setupPopup() {
  const popup = document.getElementById("enquiry-popup");
  const form = document.getElementById("enquiry-form");

  document.querySelectorAll("[data-open-popup]").forEach((button) => {
    button.addEventListener("click", openPopup);
  });

  document.querySelectorAll("[data-close-popup]").forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  if (popup) {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) closePopup();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePopup();
  });

  if (document.body.classList.contains("home-page") && !sessionStorage.getItem("jayshankarPopupClosed")) {
    window.setTimeout(openPopup, 1400);
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const message = [
        "Hello Jayshankar Interior, I want a free quote.",
        `Name: ${data.get("name") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Email: ${data.get("email") || "Not provided"}`,
        `Requirement: ${data.get("requirement") || ""}`
      ].join("\n");

      // Direct Google Form submission needs hidden Google entry IDs. This opens the provided form after local validation.
      window.open(GOOGLE_FORM_URL, "_blank", "noopener");
      window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      closePopup();
      form.reset();
    });
  }
}

function updateContactLinks() {
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    link.href = WHATSAPP_URL;
  });
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.href = `tel:${PHONE_NUMBER}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateContactLinks();
  setupAllSlideshows();
  setupPopup();
});
