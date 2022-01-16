var section = document.getElementsByClassName('section')[1];
var height  = document.getElementsByClassName('cards')[0].scrollHeight;
function resize () {
  section.style.height = height;
}
window.onload = resize;
window.addEventListener('resize', resize);



const links = document.querySelectorAll(".link");
const transition = document.querySelector(".transition");
links.forEach(function(a) {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    transition.classList.add("slide");
    setTimeout(() => {
      window.location = a.href;
    }, 900);
  });
});
