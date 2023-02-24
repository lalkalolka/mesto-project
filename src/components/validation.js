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

export {
    showInputError,
    hideInputError,
    checkInputValidity,
    setEventListeners,
    enableValidation,
    hasInvalidInput,
    toggleButtonState,
}