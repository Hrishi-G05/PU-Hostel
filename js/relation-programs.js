jQuery(document).ready(function($){
    const allProgramsInput = $('#all-programs'); // master checkbox
    const programInputs = $('.all-programs-checkbox'); // individual program checkboxes

    const levelInputs = $('#select-level input[type="checkbox"]');
    const categoryInputs = $('#select-category input[type="checkbox"]');

    const searchInput = $('#program-search');
    const accordionItems = $('.accordion-item');

    const expandBtn = $('.expand-collapse-wrapper .expand-btn');
    const collapseBtn = $('.expand-collapse-wrapper .collapse-btn');

    function filterAccordion(){
//         const searchVal = searchInput.val().toLowerCase();
		const searchVal = (searchInput.val() || '').toLowerCase();
        const selectedPrograms = allProgramsInput.is(':checked')
            ? programInputs.map(function(){ return $(this).val(); }).get() // all programs if master checked
            : programInputs.filter(':checked').map(function(){ return $(this).val(); }).get();

        const selectedLevels = levelInputs.filter(':checked').map(function(){ return $(this).val(); }).get();
        const selectedCategories = categoryInputs.filter(':checked').map(function(){ return $(this).val(); }).get();

        accordionItems.each(function(){
            let item = $(this);
            let hasMatch = false;

            item.find('.faculty-box').each(function(){
                const program = $(this);
                const title = program.find('h5').text().toLowerCase();
                const duration = program.find('.faculty-info-para').text().toLowerCase();
                const countries = program.find('.faculty-info-para').text().toLowerCase();
                const programSlug = program.data('slug') || '';
                const level = item.data('level') || '';
                const programCategories = program.data('category') ? program.data('category').toString().split(',') : [];

                const matchSearch = !searchVal || title.includes(searchVal) || duration.includes(searchVal) || countries.includes(searchVal);
                const matchProgram = !selectedPrograms.length || selectedPrograms.includes(programSlug);
                const matchLevel = !selectedLevels.length || selectedLevels.includes(level);
                const matchCategory = !selectedCategories.length || selectedCategories.some(cat => programCategories.includes(cat));

                if(matchSearch && matchProgram && matchLevel && matchCategory){
                    program.show();
                    hasMatch = true;
                } else {
                    program.hide();
                }
            });

            if(hasMatch){
                item.show();
            } else {
                item.hide();
            }
        });
    }

    // Master "All Programs" checkbox
    allProgramsInput.on('change', function(){
        if($(this).is(':checked')){
            programInputs.prop('checked', true); // check all program checkboxes
        } else {
            programInputs.prop('checked', false); // uncheck all
        }
        filterAccordion();
    });

    // Individual program checkbox
    programInputs.on('change', function(){
        if(programInputs.filter(':checked').length !== programInputs.length){
            allProgramsInput.prop('checked', false);
        } else {
            allProgramsInput.prop('checked', true);
        }
        filterAccordion();
    });

    // Level / Category / Search
    categoryInputs.on('change', filterAccordion);
    levelInputs.on('change', filterAccordion);
    searchInput.on('keyup', filterAccordion);

    // Expand / Collapse Buttons
    expandBtn.on('click', function(){
        $('.accordion-collapse').each(function(){
            let collapseEl = bootstrap.Collapse.getOrCreateInstance(this);
            collapseEl.show();
        });
    });

    collapseBtn.on('click', function(){
        $('.accordion-collapse').each(function(){
            let collapseEl = bootstrap.Collapse.getOrCreateInstance(this);
            collapseEl.hide();
        });
    });
  const firstCollapse = $('.accordion-item .accordion-collapse').first();
    if(firstCollapse.length){
        bootstrap.Collapse.getOrCreateInstance(firstCollapse[0]).show();
    }
    // Initial filter
    filterAccordion();
});
