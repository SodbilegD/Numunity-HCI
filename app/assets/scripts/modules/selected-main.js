import { fetchData } from "./dataFetcher.js";

const postsData=await fetchData();
console.log(postsData);
fetch(postsData)
  .then(response => response.json())
  .then(data => {
    // Get the current time
    const currentTime = new Date();

    // Filter data based on new and trending criteria
    const filteredData = data.filter(post => {
      // Check if the post has over 100 likes (trending)
      const isTrending = this.likeCount > 100;

      // Check if the post was posted within the last 6 hours (new)
      const postTime = new Date(this.timeAgo); // Assuming API provides a timestamp
      const isNew = currentTime - postTime < 6 * 60 * 60 * 1000; // 6 hours in milliseconds
      console.log(postTime);
      console.log(isNew);

      // Include the post in the filtered data if it meets either criteria
      return isTrending || isNew;
    });

    // Update the UI with the filtered data
    updateUI(filteredData);
  })
  .catch(error => console.error('Error fetching data:', error));

function updateUI(filteredData) {
  // Assume there is a container element with an id of "posts-container" where you display the posts
  const postsContainer = document.getElementById('posts-container');

  // Clear existing content
  postsContainer.innerHTML = '';

  // Loop through the filtered data and append each post to the container
  ;
}





/*async function displayFilteredData() {
  try {
    const data = await fetchData();
    const category = getCategoryFromURL();

    if (category) {
      const filteredData = data.filter(item => item.category === category);
      console.log(filteredData);
      // You can render the filtered data on your page using your preferred rendering method.
    } else {
      // Handle the case when no category parameter is provided.
    }
  } catch (error) {
    console.error(error);
  }
}

displayFilteredData();
*/

  