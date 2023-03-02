import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar} from './constants'
import {openPopup, closePopup} from './utils'
import {submitEditProfileForm} from './profile'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {elements, template, createCards, addCard} from './card'
import {closeByEscape} from '../index'

// fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
//   headers: {
//     authorization: '63290b8c-8e33-4a0d-acdc-df741931be12'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     return result;
//   });