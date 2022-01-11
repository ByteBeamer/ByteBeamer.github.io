var cards = document.body.getElementByClassName("cards")[0].getElementsByClassName("card");

var select = document.body.getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

select.onchange=update();

function update() {
  
  Array.prototype.forEach.call(cards, function(card) {
    if (value == "All") {
      card.style.visibility = "visible";
    } else if (value == "Favorites") {
      if (card.classList.contains('favorite')) {
         card.style.visibility = "visible";
      }
      else if (!card.classList.contains('favorite')) {
         card.style.visibility = "hidden";
      }
    }
  });
}
