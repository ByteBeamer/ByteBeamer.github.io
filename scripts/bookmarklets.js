var favorites = document.getElementsByClassName("favorite");
var cards = document.getElementsByClassName("card");

var select = document.getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

setInterval(changeCards, 1000);

function changeCards() {
  if (value == "All") {
  for (var i=0, max=cards.length; i < max; i++) {
    cards[i].style.visibility = "shown";
  }
}
if (value == "Favorites") {
  for (var i=0, max=cards.length; i < max; i++) {
       if (cards.classList.contains('favorite')) {
         favorites[i].style.visibility = "shown";
       }
       if (!cards.classList.contains('favorite')) {
         cards[i].style.visibility = "hidden";
       }
  }
}
}
