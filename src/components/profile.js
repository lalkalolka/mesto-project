import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings} from './constants'
import {openPopup, closePopup} from './utils'
import {elements, template, createCards, addCard} from './card'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {closeByEscape, sendProfileInformation, sendCard} from '../index'

// Функция редактирования профиля

function submitEditProfileForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    sendProfileInformation(nameProfile.textContent, jobProfile.textContent)
    closePopup(popupEditProfile, formEditProfile);
}

export {submitEditProfileForm}