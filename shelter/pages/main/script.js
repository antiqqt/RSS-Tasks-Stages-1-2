'use strict';

/*
 ** WEEK 1
 */

// Make button on 'Start screen' section
// lead to the 'Our friends' section
const sectionStartBtn = document.querySelector('.section--start__button');

sectionStartBtn.addEventListener('click', (e) => {
  window.location.replace('#our-friends');
});

// Make button on 'Our friends' section
// lead to the '/pets' page
const sectionFriendsBtn = document.querySelector('.section--friends__button');

sectionFriendsBtn.addEventListener('click', (e) => {
  window.location.assign('../pets');
});

/*
 ** WEEK 3
 */

// SIDEBAR

// Elements
const sideBar = document.querySelector('.nav--sidebar');
const burgerBtn = document.querySelector('.burger');
const navLinks = document.querySelectorAll('.nav__link');
const sidebarOverlay = document.querySelector('.overlay--sidebar');
const headerLogo = document.querySelector('.header__logo');
const body = document.querySelector('.body');

// Listeners
burgerBtn.addEventListener('click', toggleSidebar);
burgerBtn.addEventListener('click', toggleBurger);
burgerBtn.addEventListener('click', toggleHeaderLogo);
burgerBtn.addEventListener('click', toggleSidebarOverlay);
burgerBtn.addEventListener('click', toggleScrollOnBody);

navLinks.forEach((elem) => {
  elem.addEventListener('click', closeSidebar);
  elem.addEventListener('click', closeBurger);
  elem.addEventListener('click', displayHeaderLogo);
  elem.addEventListener('click', closeSidebarOverlay);
  elem.addEventListener('click', enableScrollOnBody);
});

sidebarOverlay.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeBurger);
sidebarOverlay.addEventListener('click', displayHeaderLogo);
sidebarOverlay.addEventListener('click', closeSidebarOverlay);
sidebarOverlay.addEventListener('click', enableScrollOnBody);

// Sidebar menu
function toggleSidebar() {
  sideBar.classList.toggle('nav--sidebar--active');
}

function closeSidebar() {
  sideBar.classList.remove('nav--sidebar--active');
}

// Burger button
function toggleBurger() {
  burgerBtn.classList.toggle('burger--active');
}

function closeBurger() {
  burgerBtn.classList.remove('burger--active');
}

// Logos
function toggleHeaderLogo() {
  headerLogo.classList.toggle('logo--hidden');
}

function displayHeaderLogo() {
  headerLogo.classList.remove('logo--hidden');
}

// Sidebar overlay blackout
function toggleSidebarOverlay() {
  sidebarOverlay.classList.toggle('overlay--active');
}

function closeSidebarOverlay() {
  sidebarOverlay.classList.remove('overlay--active');
}

// Scroll
function toggleScrollOnBody() {
  body.classList.toggle('body--scroll-disabled');
}

function enableScrollOnBody() {
  body.classList.remove('body--scroll-disabled');
}

// POPUP WINDOW
import petsData from '../../assets/pets-data/pets-data.js';

const cardContainer = document.querySelector('.slider__container');
cardContainer.addEventListener('click', handlePopup);

const popupOverlay = document.querySelector('.overlay--popup');
popupOverlay.addEventListener('click', closePopupOverlay);
popupOverlay.addEventListener('click', enableScrollOnBody);
popupOverlay.addEventListener('click', removePopup);
popupOverlay.addEventListener('mouseenter', hoverOnPopupBtn);
popupOverlay.addEventListener('mouseleave', removeHoverOnPopupBtn);

let popup;

function handlePopup(event) {
  // Get card that was clicked on
  // and its id
  const card = event.target.closest('.card');
  if (!card) return;

  const cardId = Number(card.dataset.id);

  // Generate popup block
  popup = generatePopup(cardId);

  toggleScrollOnBody();
  togglePopupOverlay();
  openPopup();
}

