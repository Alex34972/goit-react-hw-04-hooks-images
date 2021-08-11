const API_KEY = `21948852-6fcb2a22057a93c1128c532ff`;
const BASE_URL = `https://pixabay.com/api`;

function fetchImages(imagesName, page) {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${imagesName}&page=${page}&per_page=12&key=${API_KEY}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('No response from server'));
  });
}

const api = {
  fetchImages,
};

export default api;
