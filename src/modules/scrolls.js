export function smoothScrollToLink(link, px) {
    if(link) {
        let scrollToElem = link.getAttribute('href');
        let coordinates = document.querySelector(scrollToElem).offsetTop;
        window.scrollTo({
            top: coordinates - px,
            behavior: 'smooth'
        });
    }
};