function generatePopup(id) {
  // Get data from json
  const petData = petsData[id];

  // Create popup image
  const popupImage = generatePopupImage(petData);

  // Create popup content
  const popupContent = generatePopupContent(petData);

  // Create popup button
  const popupBtn = generatePopupBtn();

  // Create popup window
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.append(popupImage, popupContent, popupBtn);

  return popup;
}

function generatePopupImage(petData) {
  const img = document.createElement('img');

  img.classList.add('popup__img');
  img.src = petData.img;
  img.alt = petData.breed;

  return img;
}

function generatePopupContent(petData) {
  // Name
  const petName = document.createElement('p');
  petName.classList.add('heading');
  petName.classList.add('heading--h3');
  petName.classList.add('content__name');
  petName.innerText = petData.name;

  // Type
  const petType = document.createElement('p');
  petType.classList.add('heading');
  petType.classList.add('heading--h4');
  petType.classList.add('content__type');
  petType.innerText = `${petData.type} - ${petData.breed}`;

  // Description
  const petDescription = document.createElement('p');
  petDescription.classList.add('content__description');
  petDescription.innerText = petData.description;

  // Features
  const petFeatures = generatePetFeatures(petData);

  // Put together
  const content = document.createElement('div');
  content.classList.add('content');
  content.classList.add('popup__content');

  content.append(petName, petType, petDescription, petFeatures);

  return content;
}

function generatePetFeatures(petData) {
  const age = generatePetFeatureItem(petData, 'age');
  const inoculations = generatePetFeatureItem(petData, 'inoculations');
  const diseases = generatePetFeatureItem(petData, 'diseases');
  const parasites = generatePetFeatureItem(petData, 'parasites');

  // Put together
  const list = document.createElement('ul');
  list.classList.add('list');
  list.classList.add('content__list');

  list.append(age, inoculations, diseases, parasites);

  return list;
}

function generatePetFeatureItem(petData, attrName) {
  // Create heading
  const itemHeading = document.createElement('em');
  itemHeading.classList.add('heading');
  itemHeading.classList.add('heading--h5-modal-window');
  itemHeading.classList.add('list__key');
  itemHeading.innerText = `${attrName}:`;

  // Make sure information is joined with ', '
  // if it contains more than 1 word;
  let itemData = petData[attrName];
  if (Array.isArray(itemData) && itemData.length > 0) {
    itemData = itemData.join(', ');
  }

  // Create item
  const item = document.createElement('li');
  item.classList.add('list__item');
  item.innerText = ' ' + itemData;
  item.prepend(itemHeading);

  return item;
}

function generatePopupBtn() {
  const popupBtnCross = document.createElement('div');
  popupBtnCross.classList.add('popup__cross');

  const popupBtn = document.createElement('button');
  popupBtn.classList.add('button');
  popupBtn.classList.add('popup__button');
  popupBtn.append(popupBtnCross);

  popupBtn.addEventListener('click', removePopup);
  popupBtn.addEventListener('click', closePopupOverlay);
  popupBtn.addEventListener('click', enableScrollOnBody);

  return popupBtn;
}

function togglePopupOverlay() {
  popupOverlay.classList.toggle('overlay--active');
}

function closePopupOverlay() {
  popupOverlay.classList.remove('overlay--active');
}

function openPopup() {
  body.append(popup);
}

function removePopup() {
  document.querySelector('.popup').remove();
}

function hoverOnPopupBtn() {
  const popupBtn = document.querySelector('.popup__button');
  popupBtn.classList.add('popup__button--hover');
}

function removeHoverOnPopupBtn() {
  const popupBtn = document.querySelector('.popup__button');

  if (popupBtn) {
    popupBtn.classList.remove('popup__button--hover');
  }
}



// SLIDER
const sliderBtnLeft = document.querySelector('.slider__button--left');
const sliderBtnRight = document.querySelector('.slider__button--right');
const carousel = document.querySelector('.slider__carousel');
const sliderItemLeft = document.querySelector('.slider__item--left');
const sliderItemRight = document.querySelector('.slider__item--right');
const sliderItemActive = document.querySelector('.slider__item--active');

