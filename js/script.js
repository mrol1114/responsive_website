import createCards from './modules/card';
import modalHandler from './modules/modal';
import tabsHandler from './modules/tabs';
import timerHandler from './modules/timer';
import sliderHandler from './modules/slider';
import calculator from './modules/calc';

document.addEventListener('DOMContentLoaded', main);

function main() {
    createCards();
    modalHandler({
        modal: '[data-modal-content]',
        trigger: '[data-modal-btn]',
        closeModal: 'data-modal-close',
        form: 'form'
    });
    tabsHandler({
        tab: '.tabheader__item',
        container: '.tabheader__items',
        content: '.tabcontent',
        activeClass: 'tabheader__item_active'
    });

    timerHandler();
    sliderHandler({
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
    calculator();
}