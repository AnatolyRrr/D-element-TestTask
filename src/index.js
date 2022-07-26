import './styles/style.scss';

const moreClientButton = document.querySelector('.more-client__btn');
const moreClients = document.querySelectorAll('.more-client__item');

const showMoreClient = () => {
    moreClientButton.classList.toggle('more-client__btn--disabled');
    for(let moreClient of moreClients) {
        moreClient.classList.toggle('more-client__item--activate');
    };
};

moreClientButton.onclick = showMoreClient;
