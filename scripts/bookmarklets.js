var cards = document.getElementByClassName("cards")[0].getElementsByClassName("card");

var select = document.getElementsByClassName("select")[0].getElementByClassName("dropdown-container")[0].getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

select.onchange = function () {
  Array.prototype.forEach.call(cards, function(card) {
    if (value == "1") {
      card.style.visibility = 'visible';
    } 
    if (value == "2") {
      if (card.classList.contains('favorite')) {
         card.style.visibility = 'visible';
      }
      if (!card.classList.contains('favorite')) {
         card.style.visibility = 'hidden";
      }
    }
  });
};
