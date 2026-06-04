jQuery(document).ready(function($) {
    // Function to get selected filter values
    function getSelectedFilters(wrapperId) {
        var selected = [];
        $(wrapperId + ' .checkbox-input:checked').each(function() {
            selected.push($(this).data('value'));
        });
        return selected;
    }

    // Function to update filter badges
    function updateFilterBadges() {
        var badgesHtml = '';
        var allSelected = [];

        // Collect all selected filters
        $('#select-level .checkbox-input:checked').each(function() {
            var label = $(this).next('label').text();
            var value = $(this).data('value');
            allSelected.push({ label: label, value: value, type: 'level' });
        });
        $('#select-faculty .checkbox-input:checked').each(function() {
            var label = $(this).next('label').text();
            var value = $(this).data('value');
            allSelected.push({ label: label, value: value, type: 'faculty' });
        });
        $('#select-tracks .checkbox-input:checked').each(function() {
            var label = $(this).next('label').text();
            var value = $(this).data('value');
            allSelected.push({ label: label, value: value, type: 'tracks' });
        });

        // Generate badges
        allSelected.forEach(function(item, index) {
            badgesHtml += '<div class="tag tag-set3" data-type="' + item.type + '" data-value="' + item.value + '">' +
                item.label +
                '<span class="tag-close" data-type="' + item.type + '" data-value="' + item.value + '">' +
                '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M1.51367 9.74381L9.99967 1.25781M9.99967 9.74381L1.51367 1.25781" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />' +
                '</svg>' +
                '</span>' +
                '</div>';
        });

        $('#filter-tags').html(badgesHtml);

        // Handle badge close button
        $('.tag-close').on('click', function() {
            var type = $(this).data('type');
            var value = $(this).data('value');
            $('#select-' + type + ' .checkbox-input[data-value="' + value + '"]').prop('checked', false);
            updateFilterBadges();
            fetchPrograms();
        });
    }

    // Function to fetch programs based on search and filters
    function fetchPrograms() {
        var searchQuery = $('#program-search').val().trim();
        var selectedLevels = getSelectedFilters('#select-level');
        var selectedFaculties = getSelectedFilters('#select-faculty');
        var selectedTracks = getSelectedFilters('#select-tracks');
        var action = programSearch.action; // Use the localized action
        var programType = programSearch.program_type; // Use the localized program type

        $.ajax({
            url: programSearch.ajax_url,
            type: 'POST',
            data: {
                action: action,
                nonce: programSearch.nonce,
                search_query: searchQuery,
                levels: selectedLevels,
                faculties: selectedFaculties,
                tracks: selectedTracks,
                program_type: programType, // Include the program type for taxonomy pages
            },
            success: function(response) {
               
                if (response.success) {
                    
                    // Update the program list
                    $('#program-list').html(response.data.html);

                    // If on the "all courses" page, handle accordion logic
                    if (action === 'search_programs') {
                        $('#accordionCourse').html(response.data.html);

                    if (response.data.active_index !== -1) {
                        $('#accordionCourse .accordion-item').each(function(index) {
                            var collapseElement = $(this).find('.accordion-collapse');
                            var buttonElement = $(this).find('.accordion-button');
                            if (index === response.data.active_index) {
                                collapseElement.addClass('show');
                                buttonElement.removeClass('collapsed');
                                buttonElement.attr('aria-expanded', 'true');
                            } else {
                                collapseElement.removeClass('show');
                                buttonElement.addClass('collapsed');
                                buttonElement.attr('aria-expanded', 'false');
                            }
                        });
                    }
                    }
                } else {
                    console.log('Error: ' + response.data.message);
                }
            },
            error: function(xhr, status, error) {
                console.log('AJAX Error: ' + error);
            }
        });
    }

    // Event listeners for search input and filters
   $('#program-search').on('input', function () {
    const searchVal = $(this).val().trim();

		if (searchVal === '') {
			// ✅ Search blank → SHOW
			$('.filter-badge-wrapper').show();
			$('.no-results-message').hide();
		} else {
			// ❌ Typing → HIDE
			$('.filter-badge-wrapper').hide();
		}

		fetchPrograms();
	});

    $('.checkbox-input').on('change', function() {
        updateFilterBadges();
        fetchPrograms();
    });

    // Expand all and collapse all buttons
    $('.expand-all').on('click', function(e) {
        e.preventDefault();
        $('#accordionCourse .accordion-collapse').addClass('show');
        $('#accordionCourse .accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
    });

    $('.collapse-all').on('click', function(e) {
        e.preventDefault();
        $('#accordionCourse .accordion-collapse').removeClass('show');
        $('#accordionCourse .accordion-button').addClass('collapsed').attr('aria-expanded', 'false');
    });

    // Initial load: Update badges and fetch programs
    // updateFilterBadges();
    // fetchPrograms();
});