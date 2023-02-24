import {
    popupEditProfile, 
    buttonOpenEditForm, 
    buttonCloseEditForm, 
    submitButton, 
    nameInput, 
    jobInput, 
    nameProfile, 
    jobProfile, 
    formEditProfile, 
    popupAddCard,
    inputCardName,
    inputCardLink,
    buttonOpenPopupAdd,
    buttonClosePopupAdd,
    popupImage,
    bigImage,
    bigImageDescription,
    buttonCloseBigImage,
    initialCards
} from './constants'

import {openPopup, closePopup} from './utils'

import {submitEditProfileForm} from './profile'

import {
    showInputError,
    hideInputError,
    checkInputValidity,
    setEventListeners,
    enableValidation,
    hasInvalidInput,
    toggleButtonState,
} from './validation'

// Добавление карточек
// Переменные для функции с добавлением карточек
const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;
const formAddCard = popupAddCard.querySelector('.popup__container');

// Добавление карточек

function createCards(name, link) {
    const element = template.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    const caption = element.querySelector('.element__caption');
    
    caption.textContent = name;
    image.setAttribute('src', link);
    image.setAttribute('alt', name);


// Удаление карточек

    element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        const clickTarget = evt.target;
        const removedCard = clickTarget.closest('.element');
        removedCard.remove();
    })


// Лайки
    element.querySelector('.element__like').addEventListener('click', function(event) {
        event.target.classList.toggle('element__like_active')
    })


// Открытие попапа с картинкой
    function getImage(event) {
        const smallImage = event.target;
        bigImage.src = image.src;
        bigImage.alt = name;
        bigImageDescription.textContent = caption.textContent;
        openPopup(popupImage)
    }

    image.addEventListener('click', getImage)


    return element
}


function addCard(name, link) {
    elements.prepend(createCards(name, link));
}

export {
    elements,
    template,
    formAddCard,
    createCards,
    addCard,
}