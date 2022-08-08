import './styles/style.scss';
import {Modal, ModalWithForm} from './modules/classes';
import {patterns, validate} from './modules/validation';
import {submit} from './modules/api';
import {smoothScrollToLink} from './modules/scrolls';

// Reset default links
const links = document.querySelectorAll('.link');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Open and close Hamburger menu

const hamburger = document.querySelector('.hamburger');
const mainMenu = document.querySelector('.header__nav');

let isOpenMenu = false;

function showAndHideMenu() {
    if(mainMenu && hamburger) {
        if(!isOpenMenu) {
            mainMenu.classList.add('header__nav--active');
            hamburger.classList.add('hamburger--active');
            isOpenMenu = true;
        } else {
            mainMenu.classList.remove('header__nav--active');
            hamburger.classList.remove('hamburger--active');
            isOpenMenu = false;
        }
    }
};

hamburger.onclick = showAndHideMenu;

// Scroll to elem for Hamburger menu

const headerLinks = document.querySelectorAll('.header__link');

headerLinks.forEach(link => {
    link.addEventListener('click', () => {
        smoothScrollToLink(link, 100);
        showAndHideMenu();
    })
});

// Open more client
const moreClientButton = document.querySelector('.more-client__btn');
const moreClients = document.querySelectorAll('.more-client__item');

let isOpenMoreClient = false;

function showMoreClient() {
    if(
        !isOpenMoreClient &&
        moreClients
    ) {
        moreClientButton.classList.add('more-client__btn--disabled');
        moreClients.forEach(client => {
            client.classList.add('more-client__item--activate');
        });
    }
};

moreClientButton.onclick = showMoreClient;


// Open and close Modals

const modalMessage = new Modal('.modal-msg');

modalMessage.$popup.addEventListener('click', (e) => {
    if(
        e.target.matches('.msg__close') ||
        !e.target.closest('.msg')
    ) {
        modalMessage.hide()
    }
});

const modalForm = new ModalWithForm('.modal-form', '.form__input');

const modalFormOpen = document.querySelector('.talk__btn');

modalFormOpen.addEventListener('click', () => {
    if(modalForm) {
        modalForm.show();
        modalForm.clearInputs();
    }
});

modalForm.$popup.addEventListener('click', (e) => {
    if(
        e.target.matches('.form__close') ||
        !e.target.closest('.form')
    ) {
        e.preventDefault();
        modalForm.hide();
    }
})

// Validation form

modalForm.$inputs.forEach(input => {
    input.addEventListener('blur', (e) => {
        validate(e.target, patterns[e.target.attributes.name.value])
    })
})
    
// Submit form

const urlForForm = 'https://d-element-databse-default-rtdb.europe-west1.firebasedatabase.app/userform.json';

const formFromModal = document.querySelector('.form');
const nameField = document.querySelector('.form__name');
const emailField = document.querySelector('.form__email');
const messageField = document.querySelector('.form__message');
const textModalMessage = document.querySelector('.msg__title');
    
formFromModal.addEventListener('submit', (e) => {
    e.preventDefault();
    if(
        nameField.classList.contains('valid') &&
        emailField.classList.contains('valid') &&
        messageField.classList.contains('valid')
    ) {
        submit(urlForForm, formFromModal)
            .then(() => {
                textModalMessage.innerHTML = 'Your message successfully sent'
                modalForm.hide()
                modalMessage.show()
            })
            .catch(() => {
                textModalMessage.innerHTML = 'Error posting form, expected later'
                modalForm.hide()
                modalMessage.show()
            })
    } else {
        modalForm.validateInputs();
    }
})