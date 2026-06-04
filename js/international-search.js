jQuery(document).ready(function ($) {
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const handleSearch = debounce(function () {
    const search = $('#auf-international-fee').val().trim();

    const data = {
      action: 'international_search_programs',
      search: search,
      nonce: searchfeeAjax.nonce
    };

    $.ajax({
      url: searchfeeAjax.ajax_url,
      type: 'POST',
      data: data,
      success: function (response) {
        if (response.success) {
          $('#accordionPossibilities').html(response.data);
        } else {
          $('#accordionPossibilities').html('<p>Error fetching programs.</p>');
        }
      },
      error: function () {
        $('#accordionPossibilities').html('<p>AJAX request failed.</p>');
      }
    });
  }, 300); // 300ms debounce delay

  $('#auf-international-fee').on('input', handleSearch);
});