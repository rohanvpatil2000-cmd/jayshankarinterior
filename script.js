function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// AUTO POPUP after 2 seconds
window.addEventListener("load", function () {
  setTimeout(function () {
    openPopup();
  }, 2000);
});
