import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId, buttonSaveNewAvatar, inputAvatarUrl} from './constants'
import {openPopup, closePopup} from './utils'
import {submitEditProfileForm, getProfileInformation, setProfileInformation} from './profile'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {elements, template, createCards, addCard} from './card'
import {closeByEscape, renderFirstCards} from '../index'


// Запрос данных о всех карточках
function getFirstCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12'
        }
    })
}

// Запрос данных о пользователе с сервера
function requestProfileData() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12'
        }
    })
}

// Запрос на отправку данных профиля на сервер
function sendProfileInformation(profileName, profileAbout) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileName,
            about: profileAbout
          })
    })
}

// Запрос на загрузку карточки на сервер
function sendCard(cardName, cardLink) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
        method: 'POST',
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
          })
    })
}

// Запрос на удаление карточки с сервера
function deleteCardById(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12',
            'Content-Type': 'application/json'
        },
    })
}

// Запрос на загрузку лайков на сервер
function sendLikeToServer(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12',
            'Content-Type': 'application/json'
        },
    })
}

// Запрос на удаление лайка с сервера
function deleteLikeFromServer(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12',
            'Content-Type': 'application/json'
        },
    })
}

// Запрос на загрузку аватара на сервер
function sendNewAvatar(url) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: url
          })
    })
}

export {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer, sendNewAvatar}