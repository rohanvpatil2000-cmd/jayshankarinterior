function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

if (!localStorage.getItem("popupShown")) {
  setTimeout(() => {
    openPopup();
    localStorage.setItem("popupShown", "true");
  }, 4000);
}
