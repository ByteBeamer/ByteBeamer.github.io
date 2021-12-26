const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})


const buttons = document.querySelectorAll("li");
buttons.forEach(btn => {
  btn.addEventListener("click", function(e) {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    
    let ripples = document.createElement("span");
    ripples.style.left = '${x}px'
    ripples.style.top = '${y}px';
    this.appendChild(ripples);
    setTimeout(() => {
      ripples.remove()
    },1000);
  })
})
