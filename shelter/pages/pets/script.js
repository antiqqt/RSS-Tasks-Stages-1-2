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
const header = document.querySelector('.header');

// Listeners
burgerBtn.addEventListener('click', toggleSidebar);
burgerBtn.addEventListener('click', toggleBurger);
burgerBtn.addEventListener('click', toggleHeaderLogo);
burgerBtn.addEventListener('click', toggleSidebarOverlay);
burgerBtn.addEventListener('click', toggleScrollOnBody);
burgerBtn.addEventListener('click', toggleHeaderPosition);

navLinks.forEach((elem) => {
  elem.addEventListener('click', closeSidebar);
  elem.addEventListener('click', closeBurger);
  elem.addEventListener('click', displayHeaderLogo);
  elem.addEventListener('click', closeSidebarOverlay);
  elem.addEventListener('click', enableScrollOnBody);
  elem.addEventListener('click', fixHeaderPosition);
});

sidebarOverlay.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeBurger);
sidebarOverlay.addEventListener('click', displayHeaderLogo);
sidebarOverlay.addEventListener('click', closeSidebarOverlay);
sidebarOverlay.addEventListener('click', enableScrollOnBody);
sidebarOverlay.addEventListener('click', toggleHeaderPosition);

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

// Overlay blackout
function toggleOverlay() {
  sidebarOverlay.classList.toggle('overlay--active');
}

