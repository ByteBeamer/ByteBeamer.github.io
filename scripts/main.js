window.onscroll = function() {fade1()};

function fade1() {
  if (document.body.scrollTop > 1000 | document.documentElement.scrollTop > 1000) {
    document.getElementById("banner").hidden = true;
    document.getElementById("cards").hidden = false;
  } else {
    document.getElementById("banner").hidden = false;
    document.getElementById("cards").hidden = true;
  }
}
