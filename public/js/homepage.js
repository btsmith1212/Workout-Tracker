document.addEventListener('DOMContentLoaded', function () {
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
    });
});

// lets you swipe for the carousel