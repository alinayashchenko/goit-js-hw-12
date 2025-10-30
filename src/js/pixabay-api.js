import axios from 'axios';

const API_KEY = '52591555-089c8d48efe1c098578f49548';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 40;

export async function getImagesByQuery(query, page = 1) {
    const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
}