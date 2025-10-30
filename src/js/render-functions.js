import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    gallery: document.getElementById('gallery'),
    loadMoreBtn: document.getElementById('load-more'),
    loader: document.getElementById('loader'),
};

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    if (!Array.isArray(images) || images.length === 0) return;

    const markup = images
    .map(
        img => `
        <div class="photo-card">
        <a href="${img.largeImageURL}">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item"><b>Likes</b><span>${img.likes}</span></p>
            <p class="info-item"><b>Views</b><span>${img.views}</span></p>
            <p class="info-item"><b>Comments</b><span>${img.comments}</span></p>
            <p class="info-item"><b>Downloads</b><span>${img.downloads}</span></p>
        </div>
        </div>
    `
    )
    .join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
}

export function clearGallery() {
    refs.gallery.innerHTML = '';
}

export function showLoader() {
    refs.loader.classList.add('visible');
}

export function hideLoader() {
    refs.loader.classList.remove('visible');
}

export function showLoadMoreButton() {
    refs.loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    refs.loadMoreBtn.classList.add('hidden');
}

export { refs as uiRefs, lightbox };