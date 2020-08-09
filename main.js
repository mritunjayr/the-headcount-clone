
var lastId, topMenu, topMenuHeight, menuItems;
var scrollItems, fromTop;
var cardAnimated;
//Cache reference to window and animation items
var $animation_elements = $('.card:not(.w3-animate-left)');
var $window = $(window);

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function () {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        //check to see if this current container is within viewport
        if ((element_bottom_position <= window_bottom_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('w3-animate-left');

        }
    });
}


$(function () {
    $animation_elements = $('.card');

    $('#cancel-btn').click(() => {
        $('#mobilemainNav').css("display", "none");
    });
    $('#mmenu').click(() => {
        $('#mobilemainNav').css("display", "block");
    });


    // All list items
    topMenu = $("#mainNav"), topMenuHeight = topMenu.outerHeight() + 1
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

            } else {
                menuItems.filter("[href='#" + main + "']").parent().addClass("nav-active");
            }
        }

    });
    $('#contact-form').submit((event) => {
        event.preventDefault();
        $('#contact-form input').each(ele =>
            $('#contact-form input').eq(ele).val('')
        );
        $('#contact-form textarea').val('');
        $('#form-btn').attr('disabled', 'true');
        $('#contact-form-message').css('visibility', 'visible');
    });

    $window.on('scroll resize', check_if_in_view);

});

function cardAnimation() {
    $('.card:not(.w3-animate-left)').each(index => {
        $('.card').eq(index).addClass('w3-animate-left')
    });
}

function hideMobileMenu() {
    $('#mobilemainNav').css("display", "none");
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

