import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId, popupChangeAvatar, avatarPen, buttonSaveNewAvatar, inputAvatarUrl, formChangeAvatar, buttonAddCard} from './constants'
import {openPopup, closePopup, renderLoading} from './utils'
import {submitEditProfileForm, getProfileInformation, setProfileInformation} from './profile'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {getFirstCards, requestProfileData, sendProfileInformation, sendCard, deleteCardById, sendLikeToServer, deleteLikeFromServer} from './api'
import {closeByEscape, renderFirstCards} from '../index'

// Добавление карточек
// Переменные для функции с добавлением карточек
const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;


// Функции создания и возвращения карточки
function createCards(name, link, ownerId, cardId, likes) {
    const element = template.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    const caption = element.querySelector('.element__caption');
    const trash = element.querySelector('.element__delete-button');
    const like = element.querySelector('.element__like');
    const likeCounter = element.querySelector('.element__count');
    likeCounter.textContent = likes.length;
    
    caption.textContent = name;
    image.setAttribute('src', link);
    image.setAttribute('alt', name);


    // Удаление карточек
    trash.addEventListener('click', (evt) => {
        const clickTarget = evt.target;
        const removedCard = clickTarget.closest('.element');
        removedCard.remove();
        deleteCardById(cardId)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status);
        })
        .then(res => {
            console.log('Данные карточки удалены с сервера')
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`)
        })
    })

    function deleteOnlyMyCards(ownerId) {
        if (ownerId != myId) {
            trash.setAttribute('style', 'display: none')
        } else {
            trash.removeAttribute('style', 'display: none')
        }
    }
    deleteOnlyMyCards(ownerId)


    // Лайки
    // Функция, которая проверяет, на каких карточках стоят мои лайки
    function checkLikes() {
        if (likes.some(id => id._id === myId)) {
            like.classList.add('element__like_active');
        }
    }
    checkLikes()

    like.addEventListener('click', function(event) {
        if (event.target.classList.contains('element__like_active')) {
            likeCounter.textContent = --likeCounter.textContent;
            event.target.classList.remove('element__like_active');
            deleteLikeFromServer(cardId)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(res.status);
                })
                .then(res => {
                    console.log('Данные о снятии лайка загружены на сервер')
                })
                .catch(err => {
                    console.log(`Ошибка: ${err}`)
                })
        } else {
            likeCounter.textContent = ++likeCounter.textContent;
            event.target.classList.add('element__like_active');
            sendLikeToServer(cardId)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(res.status);
                })
                .then(res => {
                    console.log('Данные о постановке лайка загружены на сервер')
                })
                .catch(err => {
                    console.log(`Ошибка: ${err}`)
                })
        }
    })

    // Открытие попапа с картинкой
    function getImage() {
        bigImage.src = image.src;
        bigImage.alt = name;
        bigImageDescription.textContent = caption.textContent;
        openPopup(popupImage)
    }

    image.addEventListener('click', getImage)

    return element
}


function addCard(name, link, ownerId, cardId, likes) {
    elements.prepend(createCards(name, link, ownerId, cardId, likes));
}

// Функция загрузки новой карточки на сервер и одновременнного добавления в верстку
function renderCard(evt) {
    evt.preventDefault();

    renderLoading(true, buttonAddCard, 'Создать')

    sendCard(inputCardName.value, inputCardLink.value)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(res.status);
        })
        .then(res => {
            console.log('Данные новой карточки загружены на сервер')
            addCard(inputCardName.value, inputCardLink.value, res.owner._id, res._id, res.likes)
            closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false, buttonAddCard, 'Создать');
        });
}

export {elements, template, createCards, addCard, renderCard}