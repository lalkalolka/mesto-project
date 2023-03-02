import {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard} from './constants'
import {openPopup, closePopup} from './utils'
import {submitEditProfileForm} from './profile'
import {showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, resetValidation} from './validation'
import {closeByEscape, sendProfileInformation, sendCard} from '../index'

// Добавление карточек
// Переменные для функции с добавлением карточек
const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;

// Добавление карточек

function createCards(name, link, forTrash) {
    const element = template.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    const caption = element.querySelector('.element__caption');
    const trash = element.querySelector('.element__delete-button')
    
    caption.textContent = name;
    image.setAttribute('src', link);
    image.setAttribute('alt', name);


// Удаление карточек

    element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        openPopup(popupDeleteCard)
        // const clickTarget = evt.target;
        // const removedCard = clickTarget.closest('.element');
        // removedCard.remove();
    })

    function deleteOnlyMyCards(ownerId) {
        if (ownerId) {
            trash.setAttribute('style', 'display: none')
        } else {
            trash.removeAttribute('style', 'display: none')
        }
    }
    deleteOnlyMyCards(forTrash) //возможно корзина удаляется у всех картинок, потому что айди один (вроде нет), возможно функция криво написана



// Лайки
    element.querySelector('.element__like').addEventListener('click', function(event) {
        event.target.classList.toggle('element__like_active')
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


function addCard(name, link) {
    elements.prepend(createCards(name, link));
}

export {
    elements,
    template,
    createCards,
    addCard,
}