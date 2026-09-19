document.querySelectorAll('.play-on-hover').forEach(el => {
  el.classList.add("image-container");
  const animated = el.getAttribute('animated');
  const still = el.getAttribute('still');
  var imageAnimated = document.createElement("img");
  var imageStill = document.createElement("img");
  imageAnimated.src = animated;
  imageAnimated.className = "preview-image-animated";
  imageStill.src = still;
  imageStill.className = "preview-image-still";
  el.appendChild(imageAnimated);
  el.appendChild(imageStill);
});