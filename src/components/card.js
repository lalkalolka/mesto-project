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


// Функция создания и возвращения карточки
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
        openPopup(popupDeleteCard)
        buttonAcceptDeleteCard.addEventListener('click', function() {
            removedCard.remove();
            closePopup(popupDeleteCard);
            deleteCardById(cardId)
            .catch((err) => {
                console.log(err);
            })
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
                .then(res => res.json())
                .then(res => console.log(res))
                .catch((err) => {
                    console.log(err);
                })
        } else {
            likeCounter.textContent = ++likeCounter.textContent;
            event.target.classList.add('element__like_active');
            sendLikeToServer(cardId)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch((err) => {
                    console.log(err);
                });
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

export {elements, template, createCards, addCard}