document.addEventListener('DOMContentLoaded', function () {
    // Dropdown toggle functionality
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    const closeButtons = document.querySelectorAll('.dropdown-close-btn, .popup-bg');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dropdown = this.closest('.dropdown-select-wrapper').querySelector('.dropdown-popup');
            dropdown.classList.toggle('active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dropdown = this.closest('.dropdown-popup');
            dropdown.classList.remove('active');
        });
    });

    // Filter functionality
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const hostelListings = document.querySelectorAll('.faculty-box');
    const filterTagsContainer = document.getElementById('filter-tags');

    // Object to store active filters
    let activeFilters = {
        gender: [],
        occupancy: [],
        'room-type': []
    };

    // Function to update filter badges
    function updateFilterBadges() {
        if (!filterTagsContainer) return;
        filterTagsContainer.innerHTML = '';

        Object.keys(activeFilters).forEach(filterType => {
            activeFilters[filterType].forEach(value => {
                const badge = document.createElement('div');
                badge.className = 'tag tag-set3';
                const label = filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('-', ' ');
                badge.innerHTML = `
                    ${label}: ${value.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    <span class="tag-close" data-filter-type="${filterType}" data-filter-value="${value}">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.51367 9.74381L9.99967 1.25781M9.99967 9.74381L1.51367 1.25781" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                `;
                filterTagsContainer.appendChild(badge);
            });
        });

        // Add event listeners to badge close buttons
        document.querySelectorAll('.tag-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', function () {
                const filterType = this.getAttribute('data-filter-type');
                const filterValue = this.getAttribute('data-filter-value');

                // Remove the filter from activeFilters
                activeFilters[filterType] = activeFilters[filterType].filter(val => val !== filterValue);

                // Uncheck the corresponding checkbox
                const checkbox = document.querySelector(`.filter-checkbox[data-filter-type="${filterType}"][data-filter-value="${filterValue}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                }

                // Update badges and filter listings
                updateFilterBadges();
                filterHostelListings();
            });
        });
    }

    // Function to filter hostel listings
    function filterHostelListings() {
        hostelListings.forEach(listing => {
            const listingGender = listing.getAttribute('data-gender');
            const listingOccupancy = listing.getAttribute('data-occupancy');
            const listingRoomType = listing.getAttribute('data-room-type');

            const matchesGender = activeFilters.gender.length === 0 || activeFilters.gender.includes(listingGender);
            const matchesOccupancy = activeFilters.occupancy.length === 0 || activeFilters.occupancy.includes(listingOccupancy);
            const matchesRoomType = activeFilters['room-type'].length === 0 || activeFilters['room-type'].includes(listingRoomType);

            // Show listing only if it matches all filter criteria
            if (matchesGender && matchesOccupancy && matchesRoomType) {
                listing.style.display = ''; // Show the listing
            } else {
                listing.style.display = 'none'; // Hide the listing
            }
        });

        // Update visibility of "Show more" button based on visible hidden listings
        updateShowMoreButton();
    }

    // Function to update "Show more" button visibility
    function updateShowMoreButton() {
        const hiddenExplore = document.getElementById('hidden-explore');
        const showMoreBtn = document.getElementById('show-more-btn');
        if (!hiddenExplore || !showMoreBtn) return;

        // Check if there are any visible listings inside hidden-explore
        const hiddenListings = hiddenExplore.querySelectorAll('.faculty-box');
        const hasVisibleHiddenListings = Array.from(hiddenListings).some(listing => listing.style.display !== 'none');

        if (hasVisibleHiddenListings) {
            showMoreBtn.style.display = 'inline-block';
        } else {
            showMoreBtn.style.display = 'none';
            hiddenExplore.style.display = 'none'; // Ensure hidden section is collapsed if no listings are visible
        }
    }

    // Handle checkbox changes
    filterCheckboxes.forEach(checkbox => {
        // Initialize activeFilters based on default checked state (from ACF)
        if (checkbox.checked) {
            const filterType = checkbox.getAttribute('data-filter-type');
            const filterValue = checkbox.getAttribute('data-filter-value');
            if (!activeFilters[filterType].includes(filterValue)) {
                activeFilters[filterType].push(filterValue);
            }
        }

        checkbox.addEventListener('change', function () {
            const filterType = this.getAttribute('data-filter-type');
            const filterValue = this.getAttribute('data-filter-value');

            if (this.checked) {
                // Add filter to activeFilters
                if (!activeFilters[filterType].includes(filterValue)) {
                    activeFilters[filterType].push(filterValue);
                }
            } else {
                // Remove filter from activeFilters
                activeFilters[filterType] = activeFilters[filterType].filter(val => val !== filterValue);
            }

            // Update badges and filter listings
            updateFilterBadges();
            filterHostelListings();
        });
    });

    // Initial update of badges and listings
    updateFilterBadges();
    filterHostelListings();

    // "Show more" functionality
    window.toggleExplore = function () {
        const hiddenSection = document.getElementById('hidden-explore');
        const showMoreBtn = document.getElementById('show-more-btn');
        if (hiddenSection && showMoreBtn) {
            if (hiddenSection.style.display === 'none' || hiddenSection.style.display === '') {
                hiddenSection.style.display = 'block';
                showMoreBtn.textContent = 'Show less';
            } else {
                hiddenSection.style.display = 'none';
                showMoreBtn.textContent = 'Show more';
            }
        }
    };
});