var cards = document.getElementsByClassName("card");

var select = document.getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

select.onchange = function () {
  alert("changed! Value: " + value);
  Array.prototype.forEach.call(cards, function(card) {
      if (value == "1") {
        card.style.visibility = "visible";
      } 
      if (value == "2") {
        if (card.classList.contains('favorite')) {
          card.style.visibility = "visible";
        }
        else {
          card.style.visibility = "hidden";
        }
      }
  });
};
