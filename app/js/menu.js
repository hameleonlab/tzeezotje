// Прокрутка при клике
const menuLinks = document.querySelectorAll('.header__menu a[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
        e.preventDefault();
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset ; // - document.querySelector('header').offsetHeight;
            
            var header = document.querySelector('.header');
            header.classList.toggle('open');

            window.scrollBy({
                top: gotoBlockValue,
                behavior: 'smooth'
            });
		}
	}
}