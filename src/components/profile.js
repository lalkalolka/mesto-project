import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId, popupChangeAvatar, avatarPen, buttonSaveNewAvatar, inputAvatarUrl, formChangeAvatar} from './constants'
import {openPopup, closePopup, renderLoading} from './utils'
import {elements, template, createCards, addCard} from './card'
import {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer, sendNewAvatar} from './api'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {closeByEscape, renderFirstCards} from '../index'

// Функция для редактирования полей профиля "имя" и "вид деятельности" и отправки данных на сервер
function submitEditProfileForm(evt) {
    renderLoading(true, submitButton, 'Сохранить')
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    sendProfileInformation(nameProfile.textContent, jobProfile.textContent)
        .finally(() => {
            renderLoading(false, submitButton, 'Сохранить')
        })
    closePopup(popupEditProfile, formEditProfile);
}

// Загрузка данных профиля с сервера
getProfileInformation()

function getProfileInformation() {
    requestProfileData()
        .then(res => res.json())
        .then((res) => {
            setProfileInformation(res.name, res.about, res.avatar);
        });
}

function setProfileInformation(name, about, image) {
    nameProfile.textContent = name;
    jobProfile.textContent = about;
    avatar.setAttribute('style', `background-image: url(${image})`);
}

// Функция изменения аватара

function changeAvatar(url, image) {
    renderLoading(true, buttonSaveNewAvatar, 'Сохранить');
    avatar.setAttribute('style', `background-image: url(${image})`);
    sendNewAvatar(url)
        .finally(() => {
            renderLoading(false, buttonSaveNewAvatar, 'Сохранить')
          })
    closePopup(popupChangeAvatar, formChangeAvatar);
}


export {submitEditProfileForm, getProfileInformation, setProfileInformation, changeAvatar}