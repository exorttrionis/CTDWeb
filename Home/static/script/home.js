var owl = $('#slider-1');
owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: [" ", " "],
    responsive: {
        0: {
            items: 2,
            nav: true
        },
        600: {
            items: 3,
            nav: false
        },
        1000: {
            items: 4,
            nav: true,
            loop: false
        }
    }
});
$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [1000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})

var owl = $('#slider-2');
owl.owlCarousel({
    items: 1,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navText: [" ", " "],
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: false
        },
        1000: {
            items: 1,
            nav: true,
            loop: false
        }
    }
});