//working
var cards = document.getElementsByClassName("card");

var select = document.getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

select.onchange = function () {
  value = select.options[select.selectedIndex].value;
  Array.prototype.forEach.call(cards, function(card) {
      if (value == "1") {
        card.style.display = "inherit";
      } 
      if (value == "2") {
        if (card.classList.contains('favorite')) {
          card.style.display = "inherit";
        }
        else {
          card.style.display = "none";
        }
      }
  });
};
