jQuery(document).ready(function () {
  jQuery('.related-boxes-common').each(function() {
    var $carousel = $(this);
    $carousel.owlCarousel({
      loop: false,
      margin: 12,
      nav: false,
      items: 1,
      dots: false,
      responsiveClass: true,
      stagePadding: 0,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          stagePadding: 40,
          margin: 8
        },
        568: {
          items: 2,
          stagePadding: 0
        },
        768: {
          stagePadding: 80,
          items: 2,
          margin: 8
        },
        991: {
          items: 3,
          stagePadding: 20
        },
        1240: {
          stagePadding: 40,
          items: 3
        },
        1600: {
          stagePadding: 80,
          items: 3
        },
        1900: {
          items: 3
        }
      }
    });
  });
});
