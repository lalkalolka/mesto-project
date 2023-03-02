import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings} from './constants'
import {submitEditProfileForm} from './profile'
import {elements, template, createCards, addCard} from './card'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {closeByEscape} from '../index'

// Функции открытия и закрытия модальных окон
// Редактирование профиля
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup, form) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

export {
    openPopup,
    closePopup
}