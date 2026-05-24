// POPUP FUNCTIONS
function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// HOMEPAGE SERVICE CARD AUTO IMAGE CHANGE
const serviceImages = [
  "images/hero-bedroom.jpeg",
  "images/hero-bedroom.jpeg",
  "images/hero-bedroom.jpeg",
  "images/hero-bedroom.jpeg"
];

let currentServiceImage = 0;

function changeServiceImages() {
  currentServiceImage = (currentServiceImage + 1) % serviceImages.length;

  const sliders = [
    document.getElementById("kitchen-slider"),
    document.getElementById("bedroom-slider"),
    document.getElementById("living-slider"),
    document.getElementById("office-slider")
  ];

  sliders.forEach(slider => {
    if (slider) {
      slider.src = serviceImages[currentServiceImage];
    }
  });
}

setInterval(changeServiceImages, 3000);

// INNER PAGE IMAGE SLIDER
const pageSlider = document.getElementById("page-slider");

if (pageSlider) {
  const pageImages = [
    "images/hero-bedroom.jpeg",
    "images/hero-bedroom.jpeg",
    "images/hero-bedroom.jpeg",
    "images/hero-bedroom.jpeg",
    "images/hero-bedroom.jpeg"
  ];

  let currentPageImage = 0;

  setInterval(() => {
    currentPageImage = (currentPageImage + 1) % pageImages.length;
    pageSlider.src = pageImages[currentPageImage];
  }, 2500);
}