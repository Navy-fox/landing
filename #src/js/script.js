function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height === 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

// Меню бургер
const iconMenu = document.querySelector('.burger');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('--lock');
        // iconMenu.classList.toggle('--active');
        const open = menuBody.classList.toggle('menu--active')
        iconMenu.closest('picture').querySelector('source').srcset = open ? 'img/cross.svg' : 'img/bar.svg'
        // iconMenu.src = open ? 'img/cross.svg' : 'img/bar.svg'
    });
}

// Прокрутка при клике
// Собираем массив объектов, которые будут участвовать в навигации
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    // Вешаем событие "click"
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick)

        function onMenuLinkClick(e) {
            menuLinks.forEach(item => {
                item.classList.remove('menu__link--active')
            })
            this.classList.add('menu__link--active')
            // Получаем объект, на который мы кликаем
            const menuLink = e.target;
            // Проверяем заполнен ли этот дата-атрибут и(&&) существует ли объект, на который ссылается данный дата-атрибут
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                // Получаем в константу этот объект
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                // Высчитываем положение объекта с учетом высоты шапки
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                if (iconMenu.classList.contains('--active')) {
                    document.body.classList.remove('--lock');
                    iconMenu.classList.remove('--active');
                    menuBody.classList.remove('menu--active')
                }

                // Обращаемся к объекту window(окну браузера), пишем функцию занимающуюся прокруткой
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault()
            }
        }
    });
}


