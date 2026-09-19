const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const options = {
  root: null, // uses the viewport
  rootMargin: '-50% 0px -50% 0px', // Triggers exactly when section hits the middle of the screen
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
          link.scrollIntoView({
            behavior: "smooth", // or "auto"
            block: "nearest",   // Keeps vertical scrolling isolated to closest parent
            inline: "center"   // Keeps horizontal scrolling isolated to closest parent
          });
        }
      });
    }
  });
}, options);

sections.forEach(section => observer.observe(section));