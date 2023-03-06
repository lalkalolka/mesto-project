import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId, popupChangeAvatar, avatarPen, buttonSaveNewAvatar, inputAvatarUrl, formChangeAvatar} from './constants'
import {openPopup, closePopup, renderLoading, checkResponse} from './utils'
import {elements, template, createCards, addCard} from './card'
import {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer, sendNewAvatar} from './api'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {closeByEscape, renderFirstCards} from '../index'


// Функция для редактирования полей профиля "имя" и "вид деятельности" и отправки данных на сервер
function submitEditProfileForm(evt) {
    renderLoading(true, submitButton, 'Сохранить')
    evt.preventDefault();
    sendProfileInformation(nameProfile.textContent, jobProfile.textContent)
        .then(() => {
            nameProfile.textContent = nameInput.value;
            jobProfile.textContent = jobInput.value;
            console.log('Новые данные профиля отправлены на сервер')
            closePopup(popupEditProfile);
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
    sendNewAvatar(url)
        .then(() => {
            console.log('Данные о новом аватаре загружены на сервер');
            avatar.setAttribute('style', `background-image: url(${url})`);
            closePopup(popupChangeAvatar, formChangeAvatar);
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false, buttonSaveNewAvatar, 'Сохранить')
          })
}


export {submitEditProfileForm, changeAvatar}