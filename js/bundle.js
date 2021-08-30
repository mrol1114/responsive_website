/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/MenuItem.js":
/*!********************************!*\
  !*** ./js/modules/MenuItem.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MenuItem {

    constructor(parent, imageSrc, imageAlt, header, description, price) {
        this.parent = parent;
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.header = header;
        this.description = description;
        this.price = price;
    }

    initializeStructure() {
        this.itemContainer = document.createElement('div');
        this.itemImage = document.createElement('img');
        this.itemDescription = document.createElement('div');
        this.itemDivider = document.createElement('div');
        this.itemPrice = document.createElement('div');
        this.itemCost = document.createElement('div');
        this.itemCostTotal = document.createElement('div');
        this.itemHeader = document.createElement('h3');
        this.itemCostTotalSpan = document.createElement('span');
        this.itemCostTotalParagraph = document.createElement('p');

        this.itemContainer.appendChild(this.itemImage);
        this.itemContainer.appendChild(this.itemHeader);
        this.itemContainer.appendChild(this.itemDescription);
        this.itemContainer.appendChild(this.itemDivider);
        this.itemContainer.appendChild(this.itemPrice);
        this.itemPrice.appendChild(this.itemCost);
        this.itemPrice.appendChild(this.itemCostTotal);
        this.itemCostTotal.append(this.itemCostTotalSpan);
        this.itemCostTotal.append(this.itemCostTotalParagraph);
    }

    applyClassesToStructure() {
        this.itemContainer.classList.add('menu__item');
        this.itemHeader.classList.add('menu__item-subtitle');
        this.itemDescription.classList.add('menu__item-descr');
        this.itemDivider.classList.add('menu__item-divider');
        this.itemPrice.classList.add('menu__item-price');
        this.itemCost.classList.add('menu__item-cost');
        this.itemCostTotal.classList.add('menu__item-total');
        this.itemCostTotalParagraph.style.cssText = `
            display: inline;
            margin-left: 5px;
        `;
        this.itemContainer.style.cssText = `
            height: 100%;
        `;
    }

    fillStructure() {
        this.itemImage.src = this.imageSrc;
        this.itemImage.alt = this.imageAlt;
        this.itemHeader.textContent = this.header;
        this.itemDescription.textContent = this.description;
        this.itemCost.textContent = 'Цена:';
        this.itemCostTotalSpan.textContent = this.price;
        this.itemCostTotalParagraph.textContent = 'грн/день';
    }

    displayStructure() {
        const itemParent = document.querySelector(this.parent);
        const container = itemParent.querySelector('.container');
        container.appendChild(this.itemContainer);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuItem);

/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector('.calculating__result span');
    let weight, height, age, sex, ratio;


    function isStorageInit(valueName, variable) {
        if (localStorage.getItem(valueName)) {
            if (valueName.replace(/\d/g, '') == '') {
                variable = +localStorage.getItem(valueName);
            } else {
                variable = localStorage.getItem(valueName);
            }
        } else {
            if (valueName == 'sex') {
                localStorage.setItem(valueName, 'Женщина');
            } else {
                localStorage.setItem(valueName, 1.375);
            }
        }
    }

    function staticInfoInit(parentSelector, activeClass) {
        const parent = document.querySelector(parentSelector),
            childs = parent.querySelectorAll('div');

        childs.forEach(item => {
            if (item.getAttribute('data-ratio')) {
                if (+item.getAttribute('data-ratio') == +localStorage.getItem('ratio')) {
                    childs.forEach(item => {
                        item.classList.remove(activeClass);
                    });
                    item.classList.add(activeClass);
                    ratio = item.getAttribute('data-ratio');
                    localStorage.setItem(`ratio`, +item.getAttribute('data-ratio'));
                }
            } else {
                if (item.textContent == localStorage.getItem('sex')) {
                    childs.forEach(item => {
                        item.classList.remove(activeClass);
                    });
                    item.classList.add(activeClass);
                    sex = item.textContent;
                    localStorage.setItem(`sex`, item.textContent);
                }
            }
        }
        );

    }

    function calcTotal() {
        if (!weight || !height || !age || !sex || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex == 'Мужчина') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    function getStaticInfo(parentSelector, activeClass) {
        const parent = document.querySelector(parentSelector),
            childs = parent.querySelectorAll('div');

        parent.addEventListener('click', (event) => {
            childs.forEach(child => {
                if (child === event.target) {
                    childs.forEach(child => {
                        child.classList.remove(activeClass);
                    });
                    event.target.classList.add(activeClass);

                    if (event.target.getAttribute('data-ratio')) {
                        ratio = +event.target.getAttribute('data-ratio');
                        localStorage.setItem(`ratio`, +event.target.getAttribute('data-ratio'));
                    } else {
                        sex = event.target.textContent;
                        localStorage.setItem(`sex`, event.target.textContent);
                    }
                    calcTotal();
                }
            });
        });

    }

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.replace(/\d/g, '') == '') {
                input.classList.remove('input-mistake');
                switch (input.getAttribute('id')) {
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'height':
                        height = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
            } else {
                input.classList.add('input-mistake');
            }
            calcTotal();
        });
    }


    isStorageInit('sex', sex);
    isStorageInit('ratio', ratio);
    staticInfoInit("#gender", "calculating__choose-item_active");
    staticInfoInit("#ratio", "calculating__choose-item_active");
    calcTotal();
    getStaticInfo("#gender", "calculating__choose-item_active");
    getStaticInfo("#ratio", "calculating__choose-item_active");
    getDynamicInfo('#weight')
    getDynamicInfo('#height')
    getDynamicInfo('#age')
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuItem */ "./js/modules/MenuItem.js");
/* harmony import */ var _services_dataHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/dataHandler */ "./js/services/dataHandler.js");



