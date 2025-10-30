import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    uiRefs,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loadMoreBtn = uiRefs.loadMoreBtn;
const gallery = uiRefs.gallery;

let currentQuery = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
    iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query.',
    });
    return;
    }

    currentQuery = query;
    page = 1;
    totalHits = 0;
    clearGallery();
    hideLoadMoreButton();

    try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);
    hideLoader();

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
        iziToast.info({
        title: 'No results',
        message: 'No images found. Try another query.',
        });
        return;
    }

    createGallery(data.hits);

    totalHits = data.totalHits;

    if (page * PER_PAGE < totalHits) {
        showLoadMoreButton();
    } else {
        hideLoadMoreButton();
        iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        });
    }

    iziToast.success({
        title: 'Success',
        message: `Found ${totalHits} images.`,
    });
    } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
    });
    }
}

async function onLoadMore() {
    page += 1;
    hideLoadMoreButton();
    showLoader();

    try {
    const data = await getImagesByQuery(currentQuery, page);
    hideLoader();

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
        hideLoadMoreButton();
        iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        });
        return;
    }

    createGallery(data.hits);

    smoothScroll();

    if (page * PER_PAGE >= data.totalHits) {
        hideLoadMoreButton();
        iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        });
    } else {
        showLoadMoreButton();
    }
    } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({ title: 'Error', message: 'Failed to load more images.' });
    }
}

function smoothScroll() {
    const firstCard = gallery.querySelector('.photo-card');
    if (!firstCard) return;

    const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
    });
}