$(document).ready(function() {
    generatePages();
    var swidth = document.documentElement.clientWidth;
        console.log(swidth);
        swidth = swidth*0.8 ;
          swidth = Math.round(swidth);
    $('#tab-container').easytabs();
    $("#carousel").rcarousel(
            {
                visible: 1,
                step: 1,
                speed: 700,
                auto: {
                    enabled: true,
                    interval: 7000
                },
                width: swidth ,
                height: 600,
                start: generatePages,
                pageLoaded: pageLoaded
            }
    );
    $(function() {
	$('#sky-carousel').carousel({
		itemWidth: 200, // The width of your images.
		itemHeight: 350 // The height of your images.
	});
});

    function generatePages() {
        var _total, i, _link;
        _total = $("#carousel").rcarousel("getTotalPages");
        for (i = 0; i < _total; i++) {

            _link = $("<a href='#'>.</a>");

            $(_link)
                    .bind("click", {page: i},
                    function(event) {
                        $("#carousel").rcarousel("goToPage", event.data.page);
                        event.preventDefault();
                    }
                    )
                    .addClass("bullet off")
                    .appendTo("#pages");
        }

        // mark first page as active
        $("a:eq(0)", "#pages")
                .removeClass("off")
                .addClass("on")
                .css("background-image", "url('images/page-on.png')");

    }


    function pageLoaded(event, data) {
        $("a.on", "#pages")
                .removeClass("on")
                .css("background-image", "url('images/page-off.png')");

        $("a", "#pages")
                .eq(data.page)
                .addClass("on")
                .css("background-image", "url(../images/page-on.png)");
    }
});

/*** Skycarousel ***/

$(function() {
    $('.sky-carousel').carousel({
        itemWidth: 240,
        itemHeight: 240,
        distance: 12,
        selectedItemDistance: 75,
        selectedItemZoomFactor: 1,
        unselectedItemZoomFactor: 0.5,
        unselectedItemAlpha: 0.6,
        motionStartDistance: 210,
        topMargin: 115,
        circular: true,
        autoSlideshow :false,
        loop: false,
        preload: true,
        loopRewind: true,
        gradientStartPoint: 0.35,
        gradientOverlayColor: "#ebebeb",
        gradientOverlaySize: 190,
        selectByClick: false
    });
});
