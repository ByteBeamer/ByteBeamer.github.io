window.onscroll = function() {fade1()};

function fade1() {
  if (document.body.scrollTop > 1000 | document.documentElement.scrollTop > 1000) {
    document.getElementById("banner").diplay = "blank";
    document.getElementById("cards").display = "block";
  } else {
    document.getElementById("banner").diplay = "block";
    document.getElementById("cards").display = "blank";
  }
}
