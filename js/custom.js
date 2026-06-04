$(document).ready(function () {

    $('.nav-link-sticky').on('click', function (e) {
        e.preventDefault();

        var target = $(this).attr('href');

        if ($(target).length) {

            $('html, body').animate({
                scrollTop: $(target).offset().top - 100
            }, 600);

            $('.nav-link-sticky').removeClass('active');
            $(this).addClass('active');
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {
	
	if (
        document.body.classList.contains("page-id-21514") ||
        document.body.classList.contains("page-id-21707") ||
		document.body.classList.contains("term-diploma")
    ) {
        const el = document.querySelector(".tab-desc-area");
        if (el) {
            el.classList.add("sub-title-desc", "font-body-medium");
        }
    }
	
    document.querySelectorAll(".program-detail-area").forEach(section => {
        if (section.innerText.includes("Excellence In Research")) {
            const el = section.querySelector(".tab-desc-area");
            if (el) {
                el.classList.add("sub-title-desc", "font-body-medium");
            }
        }
    });
	
	if (document.body.classList.contains("page-id-9704")) {
        const elements = document.querySelectorAll(".know-more-area .more-content");

        elements.forEach(el => {
            // Avoid duplicate text
            if (!el.innerText.trim().startsWith("Know More")) {
                el.insertAdjacentText("afterbegin", "Know More ");
            }
        });
    }
	
	//start parul cell's - scripts
	const heading = document.querySelector(".page-id-38381 .president-section h2");
	if (heading) {
		heading.innerText = "Leadership Section";
	}
	
	if (document.body.classList.contains("postid-6016")) {

        // Target only this section
        const labels = document.querySelectorAll(
            "#experts-faculty-wise .pu-expert-meta li strong"
        );

        labels.forEach(label => {
            if (label.textContent.trim() === "Department:") {
                label.textContent = "Faculty:";
            }
        });
    }
	//end parul cell's
	
	//start placement Event
	function fadeIn(el, duration = 300) {
		el.style.display = "block";
		el.style.opacity = 0;

		let start = null;
		function animate(timestamp) {
		  if (!start) start = timestamp;
		  let progress = timestamp - start;
		  el.style.opacity = Math.min(progress / duration, 1);
		  if (progress < duration) {
			requestAnimationFrame(animate);
		  }
		}
		requestAnimationFrame(animate);
	  }

	  function fadeOut(el, duration = 300) {
		let start = null;
		function animate(timestamp) {
		  if (!start) start = timestamp;
		  let progress = timestamp - start;
		  el.style.opacity = Math.max(1 - progress / duration, 0);
		  if (progress < duration) {
			requestAnimationFrame(animate);
		  } else {
			el.style.display = "none";
		  }
		}
		requestAnimationFrame(animate);
	  }

	  // Click on placement thumbnail
	  document.querySelectorAll(".placement-thumb").forEach(function (thumb) {
		thumb.addEventListener("click", function () {
		  document.body.classList.add("no-scroll");

		  const images = this.dataset.images
			? JSON.parse(this.dataset.images)
			: [];

		  const grid = document.querySelector(".modal-grid");
		  grid.innerHTML = "";

		  images.forEach(function (src) {
			const wrapper = document.createElement("div");
			wrapper.className = "image-wrap";

			const img = document.createElement("img");
			img.src = src;

			wrapper.appendChild(img);
			grid.appendChild(wrapper);
		  });

		  const modal = document.querySelector(".placement-modal");
		  fadeIn(modal);
		});
	  });

	  // Close modal
	  const closeBtn = document.querySelector(".placement-modal .close");
	  if (closeBtn) {
		closeBtn.addEventListener("click", function () {
		  const modal = document.querySelector(".placement-modal");
		  fadeOut(modal);
		  document.body.classList.remove("no-scroll");
		});
	  }
	//end placement Event
	
	//Start Doctoral Page js
	const cache = {
		doctoralTabContent: document.querySelectorAll(".doctoral-tab-content"),
		subtabFullWidth: document.querySelectorAll(".subtab-full-width"),
		childContentBoxes: document.querySelectorAll(".child-content-box"),
		subtabWrappers: document.querySelectorAll(".subtab-wrapper"),
		childIcons: document.querySelectorAll(".child-icon-box"),
		childTabTitles: document.querySelectorAll(".child-tab-title"),
		subChildContainers: document.querySelectorAll(".sub-child-container")
	};

	const utils = {
		removeClass(elements, className) {
			elements.forEach(el => el?.classList.remove(className));
		},

		addClass(elements, className) {
			elements.forEach(el => el?.classList.add(className));
		},

		activateElement(element) {
			element?.classList.add("active");
		},

		hideAllContent() {
			this.removeClass(cache.doctoralTabContent, "active");
			this.removeClass(cache.subtabFullWidth, "active");
			this.removeClass(cache.childContentBoxes, "active");
		},

		resetAllActive() {
			this.removeClass(cache.subtabWrappers, "active");
			this.removeClass(cache.subtabFullWidth, "active");
			this.removeClass(cache.childContentBoxes, "active");
			this.removeClass(cache.childTabTitles, "active");
			this.removeClass(cache.subChildContainers, "active");
			this.removeClass(cache.childIcons, "active");
		}
	};

	const layoutManager = {
		handleLayoutChange(parent, target) {
			const subChildContainer = parent.querySelector(".sub-child-container");
			const subtabWrapper = parent.querySelector(`#subtabs-${target}`);

			if (!subtabWrapper) return;

			const isFullWidth = subtabWrapper.classList.contains("subtab-full-width");

			subChildContainer?.classList.toggle("full-width-mode", isFullWidth);
		}
	};


	const tabHandlers = {
		handleMainTab(e) {
			e.preventDefault();

			const targetId = this.getAttribute("href").replace("#", "");
			const targetElement = document.getElementById(targetId);

			utils.hideAllContent();
			utils.activateElement(targetElement);
			utils.removeClass(cache.subChildContainers, "active");

			cache.subChildContainers.forEach(container => {
				container.classList.remove("full-width-mode");
			});
		},

		handleChildIcon() {
			const parent = this.closest(".doctoral-tab-content");
			if (!parent) return;

			const target = this.getAttribute("data-target");

			utils.removeClass(parent.querySelectorAll(".child-icon-box"), "active");
			this.classList.add("active");

			const subChildContainer = parent.querySelector(".sub-child-container");
			utils.activateElement(subChildContainer);

			utils.removeClass(parent.querySelectorAll(".subtab-wrapper"), "active");
			utils.removeClass(parent.querySelectorAll(".subtab-full-width"), "active");
			utils.removeClass(parent.querySelectorAll(".child-content-box"), "active");
			utils.removeClass(parent.querySelectorAll(".child-tab-title"), "active");

			layoutManager.handleLayoutChange(parent, target);

			const subtabWrapper = parent.querySelector(`#subtabs-${target}`);

			if (!subtabWrapper) return;

			utils.activateElement(subtabWrapper);

			if (subtabWrapper.classList.contains("subtab-wrapper")) {
				tabHandlers.activateFirstChildTab(parent, subtabWrapper);
			}
		},

		activateFirstChildTab(parent, wrapper) {
			const firstChildTab = wrapper.querySelector(".child-tab-title");
			if (!firstChildTab) return;

			utils.activateElement(firstChildTab);

			const firstContentTarget = firstChildTab.getAttribute("data-target");
			const firstContent = parent.querySelector(`#${firstContentTarget}`);
			utils.activateElement(firstContent);
		},

		handleSubTab() {
			const parent = this.closest(".doctoral-tab-content");
			if (!parent) return;

			const target = this.getAttribute("data-target");

			utils.removeClass(parent.querySelectorAll(".child-tab-title"), "active");
			this.classList.add("active");

			utils.removeClass(parent.querySelectorAll(".child-content-box"), "active");
			const content = parent.querySelector(`#${target}`);
			utils.activateElement(content);
		}
	};

	const bindEvents = () => {
		document.querySelectorAll(".doctoral-tab-item .internal-tab")
			.forEach(tab => tab.addEventListener("click", tabHandlers.handleMainTab));

		cache.childIcons.forEach(icon =>
			icon.addEventListener("click", tabHandlers.handleChildIcon)
		);

		cache.childTabTitles.forEach(tab =>
			tab.addEventListener("click", tabHandlers.handleSubTab)
		);
	};

	const init = () => {
		utils.resetAllActive();

		bindEvents();
	};

	init();
	
	
});
//start crm Lead Integration
document.addEventListener('wpcf7mailsent', function(event) {

    let formId = event.detail.contactFormId;

    // Run for multiple forms
    const allowedForms = [25565, 173, 25536];
    if (!allowedForms.includes(formId)) {
        return;
    }


    let inputs = event.detail.inputs;
    let data = {};

    function getVal(name) {
        return inputs.find(i => i.name === name)?.value || "";
    }

    let enquiryType = getVal("enquiry_type"); // <-- change "enquiry" to your CF7 select name

    if (formId === 25536 && enquiryType !== "Admission Enquiry") {
        console.log("General enquiry selected — skipping CRM");
        return;
    }

    // CF7 Fields
    data.fullname = getVal("text-full-name");
    data.email = getVal("email");
    data.phone = getVal("phonetext-563") || "";
    data.country = getVal("country") || "";
    data.program = getVal("page-title") || "";

    // =============== REMOVE COUNTRY CODE FROM PHONE ===============
    let rawPhone = data.phone;
    let dialCode = document.querySelector('.selected-dial-code').innerText;
//     console.log(dialCode);
    let cc = dialCode.replace("+", ""); // remove "+" for matching

    // Remove the country prefix
    let cleanedPhone = rawPhone.replace(new RegExp("^\\+?" + cc), "").trim();

    // Keep only digits
    cleanedPhone = cleanedPhone.replace(/\D/g, "");

    data.phone = cleanedPhone;
	const urlParams = new URLSearchParams(window.location.search);

	const urlUtmSource = urlParams.get("utm_source") || "";
	const urlUtmMedium = urlParams.get("utm_medium") || "";
	const urlUtmCampaign = urlParams.get("utm_campaign") || "";

	// UTM fields
	data.utm_source = getVal("utm_source") || urlUtmSource || (dialCode === "+91" ? "website" : "digital");
	data.utm_medium = getVal("utm_medium") || urlUtmMedium || "";
	data.utm_campaign = getVal("utm_campaign") || urlUtmCampaign || "";
//     // UTM fields
//     data.utm_source = getVal("utm_source") || "website";
//     data.utm_medium = getVal("utm_medium") || "";
//     data.utm_campaign = getVal("utm_campaign") || "";

//     console.log("Collected Data:", data);

    // Prepare variables
    let url = "";
    let payload = {};

    // ================= DOMESTIC API =================
    if (dialCode === "+91") {
        url = "https://admissions.paruluniversity.ac.in/api/leadcapture";

        payload = {
            country_code: "+91",
            phone: data.phone,
            source: data.utm_source,
            name: data.fullname,
            country: "India",
            course: "",
            program: data.program,
            email: data.email,
            nationality: "Indian",
            utm_source: data.utm_source,
            utm_medium: data.utm_medium,
            utm_campaign: data.utm_campaign,
            admission_session: "9"
        };

    }

    // ================= INTERNATIONAL API =================
    else {
		data.utm_source = getVal("utm_source") || urlUtmSource || "digital";

        url = "https://admissions.paruluniversity.ac.in/international/api/leadcapture";

        payload = {
            country_code: dialCode,
            phone: data.phone,
            source: data.utm_source,
            name: data.fullname,
            country: data.country,
            course: "",
            program: data.program,
            email: data.email,
            nationality: "International",
            utm_source: data.utm_source,
            utm_medium: data.utm_medium,
            utm_campaign: data.utm_campaign,
            admission_session: "9"
        };

    }


    // ================ SEND REQUEST ================
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.text())
        .then(res => console.log("CRM RESPONSE:", res))
        .catch(err => console.error("CRM ERROR:", err));

});

document.addEventListener('DOMContentLoaded', function() {

    const params = new URLSearchParams(window.location.search);

    const utmInput = document.querySelector('[name="utm_source"]'); if (utmInput) utmInput.value = params.get('utm_source') || '';

    const utmMedium = document.querySelector('[name="utm_medium"]'); if (utmMedium) utmMedium.value =
        params.get('utm_medium') || '';

    const utmCampaign = document.querySelector('[name="utm_campaign"]'); if (utmCampaign) utmCampaign.value =
        params.get('utm_campaign') || '';

});
// PIA JS Start
// ---------- INITIAL STATE ----------
// Ensure no dropdown is open and menus are hidden
$(".pu-dropdown").removeClass("open").find(".pu-dropdown-menu").hide();

// Hide all content sections and show the 'About Institute' section by default if present
$(".pu-content-section").hide();
var $defaultSection = $("#about-institute");
if ($defaultSection.length) {
    $defaultSection.show();
    // set active nav link corresponding to default section
    $(".pu-nav-link").removeClass("active");
    $('.pu-nav-link[href="#about-institute"]').addClass("active");
} else {
    // if no #about-institute, show the first section
    $(".pu-content-section").first().show();
}

// ---------- NAVIGATION / SECTION CLICK ----------
// Clicking any navigation link (inside dropdown items or top-level) shows the section
$(document).on("click", ".pu-nav-link", function(e) {
    var $this = $(this);

    // If this is the dropdown toggle itself, do nothing here (dropdown toggle handler will manage)
    if ($this.hasClass("pu-dropdown-toggle")) {
        return;
    }

    var target = $this.attr("href");

    // Only handle internal anchor links (#id). Allow regular external links to behave normally.
    if (!target || !target.startsWith("#")) {
        return;
    }

    e.preventDefault();

    // Close all dropdowns (and remove open class)
    $(".pu-dropdown").removeClass("open").find(".pu-dropdown-menu").stop(true, true).slideUp(180);

    // Show the selected section
    $(".pu-content-section").hide();
    var $target = $(target);
    if ($target.length) {
        $target.fadeIn(200);
    }

    // Active class: mark only the clicked nav link as active
    $(".pu-nav-link").removeClass("active");
    $this.addClass("active");

    // Smooth scroll (optional): scroll to the top of the shown section
    if ($target.length) {
        $("html, body").animate({
            scrollTop: $target.offset().top - 80
        }, 400);
    }
});


// ---------- DROPDOWN TOGGLE CLICK ----------
// Toggle a dropdown only on click; ensure other dropdowns close
$(document).on("click", ".pu-dropdown-toggle", function(e) {
    e.preventDefault();
    e.stopPropagation(); // prevent document click handler from closing immediately

    var $parent = $(this).closest(".pu-dropdown");
    var $menu = $parent.find(".pu-dropdown-menu");

    // Close other dropdowns
    $(".pu-dropdown").not($parent).removeClass("open").find(".pu-dropdown-menu").stop(true, true).slideUp(180);

    // Toggle current
    if ($parent.hasClass("open")) {
        $parent.removeClass("open");
        $menu.stop(true, true).slideUp(180);
    } else {
        $parent.addClass("open");
        $menu.stop(true, true).slideDown(180);
    }
});


// When a dropdown inner item is clicked, sections are handled by .pu-nav-link click handler,
// but ensure dropdowns close too (keep UI tidy).
$(document).on("click", ".pu-dropdown .pu-dropdown-item .pu-nav-link", function(e) {
    $(".pu-dropdown").removeClass("open").find(".pu-dropdown-menu").stop(true, true).slideUp(180);
});


// ---------- CLICK OUTSIDE (close menus) ----------
$(document).on("click", function(e) {
    // if click outside the left nav, close all dropdowns
    if (!$(e.target).closest(".pu-left-quick-links").length) {
        $(".pu-dropdown").removeClass("open").find(".pu-dropdown-menu").stop(true, true).slideUp(180);
    }
});


// OPTIONAL: keyboard escape to close dropdowns
$(document).on("keydown", function(e) {
    if (e.key === "Escape" || e.keyCode === 27) {
        $(".pu-dropdown").removeClass("open").find(".pu-dropdown-menu").stop(true, true).slideUp(180);
    }
});
jQuery(document).on("click", ".pu-tab-item", function() {

    var $section = jQuery(this).closest(".pu-content-section");
    var tabID = jQuery(this).data("tab");

    // activate tab item
    $section.find(".pu-tab-item").removeClass("active");
    jQuery(this).addClass("active");

    // activate tab content inside same section
    $section.find(".pu-tab-content").removeClass("active");
    $section.find("#" + tabID).addClass("active");
});
/* NESTED TABS */
$(document).on("click", ".nested-tab-item", function() {
    var $section = $(this).closest(".pu-tab-content");
    var subTabID = $(this).data("nested");

    // Remove active
    $section.find(".nested-tab-item").removeClass("active");
    $(this).addClass("active");

    // Hide all nested content
    $section.find(".nested-tab-content").removeClass("active");

    // Show correct one
    $section.find("#" + subTabID).addClass("active");
});

// college departments tab section scripts
document.addEventListener('DOMContentLoaded', function() {
//     console.log('DOM loaded - initializing tabs');

    // Get modal elements
    const modal = document.getElementById('college-department-imageModal');
    const modalImg = document.getElementById('college-department-modalImage');
    const captionText = document.getElementById('college-department-caption');
    const closeBtn = document.getElementsByClassName('college-department-close')[0];

    // Get navigation buttons and gallery content
    const navButtons = document.querySelectorAll('.college-department-nav-btn');
    const galleryContents = document.querySelectorAll('.college-department-gallery');

    // Tab functionality
    navButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            // Remove active class from all buttons
            navButtons.forEach(btn => {
                btn.classList.remove('college-department-primary');
                btn.classList.add('college-department-secondary');
            });

            // Add active class to clicked button
            this.classList.remove('college-department-secondary');
            this.classList.add('college-department-primary');

            // Hide all gallery contents
            galleryContents.forEach(content => {
                content.classList.remove('college-department-active');
            });

            // Show the selected gallery content
            const selectedGallery = document.querySelector(`.college-department-gallery[data-content="${tabName}"]`);
            if (selectedGallery) {
                selectedGallery.classList.add('college-department-active');
                console.log('Activated gallery:', tabName);
            } else {
                console.error('Gallery not found for:', tabName);
            }
        });
    });

    // Gallery image click handler (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.college-department-gallery-item')) {
            const item = e.target.closest('.college-department-gallery-item');
            const img = item.querySelector('img');
            if (img && modal && modalImg) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
            }
        }
    });

    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
