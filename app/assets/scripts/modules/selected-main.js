import { fetchData } from './dataFetcher.js';
import { getCategoryFromURL } from './urlParser.js';

async function displayFilteredData() {
  try {
    const data = await fetchData();
    const category = getCategoryFromURL();

    if (category) {
      const filteredData = data.filter(item => item.category === category);
      // Render the filtered data in your HTML, e.g., by creating DOM elements.
      // You can use JavaScript frameworks or libraries like React, Vue, or plain JavaScript for rendering.
      
      console.log('Filtered data:', filteredData);
    } else {
      // Handle the case when no category parameter is provided.
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

displayFilteredData();