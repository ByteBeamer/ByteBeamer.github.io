var section = document.getElementsByClassName('section')[1];
var height  = document.getElementsByClassName('cards')[0].style.height;
function resize () {
  section.setAttribute("style","height:" + height);
}
window.onload = resize;
window.addEventListener('resize', resize);