function createCard() {

    function makeItem(parent, imageSrc, imageAlt, header, description, price) {

        const obj = new _MenuItem__WEBPACK_IMPORTED_MODULE_0__.default(parent, imageSrc, imageAlt, header, description, price);
        obj.initializeStructure();
        obj.fillStructure();
        obj.applyClassesToStructure();
        obj.displayStructure();
    }

    const data = (0,_services_dataHandler__WEBPACK_IMPORTED_MODULE_1__.getData)("http://localhost:3000/menu");

    data
        .then(list => {
            list.forEach(({ img, altImg, title, descr, price }) => {
                makeItem('.menu', img, altImg, title, descr, price);
            })
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCard);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_dataHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/dataHandler */ "./js/services/dataHandler.js");


function modalHandler({ modal, trigger, closeModal, form }) {


    const modalContent = document.querySelector(modal),
        modalTrigger = document.querySelectorAll(trigger);

    function disableDisplay() {
        modalContent.classList.add('hide');
        modalContent.classList.remove('display');
        document.body.style.overflow = "";
    }

    function displayContent() {
        modalContent.classList.remove('hide');
        modalContent.classList.add('display');
        document.body.style.overflow = "hidden";
        modalContent.addEventListener('click', event => {
            const target = event.target;

            if (target === modalContent || target.getAttribute(closeModal) == '') {
                disableDisplay();
            }
        });
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', displayContent);
    });

    function showMOdalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            displayContent();
            window.removeEventListener('scroll', showMOdalByScroll);
        }
    }
    window.addEventListener('scroll', showMOdalByScroll);

    const forms = document.querySelectorAll(form);
    const messages = {
        success: 'Ваши данные были успешно отправлены',
        failure: 'Произошла ошибка во время отправки данных, повторите позже',
        loading: 'img/svg/food/spinner.svg'
    };


    function sendData(form) {

        form.addEventListener('submit', event => {
            event.preventDefault();

            const modalDialog = document.querySelector('.modal');
            const prevForm = document.querySelector('.modal__dialog');
            let visualForm = makeForm(messages.loading);

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            prevForm.classList.add('hide');
            displayContent();
            modalDialog.append(visualForm);

            (0,_services_dataHandler__WEBPACK_IMPORTED_MODULE_0__.postData)("http://localhost:3000/requests", JSON.stringify(object), { "Content-type": "application/json" })
                .then((data) => {
                    console.log(data);
                    visualForm.remove();
                    visualForm = makeForm(messages.success);
                }).catch(() => {
                    visualForm.remove();
                    visualForm = makeForm(messages.failure);
                }).finally(() => {
                    form.reset();
                    modalDialog.append(visualForm);

                    setTimeout(() => {
                        visualForm.remove();
                        prevForm.classList.add('display');
                        prevForm.classList.remove('hide');
                        disableDisplay();
                    }, 4000);
                });
        });
    }

    function makeForm(message) {
        const form = document.createElement('div');
        form.classList.add('modal__dialog');

        if (message == messages.loading) {
            const formContent = document.createElement('div');
            formContent.classList.add('modal__content');
            const image = document.createElement('img');
            image.src = message;
            image.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            formContent.innerHTML = `
                <div data-modal-close="" class="modal__close">×</div>
            `;
            formContent.append(image);
            form.append(formContent);
        } else {

            form.innerHTML = `
            <div class="modal__content">
                <div data-modal-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
            `;
        }
        return form;
    }

    forms.forEach(item => {
        sendData(item);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalHandler);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function sliderHandler({ slide, curSlideItem, totalSlideItem, back, next, container, wrapper, innerClass, dotActiveClass, dotsContainerClass, slider, dotClass }) {
    const sliders = document.querySelectorAll(slide),
        current = document.getElementById(curSlideItem),
        total = document.getElementById(totalSlideItem),
        leftArrow = document.querySelector(back),
        rightArrow = document.querySelector(next),
        inner = document.querySelector(container),
        offerWrapper = document.querySelector(wrapper);

    let width = window.getComputedStyle(offerWrapper).width,
        currentNumber = 0,
        offset = 0,
        totalNumber = sliders.length,
        dots = [];

    offerWrapper.style.overflow = 'hidden';
    inner.classList.add(innerClass);

    inner.style.width = 100 * sliders.length + '%';

    sliders.forEach(slide => {
        slide.style.width = width;
    });

    function wrap() {
        inner.style.transform = `translateX(-${offset}px)`;
    }

    function addZero(number) {
        if (number >= 10) {
            return `${number}`;
        } else if (number == 0) {
            return `0`;
        } else {
            return `0${number}`;
        }
    }

    function validateWrap() {
        if (currentNumber < 0) {
            currentNumber = 0;
            offset = 0;
            return false
        } else if (currentNumber > totalNumber - 1) {
            currentNumber -= 1;
            offset -= +width.slice(0, width.length - 2);
            return false;
        }
        return true;
    }

    function changeText(number, item) {
        const differenceInDisplay = 1;

        item.textContent = addZero(number + differenceInDisplay);
    }

    function disableDots() {
        dots.forEach(dot => {
            dot.classList.remove(dotActiveClass);
        });
    }

    function applyChanges() {
        if (validateWrap(currentNumber)) {
            disableDots();
            dots[currentNumber].classList.add(dotActiveClass);
            changeText(currentNumber, current);
            wrap(currentNumber);
        }
    }


    function sliderNavigation() {
        const dotsContainer = document.createElement('ul'),
            offerSlider = document.querySelector(slider);

        offerSlider.style.position = 'relative';
        dotsContainer.classList.add(dotsContainerClass);

        function createDot() {
            const dot = document.createElement("li");
            dot.classList.add(dotClass);
            return dot;
        }

        for (let i = 0; i < totalNumber; i++) {
            dots.push(createDot());
            dotsContainer.append(dots[i]);
        }

        offerSlider.append(dotsContainer);

        dots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                let i = 0;

                dots.forEach((item, index) => {
                    if (event.target === item) {
                        i = index;
                    }
                });

                offset = +width.slice(0, width.length - 2) * i;
                currentNumber = i;
                disableDots();
                dots[currentNumber].classList.add(dotActiveClass);

                wrap();
                changeText(currentNumber, current);
            });
        });
    }

    sliderNavigation();
    changeText(currentNumber, current);
    dots[currentNumber].classList.add(dotActiveClass);

    leftArrow.addEventListener('click', () => {
        currentNumber -= 1;
        offset -= +width.slice(0, width.length - 2);
        applyChanges();
    });

    rightArrow.addEventListener('click', () => {
        currentNumber += 1;
        offset += +width.slice(0, width.length - 2);
        applyChanges();
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliderHandler);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabsHandler({ tab, container, content, activeClass }) {
    const tabs = document.querySelectorAll(tab);
    const tabParent = document.querySelector(container);
    const tabContent = document.querySelectorAll(content);

    function disableTabs() {

        tabContent.forEach(function (item) {
            item.classList.add('hide');
            item.classList.remove('display');
        });

        tabs.forEach(function (item) {
            item.classList.remove(activeClass);
        });
    }

    function activeTab(i = 0) {

        tabContent[i].classList.add('display');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    disableTabs();
    activeTab();

    tabParent.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains(tab.slice(1))) {

            disableTabs();
            tabs.forEach(function (item, i) {
                if (item === target) {
                    activeTab(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabsHandler);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timerHandler() {

    const deadLine = Date.parse(new Date()) + 99999999,
        timerInterval = setInterval(update, 1000);

    function getTime(time) {

        if (time <= 10) {
            return `0${time}`;
        } else {
            return time;
        }
    }
    function remainingTime(endTime) {
        const total = endTime - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor(total / (1000 * 60 * 60)) % 24,
            minutes = Math.floor(total / (1000 * 60)) % 60,
            seconds = Math.floor(total / (1000)) % 60;

        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function updateTimer(selector, time) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');


        if (time.total <= 0) {
            clearInterval(timerInterval);
        } else {
            days.textContent = getTime(time.days);
            hours.textContent = getTime(time.hours);
            minutes.textContent = getTime(time.minutes);
            seconds.textContent = getTime(time.seconds);
        }

    }


    function update() {
        const time = remainingTime(deadLine);
        updateTimer('.timer', time);
    }

    update();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timerHandler);

/***/ }),

/***/ "./js/services/dataHandler.js":
/*!************************************!*\
  !*** ./js/services/dataHandler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
async function getData(url) {
    const req = await fetch(url);

    if (req.status != 200) {
        throw Error(`Failed to get data from ${url}, with status ${req.status}`);
    }

    return req.json();
}

async function postData(url, data, format) {
    const req = await fetch(url, {
        method: 'POST',
        body: data,
        headers: format
    });

    if (!req.ok) {
        throw Error(`Failed to get data from ${url}, with status ${req.status}`);
    }

    return req.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");







document.addEventListener('DOMContentLoaded', main);

function main() {
    (0,_modules_card__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)({
        modal: '[data-modal-content]',
        trigger: '[data-modal-btn]',
        closeModal: 'data-modal-close',
        form: 'form'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__.default)({
        tab: '.tabheader__item',
        container: '.tabheader__items',
        content: '.tabcontent',
        activeClass: 'tabheader__item_active'
    });

    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
        slide: '.offer__slide',
        curSlideItem: 'current',
        totalSlideItem: 'total',
        back: '[data-offer-arrow-left]',
        next: '[data-offer-arrow-right]',
        container: '.offer__slider-inner',
        wrapper: '.offer__slider-wrapper',
        innerClass: 'slider-inner',
        dotActiveClass: 'slider-dot-activate',
        dotsContainerClass: 'carousel-indicators',
        slider: '.offer__slider',
        dotClass: 'dot'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)();
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map