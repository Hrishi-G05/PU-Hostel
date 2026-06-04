// jQuery(function(t){let e=t("#expert-content").data("faculty")||ajax_object.faculty_id||0,a=t("#expert-content").data("department")||"",n=t("#expert-content").data("program-type")||"",c=t("#expert-content").data("post-type")||"",i="";function o(o=1){t.post(ajax_object.ajax_url,{action:"load_experts",page:o,faculty_id:e,department:a,program_type:n,post_type:c,search:i},function(e){e.success&&(t("#expert-content").length&&t("#expert-content").html(e.data.html),t(".pu-expert-section").length&&t(".pu-expert-section").html(e.data.html))})}t(".catogory-filter-list-item").on("click",function(){e="all"===t(this).data("tag")?0:t(this).data("tag").replace("faculty-",""),o(1)}),t(".search-input").on("input",function(){i=t(this).val(),o(1)}),t(document).on("click",".expert-pagination a",function(e){e.preventDefault(),o(t(this).data("page"))}),t(".pu-expert-section").length&&o()}),jQuery(document).ready(function(t){const e=t(".detail-program");if(!e.length)return;let a=0,n="";function c(c=1){const i=e.find(".experts-loader"),o=e.find(".pu-expert-section");i.show(),t.ajax({url:ajax_object.ajax_url,type:"POST",dataType:"json",data:{action:"load_experts",page:c,faculty_id:a,department:"",search:n},success:function(t){t.success&&o.html(t.data.html)},complete:function(){i.hide()}})}e.on("click",".catogory-filter-list-item",function(){e.find(".catogory-filter-list-item").removeClass("active"),t(this).addClass("active"),a="all"===t(this).data("tag")?0:parseInt(t(this).data("tag").replace("faculty-",""))||0,c(1)}),e.on("input",".search-input",function(){n=t(this).val(),c(1)}),e.on("click",".expert-pagination a",function(e){e.preventDefault(),c(t(this).data("page"))}),c()});
// 
jQuery(function ($) {


// ========================
// VARIABLES
// ========================
let faculty_id   = $("#expert-content").data("faculty") || ajax_object.faculty_id || 0;
let department   = $("#expert-content").data("department") || "";
let program_type = $("#expert-content").data("program-type") || "";
let post_type    = $("#expert-content").data("post-type") || "";
let search       = "";
let staff_type   = "all";

// ========================
// MAIN AJAX FUNCTION
// ========================
function loadExperts(page = 1) {

    $.post(ajax_object.ajax_url, {
        action: "load_experts",
        page: page,
        faculty_id: faculty_id,
        department: department,
        program_type: program_type,
        post_type: post_type,
        search: search,
        staff_type: staff_type
    }, function (res) {

        if (res.success) {
            let html = $(res.data.html);

			$("#expert-content .pu-expert-list").html(
				html.find(".pu-expert-list").html()
			);

			$("#expert-content .expert-pagination").html(
				html.find(".expert-pagination").html()
			);
        }

    });
}

// ========================
// FACULTY FILTER
// ========================
$(".catogory-filter-list-item").on("click", function () {

    faculty_id = ($(this).data("tag") === "all")
        ? 0
        : $(this).data("tag").replace("faculty-", "");

    loadExperts(1);
});

// ========================
// STAFF TYPE FILTER
// ========================
$(document).on("click", ".filter-btn", function () {

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    staff_type = $(this).data("filter");

    loadExperts(1);
});

// ========================
// SEARCH
// ========================
$(".search-input").on("input", function () {

    search = $(this).val();
    loadExperts(1);
});

// ========================
// PAGINATION
// ========================
$(document).on("click", ".expert-pagination a", function (e) {

    e.preventDefault();
    let page = $(this).data("page");

    loadExperts(page);
});

// INITIAL LOAD
if ($(".pu-expert-section").length) {
    loadExperts();
}

});

// ========================
// SECOND BLOCK (PROGRAM PAGE)
// ========================
jQuery(document).ready(function ($) {

const container = $(".detail-program");
if (!container.length) return;

let faculty_id = 0;
let search     = "";
let staff_type = "all";

function loadProgramExperts(page = 1) {

    const loader = container.find(".experts-loader");
    const target = container.find(".pu-expert-section");

    loader.show();

    $.ajax({
        url: ajax_object.ajax_url,
        type: "POST",
        dataType: "json",
        data: {
            action: "load_experts",
            page: page,
            faculty_id: faculty_id,
            department: "",
            search: search,
            staff_type: staff_type
        },
        success: function (res) {

            if (res.success) {
                target.html(res.data.html);
            }
        },
        complete: function () {
            loader.hide();
        }
    });
}

// FACULTY FILTER
container.on("click", ".catogory-filter-list-item", function () {

    container.find(".catogory-filter-list-item").removeClass("active");
    $(this).addClass("active");

    faculty_id = ($(this).data("tag") === "all")
        ? 0
        : parseInt($(this).data("tag").replace("faculty-", "")) || 0;

    loadProgramExperts(1);
});

// STAFF FILTER
container.on("click", ".filter-btn", function () {

    container.find(".filter-btn").removeClass("active");
    $(this).addClass("active");

    staff_type = $(this).data("filter");

    loadProgramExperts(1);
});

// SEARCH
container.on("input", ".search-input", function () {

    search = $(this).val();
    loadProgramExperts(1);
});

// PAGINATION
container.on("click", ".expert-pagination a", function (e) {

    e.preventDefault();
    loadProgramExperts($(this).data("page"));
});

// INITIAL LOAD
loadProgramExperts();

});
