import { postData } from '../services/dataHandler';

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

            postData("http://localhost:3000/requests", JSON.stringify(object), { "Content-type": "application/json" })
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

export default modalHandler;