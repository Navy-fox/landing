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

// Прокрутка при клике
// Собираем массив объектов, которые будут участвовать в навигации
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    // Вешаем событие "click"
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick)

        function onMenuLinkClick(e) {
            menuLinks.forEach(item=>{item.classList.remove('menu__link--active')})
            this.classList.add('menu__link--active')
            // Получаем объект, на который мы кликаем
            const menuLink = e.target;
            // Проверяем заполнен ли этот дата-атрибут и(&&) существует ли объект, на который ссылается данный дата-атрибут
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                // Получаем в константу этот объект
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                // Высчитываем положение объекта с учетом высоты шапки
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

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

// Меню бургер
const iconMenu = document.querySelector('.burger');
if(iconMenu){
    const menuBody = document.querySelector('.menu');
    iconMenu.addEventListener("click", function (e){
        iconMenu.classList.toggle('__active');
        menuBody.classList.toggle('__active')
    })
}
