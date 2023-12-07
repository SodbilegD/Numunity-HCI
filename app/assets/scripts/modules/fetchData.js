import { fetchData } from "./dataFetch.js";
import { community } from "./community.js";
import RecentPostItem from "./RecentPostItem.js";
import renderComments from "./commentFetch.js";

const jsonData = await fetchData();
// const allData = JSON.stringify(jsonData, null, 2);

const communityData = jsonData.record.community;

const postsContainer = document.getElementById("posts-container");
const currentUrl = new URL(window.location.href);
const communityID = currentUrl.searchParams.get('communityID');
console.log(communityID);
const temp = communityData.find(community => parseInt(community.communityId) === parseInt(communityID));
console.log(temp);
if (temp) {
    //const newCommunity = new community(temp);
    //newCommunity.Render();
    renderPosts();
}

function createPostElement(post) {
    const newPost = new RecentPostItem(post);
    const postElement = document.createElement("article");
    postElement.classList.add("post");
    postElement.id = 'recentPost_${post.postId}';
    postElement.innerHTML = newPost.Render();
    const viewPost = postElement.querySelector(".post__title");
    console.log(viewPost);
    viewPost.addEventListener("click", function () {
        console.log("hha");
        renderDiscussion(communityID);
        window.location.href = `discussion.html?communityID=${communityID}&postId=${post.postId}`;
    });
    return postElement;
}

function renderPosts() {
    postsContainer.innerHTML = "";
    console.log("+++++++++++++++++++++++++++++++++++++++++++"+communityID);
    console.log(communityData);
    communityData[parseInt(communityID) - 1].posts.forEach((post) => {
        const postElement = createPostElement(post);
        postsContainer.insertAdjacentElement("afterbegin", postElement);

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

function renderDiscussion(postID) {
    console.log(communityData[parseInt(communityID)].posts.find(post => parseInt(post.postId) === parseInt(postID)));
    const temp = communityData[parseInt(communityID)].posts.find(post => parseInt(post.postId) === parseInt(postID));
    console.log(temp);
    const newPost = new RecentPostItem(temp);
    postsContainer.innerHTML = newPost.RenderSinglePost();
    communityData[parseInt(communityID)-1].posts.forEach((post) => {
        if(post.postId == postID){
            const newPost = new RecentPostItem(post);
            postsContainer.innerHTML = newPost.RenderSinglePost();
        }
    });
    renderComments(communityData, communityID, postID);
}


const bodyId = document.body.id;

console.log(document.body.id+"!!!!!!!!!!!!!!!!!!!");
switch (bodyId) {
    case "discussion":
        const postID = currentUrl.searchParams.get('postId');
        document.addEventListener("DOMContentLoaded",renderDiscussion(postID));
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
