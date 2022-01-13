//working
var cards = document.getElementsByClassName("card");

var select = document.getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

select.onchange = function () {
  value = select.options[select.selectedIndex].value;
  Array.prototype.forEach.call(cards, function(card) {
      if (value == "1") {
        card.style.visibility = "visible";
        card.style.maxHeight = "1fr";
      } 
      if (value == "2") {
        if (card.classList.contains('favorite')) {
          card.style.visibility = "visible";
          card.style.maxHeight = "1fr";
        }
        else {
          card.style.visibility = "hidden";
          card.style.maxHeight = "0px";
        }
      }
  });
};
