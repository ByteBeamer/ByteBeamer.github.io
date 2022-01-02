var section = document.getElementsByClassName('section')[1];
var height  = document.getElementsByClassName('cards')[0].scrollHeight;
function resize () {
  section.setAttribute("style","height:" + height);
}
window.onload = resize;
window.addEventListener('resize', resize);




const link = document.getElementsByClassName("li");
const transition = document.querySelector(".transition");
link.addEventListener("click", (e) => {
  e.preventDefault();
  transition.classList.add("slide");
  setTimeout(() => {
    window.location = link.href;
  }, 900);
});
