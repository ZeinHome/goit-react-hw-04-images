import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '28498963-d14ed543a0b98f000b6c864a2&';
const API_IMAGE = 'image_type=photo';

async function fetchImages(imagseName, pages) {
  const response = await axios.get(
    `${API_URL}?key=${API_KEY}q=${imagseName}&${API_IMAGE}&page=${pages}&per_page=12`
  );

  return response.data;
}

export default fetchImages;
