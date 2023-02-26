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
    currentValidation
} from './components/validation'


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
    document.querySelector('#formEditProfile').reset();
    openPopup(popupEditProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    currentValidation(document.querySelector('#formEditProfile'));
})

function closeByEscape(evt) {
    const openedPopup = document.querySelector('.popup_opened')
    if (evt.key === "Escape") {
        closePopup(openedPopup)
    }
}


// Добавление карточек
buttonOpenPopupAdd.addEventListener('click', function() {
    document.querySelector('#formAddCard').reset();
    currentValidation (document.querySelector('#formAddCard'))
    openPopup(popupAddCard);
})

buttonClosePopupAdd.addEventListener('click', function() {
    closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
})

popupAddCard.addEventListener('click', (evt) => {
    if(evt.target == popupAddCard) {
        closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
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


// Слушатель кнопки "Схоранить" редактирования профиля

formEditProfile.addEventListener('submit', submitEditProfileForm);


// Слушатель кнопки для добавления карточек

formAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
                                  
    addCard(inputCardName.value, inputCardLink.value);
    console.log('ss');
    console.log(inputCardName.value);
    console.log(inputCardLink.value);
    closePopup(popupAddCard, popupAddCard.querySelector('.popup__container'));
})

// Добавление первых шести карточек на страницу

initialCards.forEach(card => {
    elements.prepend(createCards(card.name, card.link));
})


//Валидация форм

enableValidation();

export {closeByEscape}