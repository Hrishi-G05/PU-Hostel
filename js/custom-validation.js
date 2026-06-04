jQuery(document).ready(function ($) {
  // Target the phone number field and related elements
  var phoneField = $("#phone");
  var countryCodeField = $("input.wpcf7-phonetext-country-code"); // Target the hidden country code input
  var form = phoneField.closest("form");

  // Validation on blur (when user clicks outside the field)
  phoneField.on("blur", function () {
    var value = $(this).val().trim(); // Get the visible input value (with + and country code)
    var phoneRegex = /^\+?[0-9]+$/; // Allow optional "+" followed by at least one digit

    // Remove any existing error message
    countryCodeField.siblings(".phone-error").remove();

    // Validate: if non-empty and not in correct format, show error
    if (value && !phoneRegex.test(value)) {
      countryCodeField.after(
        '<span class="phone-error" style="color: #dc3232; font-size: 1rem;">Please enter a valid phone number</span>'
      );
      $(this).attr("aria-invalid", "true");
    } else {
      $(this).attr("aria-invalid", "false");
    }
  });

  // Form submission validation
  form.on("submit", function (e) {
    var value = phoneField.val().trim(); // Visible input with + and country code
    var phoneRegex = /^\+?[0-9]+$/; // Allow optional "+" followed by at least one digit

    // Remove any existing error message
    countryCodeField.siblings(".phone-error").remove();

    // Validate visible input
    if (value && !phoneRegex.test(value)) {
      countryCodeField.after(
        '<span class="phone-error" style="color: #dc3232; font-size: 1rem;">Please enter a valid phone number.</span>'
      );
      phoneField.attr("aria-invalid", "true");
      e.preventDefault();
      form.removeClass("submitting");
      return false;
    }
  });

  // Clear error on focus
  phoneField.on("focus", function () {
    countryCodeField.siblings(".phone-error").remove();
  });
});
