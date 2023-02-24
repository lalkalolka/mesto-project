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

import {submitEditProfileForm} from './profile'

import {
    elements,
    template,
    formAddCard,
    createCards,
    addCard,
} from './card'

import {
    showInputError,
    hideInputError,
    checkInputValidity,
    setEventListeners,
    enableValidation,
    hasInvalidInput,
    toggleButtonState,
} from './validation'

// Функции открытия и закрытия модальных окон
// Редактирование профиля
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup, form) {
    popup.classList.remove('popup_opened');
    form.reset();
}

export {
    openPopup,
    closePopup
}