// End PIA

// Custom Js
jQuery(window).on('load', function($) {
    var $ = jQuery;

    // PU Labs Carousel 
    if ($('.pu-labs-wrapper').length && $('.pu-labs-wrapper .item').length > 0) {
        $('.pu-labs-wrapper').owlCarousel({
            loop: false,
            margin: 10,
            nav: false,
            dots: true,
            items: 3,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    }

    //     Story Card Carousel 
    if ($('.story-card-wrapper').length && $('.story-card-wrapper .item').length > 0) {
        $('.story-card-wrapper').owlCarousel({
            loop: false,
            margin: 24,
            nav: true,
            dots: true,
            items: 3,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    }
});

// Show the modal when "Apply" button is clicked
jQuery(document).ready(function($) {
    // When any button/link with .cf7-modal-trigger is clicked
    $('.cf7-modal-trigger').on('click', function(e) {
        e.preventDefault();
        $('.cf7-modal-overlay').fadeIn(220);
    });

    // When the close button or overlay outside the modal is clicked
    $('.cf7-modal-close, .cf7-modal-overlay').on('click', function(e) {
        // Only close if overlay itself is clicked (not modal content)
        if ($(e.target).hasClass('cf7-modal-overlay') || $(e.target).hasClass('cf7-modal-close')) {
            $('.cf7-modal-overlay').fadeOut(180);
        }
    });

    // Prevent clicks inside modal content from closing the modal
    $('.cf7-modal').on('click', function(e) {
        e.stopPropagation();
    });
});
jQuery(window).on('load', function() {
    setTimeout(function() { // allowing 3 secs to fade out loader
        jQuery('.page-loader').fadeOut('slow');
    }, 10000);
});
jQuery(document).ready(function($) {
    // Open modal
    $('.more-content-modal').on('click', function(e) {
        e.preventDefault();

        var title = $(this).data('title');
        var desc = $(this).data('description');
        var img = $(this).data('image');

        $('#eventModal .event-modal-title').text(title);
        $('#eventModal .event-modal-desc').text(desc);

        if (img) {
            $('#eventModal .event-modal-img').attr('src', img).show();
        } else {
            $('#eventModal .event-modal-img').hide();
        }

        $('#eventModal').fadeIn(200);
    });

    // Close modal
    $('.event-modal-close, .event-modal-overlay').on('click', function(e) {
        if ($(e.target).is('.event-modal-close') || $(e.target).is('.event-modal-overlay')) {
            $('#eventModal').fadeOut(200);
        }
    });

    $(".toggle-arrow").click(function(e) {
        e.stopPropagation();
        let table = $(this).closest("table");
        table.find(".ap-gravainece").toggleClass("show-table");
        $(this).toggleClass("active");
    });
    var hash = window.location.hash;
    if (hash) {

        $('.program-detail-nav .nav-link').removeClass('active');
        $('.tab-pane').removeClass('active show');

        $('button[data-bs-target="' + hash + '"]').addClass('active');
        $(hash).addClass('active show');
    }

    $('.lab-tab-btn').on('click', function() {

        var tabId = $(this).data('tab');

        $('.lab-tab-btn').removeClass('active');
        $('.lab-tab-pane').removeClass('active');

        $(this).addClass('active');
        $('#' + tabId).addClass('active');

    });
	
	// Expand All
    $('.expand-all').on('click', function (e) {
        e.preventDefault();

        $('#program-list').show();
		$('.detail-program-button-wrapper').show();

        $('.expand-all').addClass('active');
        $('.collapse-all').removeClass('active');
    });

    // Collapse All
    $('.collapse-all').on('click', function (e) {
        e.preventDefault();

        $('#program-list').hide();
		$('.detail-program-button-wrapper').hide();
        $('.collapse-all').addClass('active');
        $('.expand-all').removeClass('active');
    });
	
});
const banner = document.querySelector('.clickable-banner');

if (banner) {
    banner.addEventListener('click', function(e) {
        if (!e.target.closest('.p-btn') && !e.target.closest('.banner-form')) {
            window.open(
                "https://admissions.paruluniversity.ac.in/?utm_source=website&utm_medium=Apply+Now+Button&utm_campaign=Website+Button",
                "_blank"
            );
        }
    });
}
// Enquiry mobile form
document.addEventListener("DOMContentLoaded", function() {

    const openBtn = document.querySelector('.enquiry-btn-mobile');
    const popup = document.getElementById('mobile-enquiry-form');
    const closeBtn = document.querySelector('.close-form');
    const overlay = document.querySelector('.popup-overlay');
    if (closeBtn && overlay && popup) {
        // Open popup
        openBtn.addEventListener('click', () => {
            popup.classList.add('active');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        // Close popup
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Close when clicking outside
        overlay.addEventListener('click', () => {
            popup.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });

    }
});
