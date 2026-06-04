(function($) {
    'use strict';
    
    $(document).ready(function() {
        $('#footer-newsletter-form').on('submit', function(e) {
            e.preventDefault();
            
            var form = $(this);
            var submitButton = form.find('button[type="submit"]');
            var originalButtonText = submitButton.text();
            var formData = form.serialize();
            
            // Basic email validation
            var email = form.find('input[type="email"]').val();
            if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Debug: Log the form data and AJAX URL
            console.log('Form Data:', formData);
            console.log('AJAX URL:', newsletter_ajax.ajax_url);

	function getNewsletterEventData() {
	  const $form = $("#footer-newsletter-form");
	  const $parent = $form.closest(".subscribe-area");

	  const eventData = {
	    event: "subscribe_click_success",
	    click_header: $parent.find("h5").first().text().trim() || "",
	    click_text: $form.find("button[type='submit']").text().trim() || "",
	  };

	  if (typeof wpEnv !== "undefined" && wpEnv.type !== "production") {
	    console.log(eventData);
	  }

	  return eventData;
	}
	const newsletterEventData = getNewsletterEventData();
            
            $.ajax({
                type: 'POST',
                url: newsletter_ajax.ajax_url,
                data: formData,
                dataType: 'json',
                beforeSend: function() {
                    submitButton.prop('disabled', true).text('Submitting...');
                },
                success: function(response) {
                    console.log('Response:', response);
                    if (response.success) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push(newsletterEventData);
                        form.html('<div class="newsletter-success"><p class="font-color-white">' + response.data + '</p></div>');
                    } else {
                        submitButton.prop('disabled', false).text(originalButtonText);
                        alert(response.data || 'An error occurred. Please try again.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('AJAX Error:', {
                        status: status,
                        error: error,
                        response: xhr.responseText
                    });
                    submitButton.prop('disabled', false).text(originalButtonText);
                    alert('An error occurred while processing your request. Please try again later.');
                }
            });
        });
    });
	
	  $("[id^=pidSiderCard-]").each(function () {
    $(this).owlCarousel({
      loop: true,
      margin: 12,
      nav: true,
      items: 1,
      dots: false,
      responsiveClass: true,
      stagePadding: 0,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          stagePadding: 40,
          margin: 8,
        },
        568: {
          items: 2,
          stagePadding: 0,
        },
        768: {
          stagePadding: 80,
          items: 2,
        },
        991: {
          items: 3,
          stagePadding: 20,
        },
        1240: {
          stagePadding: 40,
          items: 3,
        },
        1600: {
          stagePadding: 80,
          items: 3,
        },
        1900: {
          items: 3,
        },
      },
    });
  });
	
	
})(jQuery);
