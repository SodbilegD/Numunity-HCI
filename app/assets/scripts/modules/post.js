// Sample data for dynamic posts
const postsData = [
  {
      profileName: "Amet",
      timeAgo: "1h ago",
      title: "How do I stop obsessing over grades?",
      detail: "I just got a B+ on an essay and I’m absolutely losing my mind. I’ve never gotten anything lower than an A- and I feel actually sick over this. What can I do?",
  },
  {
    profileName: "Sodoo",
    timeAgo: "3h ago",
    title: "How do I stop obsessing over grades?",
    detail: "I just got a B+ on an essay and I’m absolutely losing my mind. I’ve never gotten anything lower than an A- and I feel actually sick over this. What can I do?",
  },
  {
    profileName: "Hulan",
    timeAgo: "5h ago",
    title: "How do I stop obsessing over grades?",
    detail: "I just got a B+ on an essay and I’m absolutely losing my mind. I’ve never gotten anything lower than an A- and I feel actually sick over this. What can I do?",
  },
  {
    profileName: "Dukk",
    timeAgo: "10h ago",
    title: "How do I stop obsessing over grades?",
    detail: "I just got a B+ on an essay and I’m absolutely losing my mind. I’ve never gotten anything lower than an A- and I feel actually sick over this. What can I do?",
  }
  // Add more post data here
];

// Create an object containing the posts data
const dataObject = {
  posts: postsData
};

// Convert the object to a JSON string
const jsonData = JSON.stringify(dataObject, null, 2); // The second argument (null) specifies a replacer function, and the third argument (2) specifies the indentation for pretty printing.

// Output the JSON string to the console (you can save it to a file)
console.log(jsonData);

// Function to create dynamic post elements
function createPostElement(postData) {
  const postElement = document.createElement("article");
  postElement.classList.add("post");

  // Create the post content
  postElement.innerHTML = `
      <div class="post__profile" id="posts-container">
          <img src="/assets/images/profile.png" alt="profile" class="post__profile__img">
          <p class="post__profile__name">${postData.profileName}</p>
          <p class="post__profile__time">${postData.timeAgo}</p>
      </div>
      <hr>
      <h3 class="post__title">${postData.title}</h3>
      <p class="post__detail">${postData.detail}</p>
      <div class="post__reactions">
        <p class="post__reactions__list">
            <i class="fa-regular fa-face-smile-beam post__reactions__icon"></i>
            <span class="reaction-count">0</span> <button class="reaction-button ">Agree</button>
        </p>
        <p class="post__reactions__list">
            <i class="fa-regular fa-face-frown post__reactions__icon"></i>
            <span class="reaction-count">0</span> <button class="reaction-button ">Disagree</button>
        </p>
        <p class="post__reactions__list">
            <i class="fa-regular fa-comment post__reactions__icon"></i>
            <span class="reaction-count">0</span> Comment
        </p>
        <p class="post__reactions__list">
            <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
            <span class="reaction-count">0</span> Share
        </p>
      </div>
  `;

  return postElement;
}

// Function to add posts to the posts container
function renderPosts() {
  const postsContainer = document.getElementById("posts-container");
  postsData.forEach((postData) => {
      const postElement = createPostElement(postData);
      postsContainer.appendChild(postElement);
  });
}

// JavaScript to make the Agree and Disagree buttons toggle and change color after clicking
document.addEventListener("DOMContentLoaded", function () {
  const reactionButtons = document.querySelectorAll(".post__reactions__list");

  reactionButtons.forEach(function (reactionButtons) {
      const countElement = reactionButtons.querySelector(".reaction-count");
      const reactionType = reactionButtons.textContent.trim().split(" ")[1].toLowerCase();
      let count = 0;

      // Check if the user has already reacted
      const userReactionKey = `user_reaction_${reactionType}`;
      let hasUserReacted = localStorage.getItem(userReactionKey);

      if (hasUserReacted) {
          // If the user has already reacted, display the count and style the button
          count = parseInt(localStorage.getItem(userReactionKey));
          countElement.textContent = count;
          reactionButtons.classList.add("clicked");
      }

      reactionButtons.addEventListener("click", function () {
          if (hasUserReacted) {
              // If the user has already reacted, remove the reaction
              count--;
              countElement.textContent = count;
              localStorage.removeItem(userReactionKey);
              reactionButtons.classList.remove("clicked");
              hasUserReacted = null;
          } else {
              // If the user hasn't reacted, add the reaction
              count++;
              countElement.textContent = count;
              localStorage.setItem(userReactionKey, count);
              reactionButtons.classList.add("clicked");
              hasUserReacted = count;
          }
      });
  });
});



// Function to filter content based on the selected category, reactions, and published time
function filterContent(category) {
  const posts = document.querySelectorAll(".post");

  posts.forEach(function (post) {
      const postCategory = post.getAttribute("data-category");
      const postReactions = parseInt(post.getAttribute("data-reactions"));
      const postPublished = new Date(post.getAttribute("data-published"));
      const currentDate = new Date();

      if (category === "all" || category === postCategory) {
          if (category === "new" && postPublished > currentDate) {
              post.style.display = "block"; // Show the post if it's in the "New" category and published in the future
          } else if (category === "trend" && postReactions > 0) {
              post.style.display = "block"; // Show the post if it's in the "Trend" category and has reactions
          } else {
              post.style.display = "none"; // Hide the post in other cases
          }
      } else {
          post.style.display = "none"; // Hide the post if it's not in the selected category
      }
  });
}

// Call the function to render posts
renderPosts();