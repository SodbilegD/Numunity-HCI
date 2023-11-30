import { community } from "./community.js";
import { fetchData } from "./dataFetch.js";
import RecentPostItem from "./RecentPostItem.js";
import renderComments from "./commentFetch.js";

const jsonData = await fetchData();
const allData = JSON.stringify(jsonData, null, 2);

const communityData = jsonData.record.community;

const postsContainer = document.getElementById("posts-container");
const currentUrl = new URL(window.location.href);
const communityID = currentUrl.searchParams.get('communityID');
const temp = communityData.find(community => parseInt(community.communityId) === parseInt(communityID));
if (temp) {
    const newCommunity = new community(temp);
    newCommunity.Render();
    renderPosts();
}

function createPostElement(post) {
    const newPost = new RecentPostItem(post);
    const postElement = document.createElement("article");
    postElement.classList.add("post");
    postElement.id = 'recentPost_${post.postId}';
    postElement.innerHTML = newPost.Render();
    const viewPost = postElement.querySelector(".post__title");
    viewPost.addEventListener("click", function () {
        renderDiscussion(communityID, post.postId);
        console.log("hha");
        window.location.href = 'discussion.html?communityId=${communityId}&postId=${post.postId}';
    });
    return postElement;
}

function renderPosts() {
    postsContainer.innerHTML = "";
    communityData[parseInt(communityID) - 1].posts.forEach((post) => {
        const postElement = createPostElement(post);
        postsContainer.insertAdjacentElement("afterbegin", postElement);

        const reactionButtons = document.querySelectorAll(".post__reactions__list");
        reactionButtons.forEach(function (reactionButtons) {
            const countElement = reactionButtons.querySelector(".reaction-count");
            const reactionType = reactionButtons.textContent.trim().split(" ")[1].toLowerCase();
            let count = parseInt(countElement.textContent);

            // Check if the user has already reacted
            const userReactionKey = 'user_reaction_${reactionType}';
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

function renderDiscussion(postId) {
    console.log(communityID);
    console.log(postId);
    const temp = communityData[parseInt(communityID) - 1].posts.find(post => parseInt(post.postId) === parseInt(postId));
    const newPost = new RecentPostItem(temp);
    postsContainer.innerHTML = newPost.RenderSinglePost();
    // communityData[parseInt(communityId)-1].posts.forEach((post) => {
    //     if(post.postId == id){
    //         const newPost = new RecentPostItem(post);
    //         postsContainer.innerHTML = newPost.RenderSinglePost();
    //     }
    // });
    renderComments(communityData, communityID, postId);
}


const bodyId = document.body.id;
switch (bodyId) {
    case "discussion":
        renderDiscussion();
        break;
    case "index":
        //page3Function();
        break;
    case "chat":   
        //page3Function();
        break;
    default:
        console.log("No matching function for the loaded page.");
        break;
}