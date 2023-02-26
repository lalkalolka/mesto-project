import {
    popupEditProfile, 
    buttonOpenEditForm, 
    buttonCloseEditForm, 
    submitButton, 
    nameInput, 
    jobInput, 
    nameProfile, 
    jobProfile, 
    formEditProfile, 
    popupAddCard,
    inputCardName,
    inputCardLink,
    buttonOpenPopupAdd,
    buttonClosePopupAdd,
    popupImage,
    bigImage,
    bigImageDescription,
    buttonCloseBigImage,
    initialCards
} from './constants'

import {openPopup, closePopup} from './utils'

import {submitEditProfileForm} from './profile'

import {
    elements,
    template,
    formAddCard,
    createCards,
    addCard,
} from './card'

//Валидация форм

function showInputError(form, inputElement, errorMessage) {
    const error = form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__field_wrong');

    // Михаил, приветствую! Благодарю за развернутые комментарии и примеры кода.
    // Такой подробной обратной связи от ревьюера я еще не получал
    // Я все замечания постарался учесть и устранить указанные Вами недочеты

    // Однако я не совсем понял Ваш комментарий к строке 40 файла validation.js, в котором Вы указываете следующее:
    // "Все строки-селекторы для валидации нужно брать только из объекта валидации, 
    // который передается в вызов каждой функции, начиная с enableValidation(settings), 
    // далее передается в setEventListeners(formElement, settings) и так далее. 
    // Это делается для того, чтобы можно было одним движением изменить селекторы в одном месте, 
    // а не искать их по всему коду, изменяя каждую строку-селектор".

    // Я не могу понять, что имеется в виду под формулировкой "строка-селектор" и поэтому не смог устранить указанную Вами ошибку. 
    // В моем случае в функция showInputError отвечает за отображение ошибки и подчеркивание красным цветом соответствующего инпута.
    // Данная функция вторым параметром принимает инпут, доступ к которому я получаю сначала из перебора коллекции форм внутри
    // функции enableValidation, из которой соответствующая форма затем передается в функцию setEventListeners, внутри которой
    // также перебирается коллекция инпутов внутри соответствующей формы. Далее инпут проходит проверку на валидность внутри функции checkInputValidity,
    // после чего передается в качестве второго праметра функции showInputError, если валидация не пройдена

    // Если валидация не пройдена, то соответствующему инпуту присваивается класс "popup__field_wrong", который отвечает за подсвечивание 
    // инпута с ошибкой красным цветом

    // Таким образом, на мой взгляд мы можем менять соответствующие селекторы внутри функций showInputError и hideInputError и не искать
    // их по всему коду

    // Михаил, если я неправильно рассуждаю или если суть Вашего комментария касается совершенно иных вещей, напишите пожалуйста немного подробнее
    // Заранее признателен!

    error.textContent = errorMessage;
}

function hideInputError(form, inputElement) {
    const error = form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__field_wrong');
    error.textContent = '';
}

function checkInputValidity(form, inputElement) {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    
    if(!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(form, inputElement);
    }
}

function setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__field'));
    const buttonElement = form.querySelector('.popup__button');
    
    toggleButtonState(inputList, buttonElement);

    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(form, inputElement);
            toggleButtonState(inputList, buttonElement)
        })
    })
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__container'));

    formList.forEach(form => {
        setEventListeners(form);
    })
}

function hasInvalidInput(inputList) {
    if(inputList.some(function(inputElement) {
        return !inputElement.validity.valid
    })) {
        return true
    } else {
        return false
    }
}

function toggleButtonState(inputList, button) {
    if(hasInvalidInput(inputList)) {
        button.classList.add('popup__button_disabled');
        button.setAttribute('disabled', 'true');
    } else {
        button.classList.remove('popup__button_disabled');
        button.removeAttribute('disabled', 'true');
    }
}

function currentValidation (form) {
    const inputList = Array.from(form.querySelectorAll('.popup__field'));
    const buttonElement = form.querySelector('.popup__button');

    inputList.forEach(function(inputElement) {
        checkInputValidity(form, inputElement);
        toggleButtonState(inputList, buttonElement)
    })
}

export {
    showInputError,
    hideInputError,
    checkInputValidity,
    setEventListeners,
    enableValidation,
    hasInvalidInput,
    toggleButtonState,
    currentValidation
}