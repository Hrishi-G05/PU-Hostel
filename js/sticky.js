// document.addEventListener("DOMContentLoaded", function () {
//   const navLinks = document.querySelectorAll(".nav-link-sticky");
//   const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute("href")));

//   // Scroll to section on click
//   navLinks.forEach(link => {
//     link.addEventListener("click", function (e) {
//       e.preventDefault();
//       const targetId = this.getAttribute("href");
//       const targetSection = document.querySelector(targetId);
//       window.scrollTo({
//         top: targetSection.offsetTop - 50, // Adjust for any fixed header
//         behavior: "smooth"
//       });
//     });
//   });

//   // Highlight nav link on scroll
//   window.addEventListener("scroll", function () {
//     let scrollPosition = window.scrollY;

//     sections.forEach((section, index) => {
//       if (
//         section.offsetTop - 100 <= scrollPosition &&
//         section.offsetTop + section.offsetHeight > scrollPosition
//       ) {
//         navLinks.forEach(link => link.classList.remove("active"));
//         navLinks[index].classList.add("active");
//       }
//     });
//   });
// });
// 
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link-sticky");

  const sections = Array.from(navLinks).map(link => {
    const target = link.getAttribute("data-bs-target");
    return target ? document.querySelector(target) : null;
  });

  // Scroll to section on click
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-bs-target");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) return; // 🔒 safety

      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: "smooth"
      });
    });
  });

  // Highlight nav link on scroll
  window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
      if (!section) return; // 🔒 important fix

      if (
        section.offsetTop - 100 <= scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  });
});