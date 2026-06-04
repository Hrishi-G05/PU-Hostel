$(document).ready(function () {

  $(".pu-leadership-details-faq-question").on("click", function () {
	  const $item = $(this).parent();

	  // close others
	  $(".pu-leadership-details-faq-item").not($item).removeClass("active");

	  $item.toggleClass("active");
  });
	
  $('.sidebar-nav a').on('click', function () {
	  $('.sidebar-nav a').removeClass('active');
	  $(this).addClass('active');
  });
	
   $(window).on('scroll', function () {
		let scrollPos = $(document).scrollTop();

		$('.infrastructure-detail').each(function () {
			let currLink = $('.sidebar-nav a[href="#' + $(this).attr('id') + '"]');

			if ($(this).position().top <= scrollPos + 100 &&
				$(this).position().top + $(this).height() > scrollPos + 100) {

				$('.sidebar-nav a').removeClass('active');
				currLink.addClass('active');
			}
		});
	});
  // Initialize each tab container separately to handle multiple instances
  $('.tab-container').each(function() {
    const $container = $(this);

    // Set initial active states for this container only
    $container.find('.nav-tabs li:first-child').addClass('active');
    $container.find('.tab-image').removeClass('active');
    $container.find('.tab-image:first').addClass('active');
  });

  // Click function - scope to parent container
  $('.nav-tabs li').click(function () {
    const $container = $(this).closest('.tab-container');

    // Only affect tabs within the same container
    $container.find('.nav-tabs li').removeClass('active');
    $(this).addClass('active');
    $container.find('.tab-text').removeClass('active');
    $container.find('.tab-image').removeClass('active');

    var activeTab = $(this).find('.nav-link').attr('href');
    // Scope the tab pane selection to the current container
    $container.find(activeTab).addClass('active');
    return false;
  });
	
 	$(document).on('click', '.load-more-btn-leadership', function () {

		const $section = $(this).closest('section');
		const itemsToShow = parseInt($section.data('show')); // how many per click

		const $hiddenItems = $section.find('.hidden-item').slice(0, itemsToShow);

		$hiddenItems.removeClass('hidden-item');

		// If no more hidden items → hide button
		if ($section.find('.hidden-item').length === 0) {
			$(this).hide();
		}

	});


});

// Initialize auto-cycling for each tab container separately
document.querySelectorAll('.tab-container').forEach((container) => {
  const cycleTabItems = container.querySelectorAll('.cycle-tab-item');
  const cycleTabpane = container.querySelectorAll('.tab-pane');

  let currentIndex = 0;
  let intervalId;

  function setActiveTab() {
    // Remove the active class from all elements in THIS container only
    cycleTabItems.forEach((item) => {
      item.classList.remove('active');
    });
    cycleTabpane.forEach((item) => {
      item.classList.remove('active');
    });
    // Add the active class to the current element
    cycleTabItems[currentIndex].classList.add('active');
    cycleTabpane[currentIndex].classList.add('active');

    // Calculate the index of the next element
    currentIndex = (currentIndex + 1) % cycleTabItems.length;
  }

  function startInterval() {
    intervalId = setInterval(setActiveTab, 10000);
    // if interval timing is changed make change in css also in the progress-line animation timing
  }

  function stopInterval() {
    clearInterval(intervalId);
  }

  // Set the initial active tab
  setActiveTab();

  // Set interval to switch tabs every 10 seconds
  startInterval();

  // Add event listeners for hover (scoped to this container)
  cycleTabItems.forEach((item) => {
    item.addEventListener('mouseover', stopInterval);
    item.addEventListener('mouseout', startInterval);
  });
	
	
});

// Handle accordion headers within each tab container separately
document.querySelectorAll('.tab-container').forEach((container) => {
  const accordionHeaders = container.querySelectorAll('.accordian-head');

  accordionHeaders.forEach((accordionHeader) => {
    accordionHeader.addEventListener('click', (event) => {
      // Find active accordion within this container only
      const active = container.querySelector('.accordian-head.active');
      if (active && active !== accordionHeader) {
        active.classList.toggle('active');
        active.nextElementSibling.style.height = 0;
      }
      accordionHeader.classList.toggle('active');
      const answer = accordionHeader.nextElementSibling;
      if (accordionHeader.classList.contains('active')) {
        answer.style.height = answer.scrollHeight + 'px';
      } else {
        answer.style.height = 0;
      }
    });
  });

  // Set first accordion as active for this container
  if (accordionHeaders[0]) {
    accordionHeaders[0].classList.add('active');
  }
	
});

