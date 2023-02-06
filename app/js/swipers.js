// https://swiperjs.com/


if (document.querySelector(".reviewsSwiper")) {
    var reviewsSwiper = new Swiper(".reviewsSwiper", {
        // autoplay: {
        //     delay: 4000,
        // },
        navigation: {
            nextEl: '.reviewsSwiper .swiper-button-next',
            prevEl: '.reviewsSwiper .swiper-button-prev',
        },
        pagination: {
            el: '.reviewsSwiper .swiper-pagination',
            type: 'bullets',
        },
        slidesPerView: 1,
    });
}

if (document.querySelector(".photosSwiper")) {
    var reviewsSwiper = new Swiper(".photosSwiper .swiper", {
        // autoplay: {
        //     delay: 4000,
        // },
        spaceBetween: 30,
        navigation: {
            nextEl: '.photosSwiper .swiper-button-next',
            prevEl: '.photosSwiper .swiper-button-prev',
        },
        pagination: {
            el: '.photosSwiper .swiper-pagination',
            type: 'bullets',
        },
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
    });
}