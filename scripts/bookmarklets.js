var cards = document.body.getElementByClassName("cards")[0].getElementsByClassName("card");

var select = document.body.getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

select.onchange = function () {
  Array.prototype.forEach.call(cards, function(card) {
    if (value == "1") {
      card.style.display = 'block';
    } 
    if (value == "2") {
      if (card.classList.contains('favorite')) {
         card.style.display = 'block';
      }
      if (!card.classList.contains('favorite')) {
         card.style.display = 'none';
      }
    }
  });
};

function updateCards() {
  Array.prototype.forEach.call(cards, function(card) {
    if (value == "1") {
      card.style.visibility = "visible";
    } 
    if (value == "2") {
      if (card.classList.contains('favorite')) {
         card.style.visibility = "visible";
      }
      if (!card.classList.contains('favorite')) {
         card.style.visibility = "hidden";
      }
    }
  });
}
