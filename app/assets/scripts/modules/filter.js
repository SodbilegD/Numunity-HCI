import { fetchData } from './dataFetcher.js';
import { renderPosts } from './post.js';

// Fetch the data
const data = await fetchData();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const date = urlParams.get('publishedDate');

// Filter the data based on the category and date parameters
let filteredData = data;
if (category) {
  filteredData = filteredData.filter(item => item.category === category);
}
if (date) {
  filteredData = filteredData.filter(item => item.date === date);
}

// Use the filtered data to render your posts or products
renderPosts(filteredData);