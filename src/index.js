import '../src/pages/index.css';
import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId, popupChangeAvatar, avatarPen, buttonSaveNewAvatar, inputAvatarUrl, formChangeAvatar, buttonAddCard} from './components/constants'
import {openPopup, closePopup, renderLoading, checkResponse} from './components/utils'
import {submitEditProfileForm, getProfileInformation, setProfileInformation, changeAvatar} from './components/profile'
import {elements, template, createCards, addCard, renderCard} from './components/card'
import {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer, sendNewAvatar} from './components/api'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './components/validation'

let userId

// Функция для закрытия всех попапов через крестик и оверлей
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

// Закрытие попапов клавишей Escape
function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup)
    }
}

// Открытие попапа редактирования профиля
buttonOpenEditForm.addEventListener('click', function() {
    formEditProfile.reset();
    openPopup(popupEditProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    resetValidation(formEditProfile, settings);
})

// Открытие попапа для добавления карточек
buttonOpenPopupAdd.addEventListener('click', function() {
    formAddCard.reset();
    resetValidation(formAddCard, settings)
    openPopup(popupAddCard);
})

// Слушатель кнопки "Схоранить" редактирования профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Слушатель кнопки для добавления карточек
formAddCard.addEventListener('submit', renderCard)

// Включение валидации
enableValidation(settings);

// Загрузка данных профиля и карточек с сервера

Promise.all([requestProfileData(), getFirstCards()])
    .then(([userData, cards]) => {
        console.log('Данные профиля загружены с сервера')
        userId = userData._id;
        nameProfile.textContent = userData.name;
        jobProfile.textContent = userData.about;
        avatar.setAttribute('style', `background-image: url(${userData.avatar})`);
        console.log('Данные карточек загружены с сервера');
        cards.forEach(el => {
            addCard(el.name, el.link, el.owner._id, el._id, el.likes);
        })
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`)
    })

// Открытие попапа с аватаром
avatar.addEventListener('click', function() {
    formChangeAvatar.reset();
    resetValidation(formChangeAvatar, settings)
    openPopup(popupChangeAvatar);
})

avatar.addEventListener('mouseover', function() {
    avatarPen.classList.add('profile__image-pen_opened')
})

avatar.addEventListener('mouseout', function() {
    avatarPen.classList.remove('profile__image-pen_opened')
})

// Кнопка "Сохранить" формы изменения аватара
formChangeAvatar.addEventListener('submit', function(evt) {
    evt.preventDefault();
    changeAvatar(inputAvatarUrl.value);
})

export {closeByEscape, userId}