
var lastId, topMenu, topMenuHeight, menuItems;
var scrollItems, fromTop;

$(function () {

    $('#cancel-btn').click(() => {
        $('#mobilemainNav').css("visibility", "hidden");
    });
    $('#mmenu').click(() => {
        $('#mobilemainNav').css("visibility", "visible");
    });

    topMenu = $("#mainNav"), topMenuHeight = topMenu.outerHeight() + 1,
        // All list items
        menuItems = topMenu.find("a");

    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });
    $(window).scroll(function () {
        // Get container scroll position
        fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        cur = cur[cur.length - 1];

        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            if (id) {
                $(".nav-active").each((element) =>
                    $(`.nav-active:eq(${element})`).removeClass('nav-active')
                );
                menuItems
                    .filter("[href='#" + id + "']").parent().addClass("nav-active");
                // if (id == 'solution-section') {
                //     $('.card').each(index => $('.card').eq(index).toggleClass('w3-animate-left'));
                // }
            } else {
                menuItems.filter("[href='#" + main + "']").parent().addClass("nav-active");
            }
        }
        $('.card').each(index => {
            if (($('.card').eq(index).offset().top) < bottom_of_screen)
                $('.card').eq(index).addClass('w3-animate-left')
        });
    });

});


function hideMobileMenu() {
    $('#mobilemainNav').css("visibility", "hidden");
    return true;
}

$(function () {
    $('.nav-btn').click((event) => {
        $('.nav-active').each(element => {
            $(`.nav-active:eq(${element})`).removeClass('nav-active');
        });
        $(event.target).addClass('nav-active');
    })
});