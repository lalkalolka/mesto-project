    // Открытие и закрытие модальных окон
// Переменные для формы с редактированием информации
const popupEditProfile = document.querySelector('#popupEdit');
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonCloseEditForm = document.querySelector('#button-close-edit-form');
const submitButton = document.querySelector('.popup__button');
const nameInput = document.querySelector('#popupProfileHeading');
const jobInput = document.querySelector('#popupProfileDescription');
const nameProfile = document.querySelector('.profile__heading');
const jobProfile = document.querySelector('.profile__description');
const formEditProfile = popupEditProfile.querySelector('.popup__container');
const avatar = document.querySelector('.profile__image');
const avatarPen = document.querySelector('#avatarPen');

// Переменные для формы с добавлением карточек
const popupAddCard = document.querySelector('#popupAdd');
const formAddCard = document.querySelector('#formAddCard');
const inputCardName = document.querySelector('#popubAddInputName');
const inputCardLink = document.querySelector('#popupAddInputImage');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupAdd = document.querySelector('#buttonClosePopupAdd');
const buttonAddCard = document.querySelector('#buttonCreatePopupAdd')

// Переменные для добавления попапа с картинкой
const popupImage = document.querySelector('#popup-image');
const bigImage = popupImage.querySelector('.popup-image__image');
const bigImageDescription = popupImage.querySelector('.popup-image__description');
const buttonCloseBigImage = popupImage.querySelector('.popup-image__close-button');

// Переменные для попапа с удалением карточки
const popupDeleteCard = document.querySelector('#popupDeleteCard');
const buttonClosePopupDelete = document.querySelector('#buttonClosePopupDelete');
const buttonAcceptDeleteCard = document.querySelector('#buttonAcceptDeleteCard');

// Переменные для попапа для обновления аватара
const popupChangeAvatar = document.querySelector('#popupChangeAvatar');
const inputAvatarUrl = document.querySelector('#inputChangeAvatar');
const buttonSaveNewAvatar = document.querySelector('#buttonCreateChangeAvatar');
const formChangeAvatar = document.querySelector('#formChangeAvatar')

// Мой ID
const myId = '2e60c2fd7d672d5dbf56ea66';

// Валидация
const settings = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_wrong',
    errorClass: 'popup__error_visible',
}


// Массив с начальными карточками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

export {popupEditProfile, buttonOpenEditForm, buttonCloseEditForm, submitButton, nameInput, jobInput, nameProfile, jobProfile, formEditProfile, popupAddCard, formAddCard, inputCardName, inputCardLink, buttonOpenPopupAdd, buttonClosePopupAdd, popupImage, bigImage, bigImageDescription, buttonCloseBigImage, initialCards, settings, avatar, popupDeleteCard, buttonClosePopupDelete, buttonAcceptDeleteCard, myId, popupChangeAvatar, avatarPen, buttonSaveNewAvatar, inputAvatarUrl, formChangeAvatar, buttonAddCard}