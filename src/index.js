import '../src/index.css';

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
} from './components/constants'

import {openPopup, closePopup} from './components/utils'

import {submitEditProfileForm} from './components/profile'

import {
    elements,
    template,
    formAddCard,
    createCards,
    addCard,
} from './components/card'

import {
    showInputError,
    hideInputError,
    checkInputValidity,
    setEventListeners,
    enableValidation,
    hasInvalidInput,
    toggleButtonState,
} from './components/validation'


    // Слушатели кнопок открытия и закрытия модальных окон
// Редактирование профиля

buttonOpenEditForm.addEventListener('click', function() {
    openPopup(popupEditProfile);
})

buttonCloseEditForm.addEventListener('click', function() {
    closePopup(popupEditProfile, formEditProfile);
    setEventListeners(formEditProfile);
})

window.addEventListener('keydown', function(evt) {
    if(evt.key === "Escape") {
        closePopup(popupEditProfile, formEditProfile);
        setEventListeners(formEditProfile);
    }
})

popupEditProfile.addEventListener('click', (evt) => {
    if(evt.target === popupEditProfile) {
        closePopup(popupEditProfile, formEditProfile);
        setEventListeners(formEditProfile);
    }
})

// Добавление карточек
buttonOpenPopupAdd.addEventListener('click', function() {
    openPopup(popupAddCard)
})

buttonClosePopupAdd.addEventListener('click', function() {
    closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
    setEventListeners(popupAddCard.querySelector('.popup__container'));
})

window.addEventListener('keydown', function(evt) {
    if(evt.key === "Escape") {
        closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
        setEventListeners(popupAddCard.querySelector('.popup__container'));
    }
})

popupAddCard.addEventListener('click', (evt) => {
    if(evt.target == popupAddCard) {
        closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
        setEventListeners(popupAddCard.querySelector('.popup__container'));
    }
})

// Попап с картинкой
buttonCloseBigImage.addEventListener('click', function() {
    closePopup(popupImage);
})

popupImage.addEventListener('click', function(evt) {
    if(evt.target == popupImage) {
        closePopup(popupImage);
    }
})

window.addEventListener('keydown', function(evt) {
    if(evt.key === "Escape") {
        closePopup(popupImage);
    }
})


// Слушатель кнопки "Схоранить" редактирования профиля

formEditProfile.addEventListener('submit', submitEditProfileForm);


// Слушатель кнопки для добавления карточек

formAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
                                  
    addCard(inputCardName.value, inputCardLink.value);

    closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));

    setEventListeners(popupAddCard.querySelector('.popup__container'))
})

// Добавление первых шести карточек на страницу

initialCards.forEach(card => {
    elements.prepend(createCards(card.name, card.link));
})


//Валидация форм

enableValidation();

console.log(popupEditProfile)