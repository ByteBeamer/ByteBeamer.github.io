var cards = document.getElementsByClassName("card");

var select = document.getElementById('card_filter');
var value = select.options[select.selectedIndex].value;

select.onclick = function () {
  Array.from(document.getElementsByClassName(cards)).forEach(
      function (card) {
        if (value == "1") {
        card.style.visibility = 'visible';
      } 
      if (value == "2") {
        if (card.classList.contains('favorite')) {
          card.style.visibility = 'visible';
        }
        if (!card.classList.contains('favorite')) {
          card.style.visibility = "hidden";
        }
      }
    }
  );
  Array.prototype.forEach.call(cards, function(card) {
    
  });
};
