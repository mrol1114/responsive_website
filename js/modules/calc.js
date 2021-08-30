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

export default calculator;