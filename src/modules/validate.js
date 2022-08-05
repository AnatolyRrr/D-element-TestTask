const patterns = {
    name: /^([\s]+)?[a-zа-яА-Я]([-a-zа-яА-Я]+)((\s+[-a-zа-яА-Я]+[a-zа-яА-Я]?){1,2})?([\s]+)?$/i,
    email: /[^.]([-\w\.#$%&'*+\/=?^`{|}~]+)@([a-z\d-]{1,61})\.([a-z]{2,8})(\.[a-z]{2})?/i,
    message: /[a-zа-яА-Я]{2,}/i,
};

function validate(field, regex) {
    if(regex.test(field.value)) {
        field.classList.remove('invalid');
        field.classList.add('valid');

    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }
};

export {patterns, validate};