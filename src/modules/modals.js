import {patterns, validate} from './validate';

class Modal {
    constructor(classModal) {
        this.$popup = document.querySelector(classModal)
    }

    show() {
        this.$popup.style.display = 'flex'
        this.$popup.style.justifyContent = 'center'
        document.body.style.overflow = 'hidden'
    }

    hide() {
        this.$popup.style.display = 'none'
        document.body.style.overflow = ''
    }
};

class ModalWithForm extends Modal {
    constructor(classModal, classInputs) {
        super(classModal)
        this.$inputs = document.querySelectorAll(classInputs)
    }

    clearInputs() {
        this.$inputs.forEach(input => {
            input.value = '';
            input.classList.remove('valid', 'invalid')
        })
    }

    validateInputs() {
        this.$inputs.forEach(input => {
            validate(input, patterns[input.attributes.name.value])
        })
    }
};

export {Modal, ModalWithForm};