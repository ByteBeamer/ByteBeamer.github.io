var nav = document.getElementsByTagName("nav")[0];

var nav_overlay = document.getElementsByClassName("start-home")[0];

var nav_items = document.getElementsByClassName("nav-item");

var min = document.getElementById("minimize-nav");

var max = document.getElementById("maximize-nav");

min.onclick = function () {

  nav.classList.remove("slide-out");

  nav.classList.add("slide-in");

  nav_overlay.style.visibility = "hidden";

  min.style.visibility = "hidden";
  for (var i = 0; i < nav_items.length; i++) {
   nav_items[i].style.visibility = "hidden";
  }
  setTimeout(function () {

    nav.style.visibility = "hidden";

  }, 475);

  setTimeout(function () {

    max.style.visibility = "visible";

    max.classList.add("maximize-slide");

  }, 500);

};

max.onclick = function () {

  max.classList.remove("maximize-slide");

  max.style.visibility = "hidden";

  nav.style.visibility = "visible";

  nav_overlay.style.visibility = "visible";

  min.style.visibility = "visible";

  nav.classList.remove("slide-in");

  nav.classList.add("slide-out");
  setTimeout(function(){
    for (var i = 0; i < nav_items.length; i++) {
   nav_items[i].style.visibility = "visible";
  }
  });
  //for glitch look 250

};

