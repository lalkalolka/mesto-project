import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId} from './constants'
import {submitEditProfileForm, getProfileInformation, setProfileInformation} from './profile'
import {elements, template, createCards, addCard} from './card'
import {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer} from './api'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {closeByEscape, renderFirstCards} from '../index'

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

function renderLoading(isLoading, button, startingValue) {
    if(isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = startingValue
    }
}

export {openPopup, closePopup, renderLoading}