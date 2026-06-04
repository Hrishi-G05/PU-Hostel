document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".infrastructure-detail-wrapper .infrastructure-detail");
  const navLinks = document.querySelectorAll(".tags .tag-set2");

  function changeActiveLink() {
    let scrollY = window.scrollY;

    sections.forEach((section, index) => {
      if (scrollY >= section.offsetTop - 100 && scrollY < section.offsetTop + section.offsetHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", changeActiveLink);
});