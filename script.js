    // Открытие и закрытие модальных окон (модального окна с картинкой пока нет)

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

// Переменные для формы с добавлением карточек
const popupAddCard = document.querySelector('#popupAdd');
const inputCardName = document.querySelector('#popubAddInputName');
const inputCardLink = document.querySelector('#popupAddInputImage');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupAdd = document.querySelector('#buttonClosePopupAdd');

// Переменные для добавления попапа с картинкой
const popupImage = document.querySelector('#popup-image');
const bigImage = popupImage.querySelector('.popup-image__image');
const bigImageDescription = popupImage.querySelector('.popup-image__description');
const buttonCloseBigImage = popupImage.querySelector('.popup-image__close-button');


    // Функции открытия и закрытия модальных окон
// Редактирование профиля
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

buttonOpenEditForm.addEventListener('click', function() {
    openPopup(popupEditProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
})

buttonCloseEditForm.addEventListener('click', function() {
    closePopup(popupEditProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
})

// Добавление карточек
buttonOpenPopupAdd.addEventListener('click', function() {
    openPopup(popupAddCard)
})

buttonClosePopupAdd.addEventListener('click', function() {
    closePopup(popupAddCard)
})

// Попап с картинкой
buttonCloseBigImage.addEventListener('click', function() {
    closePopup(popupImage)
})


    // Функция редактирования профиля

function submitEditProfileForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEditProfile)
}

formEditProfile.addEventListener('submit', submitEditProfileForm);


    // Добавление карточек
// Переменные для функции с добавлением карточек
const elements = document.querySelector('.elements');
const template = document.querySelector('#element-template').content;
const formAddCard = popupAddCard.querySelector('.popup__container');

// Добавление карточек

function addCards(name, link) {
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


function createCard(name, link) {
    elements.prepend(addCards(name, link));
}


formAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
                                  
    createCard(inputCardName.value, inputCardLink.value);

    closePopup(popupAddCard)
})

    // Добавление первых шести карточек на страницу

initialCards.forEach(card => {
    elements.prepend(addCards(card.name, card.link));
})