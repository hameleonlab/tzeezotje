var header__burger = document.querySelector('.header__burger');
if (header__burger) {
    var header = document.querySelector('.header');
    header__burger.onclick = function() {
        header.classList.toggle('open');
    };
}