setupSlider();
sliderBtnLeft.addEventListener('click', carouselMoveLeft);
sliderBtnRight.addEventListener('click', carouselMoveRight);
carousel.addEventListener('animationend', carouselReloadAnimation);

function carouselMoveLeft(event) {
  // Play animation
  carousel.classList.add('slider__carousel--transition-left');

  // Disable buttons until end of animation
  carouselDisableBtns();
}

function carouselMoveRight() {
  // Play animation
  carousel.classList.add('slider__carousel--transition-right');

  // Disable buttons until end of animation
  carouselDisableBtns();
}

function carouselReloadAnimation(e) {
  let sideItem, oppositeSideItem;


  if (e.animationName.includes('left')) {
    // Remove animation class
    carousel.classList.remove('slider__carousel--transition-left');

    sideItem = sliderItemLeft;
    oppositeSideItem = sliderItemRight;
  } else {
    // Remove animation class
    carousel.classList.remove('slider__carousel--transition-right');

    sideItem = sliderItemRight;
    oppositeSideItem = sliderItemLeft;
  }

  // Swap side and active elements
  const activeItem = document.querySelector('.slider__item--active');
  const newActiveItem = createNewActiveItem(activeItem, sideItem);
  const newIds = [...newActiveItem.children].map((e) => Number(e.dataset.id));
  activeItem.replaceWith(newActiveItem);

  // Generate new cards
  reshuffleCards(sideItem);
  reshuffleCards(oppositeSideItem, newIds);

  // Enable buttons again
  carouselEnableBtns();
}

function reshuffleCards(item, usedIds = []) {
  // Limit reshuffling based on ids in given array
  if (usedIds.length === 0) {
    // or based on ids of existing cards in block (default)
    Array.from(item.children).forEach((card) => {
      usedIds.push(Number(card.dataset.id));
    });
  }
  // console.log(usedIds);

  // Clear block
  item.innerHTML = '';

  // Generate new cards in it
  for (let i = 0; i < 3; i++) {
    let newId = getPseudoRandomNumber(0, 7, usedIds);
    let newCard = generateCard(newId);

    item.append(newCard);
  }
}

function createNewActiveItem(target, source) {
  const targetClasses = target.className;

  target = source.cloneNode(true);
  target.className = targetClasses;

  return target;
}

function getPseudoRandomNumber(min, max, exceptions) {
  let set = new Set(exceptions);
  let num = getRandomNumberMaxInclusive(min, max);

  while (set.has(num)) {
    num = getRandomNumberMaxInclusive(min, max);
  }

  // Add new exception to usedIds
  exceptions.push(num);

  return num;
}

function getRandomNumberMaxInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCard(id) {
  const petData = petsData[id];

  // Create card
  const card = document.createElement('div');
  card.className = 'card slider__card';
  card.dataset.id = String(id);

  // Create img
  const img = document.createElement('img');
  img.className = 'card__img';
  img.src = petData.img;
  img.alt = petData.breed;

  // Create heading
  const heading = document.createElement('p');
  heading.className = 'card__heading';
  heading.innerText = petData.name;

  // Create button
  const btn = document.createElement('button');
  btn.className = 'button button--secondary';
  btn.innerText = 'Learn more';

  // Put together
  card.append(img, heading, btn);

  return card;
}

function carouselDisableBtns() {
  sliderBtnLeft.removeEventListener('click', carouselMoveLeft);
  sliderBtnRight.removeEventListener('click', carouselMoveRight);
}

function carouselEnableBtns() {
  sliderBtnLeft.addEventListener('click', carouselMoveLeft);
  sliderBtnRight.addEventListener('click', carouselMoveRight);
}

function setupSlider() {
  let usedIds = [ , , ];
  reshuffleCards(sliderItemActive, usedIds);
  reshuffleCards(sliderItemLeft, [...usedIds]);
  reshuffleCards(sliderItemRight, [...usedIds]);
}