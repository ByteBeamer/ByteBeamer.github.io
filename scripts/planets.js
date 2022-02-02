window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    let image = document.getElementById("planet");
    let circle = document.getElementById("circle");
    let cutout = document.getElementById("cutout");
    if ((window.pageYOffset * 1.5) >= 360) {
    } else {
        image.style.transform = "rotate(" + window.pageYOffset * 1.5 + "deg)";
        if (getCurrentRotation(image) >= 180) {
            image.classList.remove("sun-container");
            circle.classList.remove("circle-sun");
            image.classList.add("moon-container");
            circle.classList.add("circle-moon");
            cutout.classList.add("cutout");
            document.querySelector("html").classList.add("dark-background");
        } /*else {
            image.classList.remove("moon-container");
            circle.classList.remove("circle-moon");
            image.classList.add("sun-container");
            circle.classList.add("circle-sun");
            cutout.classList.remove("cutout");
        } */
    }
}

function getCurrentRotation(el){
  var st = window.getComputedStyle(el, null);
  var tm = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           "none";
  if (tm != "none") {
    var values = tm.split('(')[1].split(')')[0].split(',');
    /*
    a = values[0];
    b = values[1];
    angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
    */
    //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
    var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
  }
  return 0;


}
