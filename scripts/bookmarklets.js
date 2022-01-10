var favorites = document.getElementsByClassName("favorite");
var cards = document.getElementsByClassName("card");

if (select == "All") {
  for (var i=0, max=cards.length; i < max; i++) {
    cards.style.visibility = "shown";
  }
}
if (select == "Favorites") {
  for (var i=0, max=cards.length; i < max; i++) {
       if (cards.classList.contains('favorite')) {
         favorites[i].style.visibility = "shown";
       }
       if (!cards.classList.contains('favorite')) {
         cards[i].style.visibility = "hidden";
       }
  }
}
