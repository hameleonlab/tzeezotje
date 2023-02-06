var header__reserve = document.querySelector('.header__reserve');
if (header__reserve) {
    
    header__reserve.onclick = function() {
        var popup_get_service = document.querySelector('.popup-get-service');
        popup_get_service.classList.add('open');
    };
}


var popup__closes = document.querySelectorAll('.popup__close');
if (popup__closes) {
    popup__closes.forEach(popup__close => {
        popup__close.onclick = function() {
            var popup = this.closest('.popup');
            popup.classList.remove('open');
        };
    });
}

// закрываем попапы
var popups = document.querySelectorAll('.popup');
if (popups) {
    popups.forEach(popup => {
        popup.onclick = function() {
            popup.classList.remove('open');
        }
    });
    
    
    // фиксим закрывание
    var popup__wraps = document.querySelectorAll('.popup__wrap');
    popup__wraps.forEach(popup__wrap => {
        popup__wrap.onclick = function() {
            event.stopPropagation();
        }
    });
}
