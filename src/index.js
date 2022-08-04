import './styles/style.scss';

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
            hamburger.classList.remove('header__hamburger--active');
            isOpenMenu = false;
}
    }
};

hamburger.onclick = showAndHideMenu;

// Scroll to elem for Hamburger menu

const headerLinks = document.querySelectorAll('.header__link');

function smoothScrollToLink(link, px) {
    if(link) {
        let scrollToElem = link.getAttribute('href');
      let coordinates = document.querySelector(scrollToElem).offsetTop;
      window.scrollTo({
            top: coordinates - px,
          behavior: 'smooth'
      });
    }
  };

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
const modalButton = document.querySelector('.talk__btn');
const modalForm = document.querySelector('.modal-form');
const modalMessage = document.querySelector('.modal-msg')
const formInputs = document.querySelectorAll('.form__input');
const error = document.querySelector('.form__error');


const showModal = () => {
    modalForm.classList.toggle('modal--active')

    formInputs.forEach(element => {
        element.value = '';
    });

    const nameInput = document.querySelector('.form__name');
    nameInput.focus();
    
    error.classList.remove('form__error--active');
    document.body.style.overflow = 'hidden';
};

const closeModalForm = (e) => {
    if(
        e.target.matches('.form__close') ||
        !e.target.closest('.form')
    ) {
        e.preventDefault();
        modalForm.classList.remove('modal--active');
        document.body.style.overflow = '';
    }
};

const closeModalMessage = (e) => {
    if(
        e.target.matches('.msg__close') ||
        !e.target.closest('.msg')
    ) {
        e.preventDefault();
        modalMessage.classList.remove('modal--active');
        document.body.style.overflow = '';
    }
};

modalButton.onclick = showModal;
modalForm.onclick = closeModalForm;
modalMessage.onclick = closeModalMessage;


// Submit form
const submitButton = document.querySelector('.form__button');
const form = document.querySelector('.form');

const submitForm = async (e) => {
    e.preventDefault()
    const name = document.querySelector('.form__name');
    const meassage = document.querySelector('.form__message');
    const email = document.querySelector('.form__email');

    if(name.value.length && meassage.value.length && email.value.split('').includes('@')) {
        await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'POST',
            body: new FormData(form)
        })
        error.classList.remove('form__error--active');
        modalForm.classList.remove('modal--active');
        modalMessage.classList.add('modal--active');
        document.body.style.overflow = 'hidden';

    }else{
        error.classList.add('form__error--active')
    }
};

submitButton.onclick = submitForm;