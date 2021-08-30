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

export default sliderHandler;