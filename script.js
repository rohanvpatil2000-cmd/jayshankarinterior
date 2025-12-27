function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// ✅ AUTO OPEN POPUP AFTER 5 SECONDS
window.onload = function () {
  setTimeout(function () {
    openPopup();
  }, 5000);
};
