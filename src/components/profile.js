import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId, popupChangeAvatar, avatarPen, buttonSaveNewAvatar, inputAvatarUrl, formChangeAvatar} from './constants'
import {openPopup, closePopup, renderLoading} from './utils'
import {elements, template, createCards, addCard} from './card'
import {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer, sendNewAvatar} from './api'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {closeByEscape, renderFirstCards} from '../index'

// Загрузка данных профиля с сервера
getProfileInformation()

function getProfileInformation() {
    requestProfileData()
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status);
        })
        .then(res => {
            console.log('Данные профиля загружены с сервера')
            setProfileInformation(res.name, res.about, res.avatar)
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`)
        })
}

function setProfileInformation(name, about, image) {
    nameProfile.textContent = name;
    jobProfile.textContent = about;
    avatar.setAttribute('style', `background-image: url(${image})`);
}

// Функция для редактирования полей профиля "имя" и "вид деятельности" и отправки данных на сервер
function submitEditProfileForm(evt) {
    renderLoading(true, submitButton, 'Сохранить')
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    sendProfileInformation(nameProfile.textContent, jobProfile.textContent)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status);
        })
        .then(res => {
            console.log('Новые данные профиля отправлены на сервер')
            closePopup(popupEditProfile, formEditProfile);
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false, submitButton, 'Сохранить')
        })
}

// Функция изменения аватара

function changeAvatar(url) {
    renderLoading(true, buttonSaveNewAvatar, 'Сохранить');
    avatar.setAttribute('style', `background-image: url(${url})`);
    sendNewAvatar(url)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status);
        })
        .then(res => {
            console.log('Данные о новом аватаре загружены на сервер')
            closePopup(popupChangeAvatar, formChangeAvatar);
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false, buttonSaveNewAvatar, 'Сохранить')
          })
}


export {submitEditProfileForm, getProfileInformation, setProfileInformation, changeAvatar}