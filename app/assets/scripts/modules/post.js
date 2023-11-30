import { fetchData } from "./dataFetcher.js";
import  RecentPostItem  from "./RecentPostItem.js";

async function init() {
    const postsData = await fetchData();

    // Create an object containing the posts data
    const dataObject = {
        posts: postsData
    };

    // Convert the object to a JSON string
    const jsonData = JSON.stringify(dataObject, null, 2);

    function createPostElement(post) {
        const newPost = new RecentPostItem(post);
        return newPost.Render();
    }

    // Function to add posts to the posts container
    function renderPosts() {
        const postsContainer = document.getElementById("posts-container");

        postsData.record.post.postList.forEach((post) => {
            const postElement = createPostElement(post);
            
            postsContainer.insertAdjacentHTML("afterbegin", postElement);

            // Set up event listeners for the reaction buttons of the newly created post
            const reactionButtons = document.querySelectorAll(".post__reactions__list");
            reactionButtons.forEach(function (reactionButtons) {
                const countElement = reactionButtons.querySelector(".reaction-count");
                const reactionType = reactionButtons.textContent.trim().split(" ")[1].toLowerCase();
                let count = parseInt(countElement.textContent);

                // Check if the user has already reacted
                const userReactionKey = `user_reaction_${reactionType}`;
                let hasUserReacted = localStorage.getItem(userReactionKey);

                
                if (hasUserReacted) {
                    // If the user has already reacted, display the count and style the button
                    count = parseInt(localStorage.getItem(userReactionKey));
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
    }

    // Call the function to render posts
    renderPosts();
}

// Call the init function
init();