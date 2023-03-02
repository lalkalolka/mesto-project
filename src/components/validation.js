import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings} from './constants'
import {openPopup, closePopup} from './utils'
import {submitEditProfileForm} from './profile'
import {elements, template, createCards, addCard} from './card'

//Валидация форм

function showInputError(form, inputElement, errorMessage, settings) {
    const error = form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    error.textContent = errorMessage;
}

function hideInputError(form, inputElement) {
    const error = form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    error.textContent = '';
}

function checkInputValidity(form, inputElement) {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    
    if(!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(form, inputElement, settings);
    }
}

function setEventListeners(form, settings) {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(form, inputElement);
            toggleButtonState(inputList, buttonElement, settings)
        })
    })
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach(form => {
        setEventListeners(form, settings);
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

function toggleButtonState(inputList, button, settings) {
    if(hasInvalidInput(inputList)) {
        button.classList.add(settings.inactiveButtonClass);
        button.setAttribute('disabled', 'true');
    } else {
        button.classList.remove(settings.inactiveButtonClass);
        button.removeAttribute('disabled', 'true');
    }
}

function resetValidation (form, settings) {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);

    inputList.forEach(function(inputElement) {
        hideInputError(form, inputElement);
        toggleButtonState(inputList, buttonElement, settings)
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
    resetValidation
}