function closeOverlay() {
  sidebarOverlay.classList.remove('overlay--active');
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

// Header on pets page
function toggleHeaderPosition() {
  header.classList.toggle('header--active');
}

function fixHeaderPosition() {
  header.classList.remove('header--active');
}

// POPUP WINDOW
import petsData from '../../assets/pets-data/pets-data.js';

const cardContainer = document.querySelector('.section--pets__gallery');
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

// Gallery with pagination
const gallery = document.querySelector('.gallery');
const galleryIds = generate48GalleryIds();
const galleryIdsFor6Pages = cutIdsIntoPages(galleryIds, 6);
const galleryIdsFor8Pages = cutIdsIntoPages(galleryIds, 8);
const galleryIdsFor16Pages = cutIdsIntoPages(galleryIds, 16);
let activePageIndex;

const matchMediaLarge = window.matchMedia('(min-width: 1280px)');
const matchMediaMedium = window.matchMedia('(max-width: 1279.9px)');
const matchMediaSmall = window.matchMedia('(max-width: 767.9px)');

const paginationBtns = document.querySelector('.pagination');
const paginationLeftBtns = [
  paginationBtns.children[0],
  paginationBtns.children[1],
];
const paginationRightBtns = [
  paginationBtns.children[3],
  paginationBtns.children[4],
];
paginationBtns.addEventListener('click', paginationHandler);

onStart();

function onStart() {
  // Set up page properly
  // taking into account the possible screensize
  // even after reload
  resizeHandler();
  window.addEventListener('resize', resizeHandler);

  console.log("This is my starting array of pseudorandom ID's:", galleryIds);
  console.log('Number of ID occurrences in it:', countOccurrences(galleryIds));

  console.log('Cut it in 6 pages:', galleryIdsFor6Pages);
  console.log(
    'Number of ID occurrences in it:',
    countOccurrences(galleryIdsFor6Pages)
  );

  console.log('Cut it in 8 pages:', galleryIdsFor8Pages);
  console.log(
    'Number of ID occurrences in it:',
    countOccurrences(galleryIdsFor8Pages)
  );

  console.log('Cut it in 16 pages:', galleryIdsFor16Pages);
  console.log(
    'Number of ID occurrences in it:',
    countOccurrences(galleryIdsFor16Pages)
  );
}

function resizeHandler() {
  if (matchMediaLarge.matches) {
    gallery.innerHTML = generateGallery(galleryIdsFor6Pages).innerHTML;

    enableBtns();
    disableBtns('left');
  }

  if (matchMediaMedium.matches) {
    gallery.innerHTML = generateGallery(galleryIdsFor8Pages).innerHTML;

    enableBtns();
    disableBtns('left');
  }

  if (matchMediaSmall.matches) {
    gallery.innerHTML = generateGallery(galleryIdsFor16Pages).innerHTML;

    enableBtns();
    disableBtns('left');
  }
}

function generate48GalleryIds() {
  let usedIDs = new Set();
  let pageSize = 8;
  let numberOfPages = 6;
  let totalIds = [];

  for (let cardNum = 0; cardNum < pageSize; cardNum++) {
    let newCardId;
    do {
      newCardId = getRandomNumberMaxInclusive(0, 7);
    } while (usedIDs.has(newCardId));
    usedIDs.add(newCardId);
  }

  for (let pageNum = 0; pageNum < numberOfPages; pageNum++) {
    totalIds.push(...usedIDs);
  }

  return totalIds;
}

function cutIdsIntoPages(inputArray, numberOfPages) {
  const arrayOfIds = [...inputArray].reverse();
  const cardsOnPage = arrayOfIds.length / numberOfPages;
  const result = [];

  for (let pageNum = 0; pageNum < numberOfPages; pageNum++) {
    let pageIds = [];

    for (let cardNum = 0; cardNum < cardsOnPage; cardNum++) {
      pageIds.push(arrayOfIds.pop());
    }

    // Reshuffle array randomly
    // based on Schwartzian transform algorithm
    pageIds = reshuffleArray(pageIds);
    result.push(pageIds);
  }

  // Reshuffle evere
  return result;
}

function countOccurrences(array) {
  let map = {};
  array = array.flat();

  array.forEach((e) => (map[e] = (map[e] || 0) + 1));

  return map;
}

function generateGallery(galleryIds) {
  const gallery = document.createElement('div');
  gallery.className = 'gallery section--pets__gallery';

  // Populate the pages
  for (let pageIndex = 0; pageIndex < galleryIds.length; pageIndex++) {
    const pageIds = galleryIds[pageIndex];
    const page = generatePage(pageIds, pageIndex);
    gallery.append(page);
  }

  // Make first page active
  const activePage = gallery.children[0];
  activePageIndex = 0;
  updatePageCount(activePageIndex + 1);
  activePage.classList.remove('gallery__page--hidden');
  activePage.classList.add('gallery__page--active');

  return gallery;
}

function generatePage(pageIds, pageIndex) {
  const page = document.createElement('div');
  page.className = 'gallery__page gallery__page--hidden';
  page.dataset.pageNum = pageIndex;

  for (let cardNum = 0; cardNum < pageIds.length; cardNum++) {
    const newCardId = pageIds[cardNum];
    const newCard = generateCard(newCardId);
    page.append(newCard);
  }

  return page;
}

function generateCard(id) {
  const petData = petsData[id];

  // Create card
  const card = document.createElement('div');
  card.className = 'card';
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

function getRandomNumberMaxInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isOdd(number) {
  return number % 2 !== 0;
}

// Schwartzian transform algorithm
// Kudos to 'superluminary'
// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function reshuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function paginationHandler(e) {
  const galleryLength = gallery.children.length;

  if (e.target.closest('.pagination__button--double-backward')) {
    movePage(activePageIndex, 0);
  }

  if (e.target.closest('.pagination__button--backward')) {
    if (activePageIndex > 0) {
      movePage(activePageIndex, activePageIndex - 1);
    }
  }

  if (e.target.closest('.pagination__button--forward')) {
    if (activePageIndex < galleryLength - 1) {
      movePage(activePageIndex, activePageIndex + 1);
    }
  }

  if (e.target.closest('.pagination__button--double-forward')) {
    movePage(activePageIndex, galleryLength - 1);
  }
}

function movePage(currentPageIndex, nextPageIndex) {
  const currentPage = gallery.children[currentPageIndex];
  hidePage(currentPage);

  const nextPage = gallery.children[nextPageIndex];
  showPage(nextPage);

  activePageIndex = nextPageIndex;

  updatePageCount(activePageIndex + 1);
  enableBtns();

  if (activePageIndex === 0) {
    disableBtns('left');
  }

  if (activePageIndex === gallery.children.length - 1) {
    disableBtns('right');
  }
}

function showPage(page) {
  page.classList.remove('gallery__page--hidden');
  page.classList.add('gallery__page--active');
}

function hidePage(page) {
  page.classList.add('gallery__page--hidden');
  page.classList.remove('gallery__page--active');
}

function updatePageCount(index) {
  const countBtn = paginationBtns.children[2];
  countBtn.innerText = index;
}

function enableBtns() {
  [...paginationBtns.children].forEach((btn) =>
    btn.classList.remove('button--disabled')
  );
}

function disableBtns(side) {
  if (side === 'left') {
    Array.from(paginationLeftBtns).forEach((btn) =>
      btn.classList.add('button--disabled')
    );
  }

  if (side === 'right') {
    Array.from(paginationRightBtns).forEach((btn) =>
      btn.classList.add('button--disabled')
    );
  }
}
