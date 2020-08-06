
var lastId, topMenu, topMenuHeight, menuItems;
var scrollItems, fromTop;
$(function () {


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
            } else {
                menuItems.filter("[href='#" + main + "']").parent().addClass("nav-active");
            }
        }
    });

});




$(function () {
    $('.nav-btn').click((event) => {
        $('.nav-active').each(element => {
            $(`.nav-active:eq(${element})`).removeClass('nav-active');
        });
        $(event.target).addClass('nav-active');
    })
});