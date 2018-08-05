$(document).ready(function() {

    // GLOBAL VARIABLES
    var filename = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    var fileExtension = filename.substr((filename.lastIndexOf('.') + 0));
    var relativePath = window.location.href;

    filename = filename.replace(fileExtension, "");

    // Substring occurence in a string - returns number
    function occurrences(string, subString, allowOverlapping) {

        string += "";
        subString += "";
        if (subString.length <= 0) return (string.length + 1);

        var n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }
        return n;
    }

    // STYLE SWITCHER
    $("#cmdShowStyleSwitcher").click(function() {
        if ($("#theme_style_switcher").hasClass("opened")) {
            $("body").removeClass("style-switcher-in");
            $("#theme_style_switcher").removeClass("opened");
        } else {
            $("body").addClass("style-switcher-in");
            $("#theme_style_switcher").addClass("opened");
        }
        return false;
    });

    // Default settings
	var styleSwitcher = $('#theme_style_switcher');

	// Set the default values used in custom.less
    var settings = styleSwitcher.data('settings'),
        theme_color = Cookies.get('theme_color') ? Cookies.get('theme_color') : settings[0].theme_color,
        theme_color_2 = Cookies.get('theme_color_2') ? Cookies.get('theme_color_2') : settings[0].theme_color_2,
        theme_typeface_alt = Cookies.get('theme_typeface_alt') ? Cookies.get('theme_typeface_alt') : settings[0].theme_typeface_alt,
        theme_typeface_base = Cookies.get('theme_typeface_base') ? Cookies.get('theme_typeface_base') : settings[0].theme_typeface_base;
        theme_border_radius = Cookies.get('theme_border_radius') ? Cookies.get('theme_border_radius') : '0.25rem';
        theme_card_border_radius = Cookies.get('theme_border_radius') ? Cookies.get('theme_border_radius') : '0.25rem';

	//Initialize LESS with default values
	less.modifyVars({
		'@color-base-1': theme_color,
        '@color-base-2': theme_color_2,
		'@font-family-alt': theme_typeface_alt,
		'@font-family-base': theme_typeface_base,
        '@border-radius': theme_border_radius,
        '@card-border-radius': theme_card_border_radius
	});

    // Theme color
    $("[data-theme-switcher='theme-color'] a").click(function(){
    	var $this = $(this);
    	var value = $(this).data("value");

    	// Create the new style with the selected values
		less.modifyVars({
            '@color-base-1': value,
            '@color-base-2': theme_color_2,
            '@font-family-alt': theme_typeface_alt,
            '@font-family-base': theme_typeface_base,
            '@border-radius': theme_border_radius,
            '@card-border-radius': theme_card_border_radius
        });

        // Save the new selected value in cookies
		Cookies.set('theme_color', value);

        // Mark the clicked elements as active
    	$("[data-theme-switcher='theme-color'] a").removeClass("active");
    	$("[data-theme-switcher='theme-color']").find('a[data-value="' + value + '"]').addClass("active");

    	return false;
    });

    // Mark the clicked elements as active on load
    $("[data-theme-switcher='theme-color']").find('a[data-value="' + theme_color + '"]').addClass("active");

    // Theme typeface for button version
    $("[data-theme-switcher='promo-theme-typeface-alt'] a").click(function(){
    	var $this = $(this);
    	var value = $(this).data("value");

    	// Create the new style with the selected values
		less.modifyVars({
            '@color-base-1': theme_color,
            '@color-base-2': theme_color_2,
            '@font-family-alt': value,
            '@font-family-base': theme_typeface_base,
            '@border-radius': theme_border_radius,
            '@card-border-radius': theme_card_border_radius
        });

        // Save the new selected value in cookies
		Cookies.set('theme_typeface_alt', value);

        // Mark the clicked elements as active
    	$("[data-theme-switcher='promo-theme-typeface-alt'] a").removeClass("active");
    	$this.addClass("active");

        // Select the option from the list also
        $("[data-theme-switcher='theme-typeface-alt']").val(value).attr("selected", "selected");

    	return false;
    });

    // Mark the clicked elements as active on load
    $("[data-theme-switcher='promo-theme-typeface-alt']").find('a[data-value="' + theme_typeface_alt + '"]').addClass("active");

    // Theme Typeface for Headings
    $("[data-theme-switcher='theme-typeface-alt']").change(function() {
        var $this = $(this);
        var value = $this.val();

        // Create the new style with the selected values
        less.modifyVars({
            '@color-base-1': theme_color,
            '@color-base-2': theme_color_2,
            '@font-family-alt': value,
            '@font-family-base': theme_typeface_base,
            '@border-radius': theme_border_radius,
            '@card-border-radius': theme_card_border_radius
        });

        // Save the new selected value in cookies
		Cookies.set('theme_typeface_alt', value);

        // Set the typeface in the promo page also
        $("[data-theme-switcher='promo-theme-typeface-alt'] a").removeClass("active");
         $("[data-theme-switcher='promo-theme-typeface-alt']").find('a[data-value="' + value + '"]').addClass("active");
    });

    // Mark the clicked elements as active on load
    $("[data-theme-switcher='theme-typeface-alt']").val(theme_typeface_alt).attr("selected", "selected");

    // Theme Typeface for Text/Content
    $("[data-theme-switcher='theme-typeface-base']").change(function() {
        var $this = $(this);
        var value = $this.val();

        // Create the new style with the selected values
        less.modifyVars({
            '@color-base-1': theme_color,
            '@color-base-2': theme_color_2,
            '@font-family-alt': theme_typeface_alt,
            '@font-family-base': value,
            '@border-radius': theme_border_radius,
            '@card-border-radius': theme_card_border_radius
        });

        // Save the new selected value in cookies
		Cookies.set('theme_typeface_base', value);
    });

    // Mark the clicked elements as active on load
    $("[data-theme-switcher='theme-typeface-base']").val(theme_typeface_base).attr("selected", "selected");

    // Navbar styles
    function setNavbarStyle(navbar_style) {
        if(navbar_style != 0) {
            if(! $(".navbar").hasClass(navbar_style)) {
                $(".navbar").removeClass("navbar--style-1 navbar--style-2");
                $(".navbar").addClass(navbar_style);
            }
        } else {
            $(".navbar").removeClass("navbar--style-1 navbar--style-2");
        }

        $("[data-theme-switcher='navbar-style'] input").each(function() {
            if($(this).val() == navbar_style) {
                $(this).prop("checked", true);
            }
        })
    }

    $("[data-theme-switcher='navbar-style'] input").change(function(){
        var $this = $(this);
    	var value = $(this).val();

        setNavbarStyle(value);

        // Save the new selected value in cookies
		Cookies.set('navbar_style', value);
    });

    Cookies.get('navbar_style') ? setNavbarStyle(Cookies.get('navbar_style')) : '';

    // Navbar delimiter
    function setNavbarDelimiter(navbar_delimiter) {
        if(navbar_delimiter != 0) {
            if(! $(".navbar").hasClass(navbar_delimiter)) {
                $(".navbar").removeClass("navbar--shadow navbar--bb-1px");
                $(".navbar").addClass(navbar_delimiter);
            }
        } else {
            $(".navbar").removeClass("navbar--shadow navbar--bb-1px");
        }

        $("[data-theme-switcher='navbar-delimiter'] input").each(function() {
            if($(this).val() == navbar_delimiter) {
                $(this).prop("checked", true);
            }
        })
    }

    $("[data-theme-switcher='navbar-delimiter'] input").change(function(){
        var $this = $(this);
    	var value = $(this).val();

        setNavbarDelimiter(value);

        // Save the new selected value in cookies
		Cookies.set('navbar_delimiter', value);
    });

    Cookies.get('navbar_delimiter') ? setNavbarDelimiter(Cookies.get('navbar_delimiter')) : '';

    // Navbar link weight
    function setNavbarLinkWeight(navbar_link_weight) {
        if(navbar_link_weight != 0) {
            if(! $(".navbar").hasClass(navbar_link_weight)) {
                $(".navbar").removeClass("navbar--bold");
                $(".navbar").addClass(navbar_link_weight);
            }
        } else {
            $(".navbar").removeClass("navbar--bold");
        }

        $("[data-theme-switcher='navbar-link-weight'] input").each(function() {
            if($(this).val() == navbar_link_weight) {
                $(this).prop("checked", true);
            }
        })
    }

    $("[data-theme-switcher='navbar-link-weight'] input").change(function(){
        var $this = $(this);
    	var value = $(this).val();

        setNavbarLinkWeight(value);

        // Save the new selected value in cookies
		Cookies.set('navbar_link_weight', value);
    });

    Cookies.get('navbar_link_weight') ? setNavbarLinkWeight(Cookies.get('navbar_link_weight')) : '';

    // Navbar link Style
    function setNavbarLinkStyle(navbar_link_style) {
        if(navbar_link_style != 0) {
            if(! $(".navbar").hasClass(navbar_link_style)) {
                $(".navbar").removeClass("navbar--bold");
                $(".navbar").addClass(navbar_link_style);
            }
        } else {
            $(".navbar").removeClass("navbar--uppercase");
        }

        $("[data-theme-switcher='navbar-link-style'] input").each(function() {
            if($(this).val() == navbar_link_style) {
                $(this).prop("checked", true);
            }
        })
    }

    $("[data-theme-switcher='navbar-link-style'] input").change(function(){
        var $this = $(this);
    	var value = $(this).val();

        setNavbarLinkStyle(value);

        // Save the new selected value in cookies
		Cookies.set('navbar_link_style', value);
    });

    Cookies.get('navbar_link_style') ? setNavbarLinkStyle(Cookies.get('navbar_link_style')) : '';

    // Navbar dropdown color
    function setNavbarDropdownColor(navbar_dropdown_color) {
        if(navbar_dropdown_color != 0) {
            if(! $(".navbar").hasClass(navbar_dropdown_color)) {
                $(".navbar").removeClass("navbar-dropdown--inverse");
                $(".navbar").addClass(navbar_dropdown_color);
            }
        } else {
            $(".navbar").removeClass("navbar-dropdown--inverse");
        }

        $("[data-theme-switcher='navbar-dropdown-color'] input").each(function() {
            if($(this).val() == navbar_dropdown_color) {
                $(this).prop("checked", true);
            }
        })
    }

    $("[data-theme-switcher='navbar-dropdown-color'] input").change(function(){
        var $this = $(this);
    	var value = $(this).val();

        setNavbarDropdownColor(value);

        // Save the new selected value in cookies
		Cookies.set('navbar_dropdown_color', value);
    });

    Cookies.get('navbar_dropdown_color') ? setNavbarDropdownColor(Cookies.get('navbar_dropdown_color')) : '';


    // Layout type
    function setLayoutType(layout_type) {
        if(layout_type != 0) {
            if(! $(".body-wrap").hasClass(layout_type)) {
                $(".body-wrap").removeClass("body-boxed");
                $(".body-wrap").addClass(layout_type);
            }
        } else {
            $(".body-wrap").removeClass("body-boxed");
        }

        $("[data-theme-switcher='layout-type'] input").each(function() {
            if($(this).val() == layout_type) {
                $(this).prop("checked", true);
            }
        })
    }

    $("[data-theme-switcher='layout-type'] input").change(function(){
        var $this = $(this);
    	var value = $(this).val();

        setLayoutType(value);

        // Save the new selected value in cookies
		Cookies.set('layout_type', value);
    });

    Cookies.get('layout_type') ? setLayoutType(Cookies.get('layout_type')) : '';

    // // BODY BACKGROUND
    $("#body_background a").click(function() {
        // Trigger click for boxed layout type
        $("#layout_type input[data-value='boxed']").trigger("click");

        var value = $(this).data("value");

        $("body").removeClass("body-bg-1 body-bg-2 body-bg-3 body-bg-4 body-bg-5 body-bg-6 body-bg-7 body-bg-8 body-bg-9");
        $("body").addClass(value);
        $("#body_background a").removeClass("active");
        $(this).addClass("active");

        Cookies.set('body_background', value);

        return false;
    });

    // Cookie reading
    var bodyBackground = Cookies.get('body_background');

    // Add active class to selected value button
    $("#body_background").find('a[data-value="' + bodyBackground + '"]').addClass("active");

    // Set option from cookie
    $("body").addClass(bodyBackground);


    $("#btnResetStyles").click(function() {
        Cookies.remove('theme_typeface_base');
        Cookies.remove('theme_typeface_alt');
        Cookies.remove('theme_color');
        Cookies.remove('navbar_style');
        Cookies.remove('navbar_delimiter');
        Cookies.remove('navbar_link_style');
        Cookies.remove('navbar_link_weight');
        Cookies.remove('navbar_dropdown_color');
        Cookies.remove('layout_type');
        Cookies.remove('body_background');
        location.reload();

        return false();
    });
});
