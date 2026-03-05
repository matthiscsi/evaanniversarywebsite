(function () {
  const image = document.getElementById("randomPhoto");
  const status = document.getElementById("photoStatus");
  const button = document.getElementById("newPhotoBtn");

  const photos = Array.isArray(window.PHOTO_FILES) ? window.PHOTO_FILES.slice() : [];
  let previousIndex = -1;

  function pickRandomIndex(length) {
    if (length <= 1) {
      return 0;
    }

    let index = Math.floor(Math.random() * length);
    while (index === previousIndex) {
      index = Math.floor(Math.random() * length);
    }
    return index;
  }

  function showMessage(text) {
    status.textContent = text;
  }

  function renderRandomPhoto() {
    if (!photos.length) {
      image.style.display = "none";
      showMessage("Nog geen foto's gevonden. Voeg bestanden toe in photos/ en pas photo-list.js aan.");
      return;
    }

    const index = pickRandomIndex(photos.length);
    previousIndex = index;
    const fileName = photos[index];
    const src = "photos/" + fileName;

    image.style.display = "none";
    showMessage("Laden: " + fileName);

    image.onload = function () {
      image.style.display = "block";
      showMessage("Nu zichtbaar: " + fileName);
    };

    image.onerror = function () {
      image.style.display = "none";
      showMessage("Kon " + fileName + " niet laden. Check de bestandsnaam in photo-list.js.");
    };

    image.src = src;
  }

  button.addEventListener("click", renderRandomPhoto);

  window.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      event.preventDefault();
      renderRandomPhoto();
    }
  });

  renderRandomPhoto();
})();
