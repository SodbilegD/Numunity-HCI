import { fetchData } from './dataFetcher.js';

// Fetch the data
const postsData = await fetchData();

// Extract the category parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const agreeCount = urlParams.get('agreeCount');

// Filter the data based on the category parameter
const filteredData = agreeCount ? data.filter(item => item.category === category) : data;

// Use the filtered data to render your posts or products
renderPosts(filteredData);