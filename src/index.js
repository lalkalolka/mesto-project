import '../src/index.css';
import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard} from './components/constants'
import {openPopup, closePopup} from './components/utils'
import {submitEditProfileForm} from './components/profile'
import {elements, template, createCards, addCard} from './components/card'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './components/validation'


    // Слушатели кнопок открытия и закрытия модальных окон
// Редактирование профиля

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

buttonOpenEditForm.addEventListener('click', function() {
    formEditProfile.reset();
    openPopup(popupEditProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    resetValidation(formEditProfile, settings);
})

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup)
    }
}


// Добавление карточек
buttonOpenPopupAdd.addEventListener('click', function() {
    formAddCard.reset();
    resetValidation(formAddCard, settings)
    openPopup(popupAddCard);
})


// Слушатель кнопки "Схоранить" редактирования профиля

formEditProfile.addEventListener('submit', submitEditProfileForm);


// Слушатель кнопки для добавления карточек

formAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();

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
    sendCard(inputCardName.value, inputCardLink.value)
        .then(res => res.json())
        .then(res => {
            addCard(inputCardName.value, inputCardLink.value, res._id)
        });

    closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
})


//Валидация форм

enableValidation(settings);


export {closeByEscape, sendProfileInformation}


// Данные профиля (имя, занятия, аватар)

function setProfileInformation(name, about, image) {
    nameProfile.textContent = name;
    jobProfile.textContent = about;
    avatar.setAttribute('style', `background-image: url(${image})`)
}

function getProfileInformation() {
    fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12'
        }
    })
        .then(res => res.json())
        .then((res) => {
            setProfileInformation(res.name, res.about, res.avatar);
        });
}

getProfileInformation()


// Загрузка карточек с сервера

function getFirstCards() {
    fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
        headers: {
            authorization: '63290b8c-8e33-4a0d-acdc-df741931be12'
        }
    })
        .then(res => res.json())
        .then(res => {
            res.forEach(el => {
                addCard(el.name, el.link);
                // if (el)
            })
        })
}

getFirstCards()


// Отправка данных профиля на сервер

function sendProfileInformation(profileName, profileAbout) {
    fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
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


// Добавление карточки на сервер


