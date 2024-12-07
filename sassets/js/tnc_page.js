var bodyWidth = jQuery("body").innerWidth();

if (bodyWidth > 980) {
    /* page menu link to section - desk ==*/
    $(document).on("scroll", onScroll);
    $('.tnc_menu_list a[href*="#"]:not([href="#"])').on("click", function (e) {
        //e.preventDefault();
        $(document).off("scroll");
        //$('.tnc_menu_list a').removeClass('active');
        //$(this).addClass('active');
        $(this).next().show();
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                if ($(window).width() > 980) {
                    $("html, body").animate(
                        {
                            scrollTop: target.offset().top - 70,
                        },
                        500,
                        "swing",
                        function () {
                            $(document).on("scroll", onScroll);
                        }
                    );
                }
                return false;
            }
        }
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        // console.log(scrollPos);
        $('.tnc_menu_list a[href*="#"]:not([href="#"])').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            //  console.log(refElement.offset());
            if (refElement.offset() != undefined) {
                if (
                    refElement.offset().top <= scrollPos &&
                    refElement.offset().top + refElement.height() > scrollPos
                ) {
                    //$('.tnc_menu_list a').removeClass('active')
                    //currLink.addClass("active");
                } else {
                    //currLink.removeClass("active");
                }
            }
        });
    }
}
if (bodyWidth > 980) {
    $(".accordion_sec .acc_card:first").addClass("box_active");
    $(".tnc_mainmenu_nm a").click(function (j) {
        var dropDown = $(this).closest(".acc_card").find(".tnc_submenu_nm");
        $(this)
            .closest(".accordion_sec")
            .find(".tnc_submenu_nm")
            .not(dropDown)
            .slideUp();
        $(".acc_card").removeClass("box_active");
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this)
                .closest(".accordion_sec")
                .find(".tnc_mainmenu_nm a.active")
                .removeClass("active");
            $(this).addClass("active");
            $(this).parents(".acc_card").addClass("box_active");
        }
        dropDown.stop(false, true).slideToggle();
        j.preventDefault();
    });

    $(".tnc_submenu_nm a").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
    $(".tnc_menu_nm").click(function () {
        $(".tnc_submenu_nm a").removeClass("active");
    });
}

if (bodyWidth < 980) {
    var select_options_array = [];
    $(".select_element_of_html option").each(function () {
        var dsrc = $(this).attr("data-src");
        var value = $(this).val();
        var text = this.innerText;
        var item =
            '<li><a href="#' +
            dsrc +
            '" class="select_option_alink" alt="' +
            text +
            '">' +
            value +
            "</a></li>";
        select_options_array.push(item);
    });
    $(".select_options_list").html(select_options_array);

    //Set the button value to the first el of the array
    $(".select_generated_html_wrap .selected_items_btn").html(
        select_options_array[0]
    );

    //change selected item on click
    $(".select_options_list li").click(function (e) {
        //var href = $(this).find('a').attr("href");
        //var value = $(this).find('a').attr('value');
        //var item = '<li><a href="#' + href + '" alt="'+ value +'">'+ text +'</a></li>';
        /* var text = this.innerText;
		var item = '<li><span class="selected_item">'+ text +'</span></li>'; 
		$('.select_generated_html_wrap .selected_items_btn').html(item);  */

        $(".select_options_list_wrap").toggle();
        //$(this).addClass('active');
        //$(this).siblings().removeClass('active');
        $(".select_generated_html_wrap .selected_items_btn").removeClass(
            "active"
        );
        close_select_options_list_wrap(e);
    });

    $('.select_options_list li a[href*="#"]:not([href="#"])').on(
        "click",
        function (e) {
            var text = this.innerText;
            var item =
                '<li><span class="selected_item">' + text + "</span></li>";
            $(".select_generated_html_wrap .selected_items_btn").html(item);

            $(this).parent("li").addClass("active");
            $(this).parent("li").siblings().removeClass("active");

            if (
                location.pathname.replace(/^\//, "") ==
                    this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length
                    ? target
                    : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate(
                        {
                            scrollTop: target.offset().top - 55,
                        },
                        500,
                        "swing"
                    );
                    return false;
                }
            }
        }
    );

    $(".select_generated_html_wrap .selected_items_btn").click(function () {
        $(".select_options_list_wrap").toggle();
        $(this).toggleClass("active");
    });

    //check local storage for the lang
    var sessionLang = localStorage.getItem("selected_option");
    if (sessionLang) {
        //find an item with value of sessionLang
        var langIndex = select_options_array.indexOf(sessionLang);
        $(".select_generated_html_wrap .selected_items_btn").html(
            select_options_array[langIndex]
        );
    } else {
        var langIndex = select_options_array.indexOf("ch");
        console.log(langIndex);
        $(".select_generated_html_wrap .selected_items_btn").html(
            select_options_array[langIndex]
        );
    }
    function close_select_options_list_wrap(e) {
        var impt_btn_container = $(
            ".custom_select_box_wrap .selected_items_btn"
        );
        if (
            !impt_btn_container.is(e.target) &&
            impt_btn_container.has(e.target).length === 0
        ) {
            $(".custom_select_box_wrap .select_options_list_wrap").css(
                "display",
                "none"
            );
            $(".select_generated_html_wrap .selected_items_btn").removeClass(
                "active"
            );
        }
    }
    $(document).mouseup(function (e) {
        close_select_options_list_wrap(e);
    });
}
