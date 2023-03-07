import {checkResponse} from './utils'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
    headers: {
      authorization: '63290b8c-8e33-4a0d-acdc-df741931be12',
      'Content-Type': 'application/json'
    }
}

// Запрос данных о пользователе с сервера

function requestProfileData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponse)
}

// Запрос данных о карточках с сервера
function getFirstCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse)
}

// Запрос на отправку данных профиля на сервер
function sendProfileInformation(profileName, profileAbout) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileAbout
          })
    })
    .then(checkResponse)
}

// Запрос на загрузку карточки на сервер
function sendCard(cardName, cardLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
          })
    })
    .then(checkResponse)
}

// Запрос на удаление карточки с сервера
function deleteCardById(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(checkResponse)
}

// Запрос на загрузку лайков на сервер
function sendLikeToServer(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(checkResponse)
}

// Запрос на удаление лайка с сервера
function deleteLikeFromServer(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(checkResponse)
}

// Запрос на загрузку аватара на сервер
function sendNewAvatar(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
          })
    })
    .then(checkResponse)
}

export {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer, sendNewAvatar}