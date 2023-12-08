import { fetchData } from "../modules/dataFetcher.js";

const jsondata = await fetchData();
const currentUrl = new URL(window.location.href);
const communityId = currentUrl.searchParams.get('communityId');
const community = jsondata.record.community[communityId-1];
const posts = jsondata.record.community[communityId-1].posts; 
const postsContainer = document.getElementById("posts-container");

class thePostSection extends HTMLElement {
    constructor() {
        super();
        // this.myRoot = attachShadow({ mode: 'open' });
         // or any other logic you need
        posts.forEach(post => {
            this.#Render(post);
            this.addEventListenerToPostTitle(post.postId);
        });
    }
    addEventListenerToPostTitle(postTitleElement, postId) {
        console.log(postTitleElement);
            postTitleElement.addEventListener('click', () => {
                
                console.log(`Post title clicked! Post ID: ${postId}`);
                
                window.location.href = `discussion.html?communityId=${communityId}&postId=${postId}`;
            });
    };

    #Render(post) {
        this.postId = post.postId;
        this.username = post.user.username;
        this.profileImage = post.user.profileImage;
        this.postTitle = post.postTitle;
        this.postDetail = post.postDetail;
        this.publishedDate = post.publishedDate;
        this.timeAgo = new Date();
        this.timeAgo = Date.parse(this.timeAgo) - Date.parse(this.publishedDate);
        this.timeAgo = new Date(this.timeAgo);
        this.agreeCount = post.agreeCount;
        this.disagreeCount = post.disagreeCount;
        this.commentCount = post.comments.length;
        this.shareCount = post.shareCount;
        this.communityName = community.communityName;
        // this.myRoot.innerHTML = `<p class="post__profile__name">${this.username}</p>`;

        var postElement = document.createElement('article');
        postElement.classList.add('post');
        postElement.id = `recentPost_${this.postId}`;

        postElement.insertAdjacentHTML("afterbegin", `
        
            <div class="post__profile">
                <img src="${this.profileImage}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${this.username}</p>
                <p class="post__profile__time">${this.timeAgo}</p>
            </div>
            <hr>`);
            const postTitleElement = document.createElement('h3');
            postTitleElement.classList.add('post__title');
            postTitleElement.textContent = this.postTitle;
            postElement.appendChild(postTitleElement);

            postElement.insertAdjacentHTML("beforeend",`
            <p class="post__detail">${this.postDetail}</p>


            <div class="post__reactions">
                <agree-disagree agreeCount=${this.agreeCount} disagreeCount=${this.disagreeCount} isAgreeClicked=${false} isDisAgreeClicked=${false}></agree-disagree>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-comment post__reactions__icon"></i>
                    <span class="reaction-count">${this.commentCount}</span> Comment
                </p>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                    <span class="reaction-count">${this.shareCount}</span> Share
                </p>
            </div>
        </article>`);
        postsContainer.appendChild(postElement);
        console.log(postTitleElement);
        this.addEventListenerToPostTitle(postTitleElement, this.postId);
    }
    
    #RenderSinglePost() {
        return `
        <article class="post" id="recentPost_${this.postId}">
            <div class="post__profile" id="posts-container">
                <img src="${this.profileImage}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${this.username}</p>
                <a href="#" class="post__profile__community">>>${this.communitName}</a>
            </div>
            <hr>
            <h1 class="post__title">${this.postTitle}</h1>
            <p class="post__detail">${this.postDetail}</p>
            <div class="post__reactions post__reactions--hidden">
                <agree-disagree></agree-disagree>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-comment post__reactions__icon"></i>
                    <span class="reaction-count">${this.commentCount}</span> Comment
                </p>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                    <span class="reaction-count">${this.shareCount}</span> Share
                </p>
            </div>
            <p class="post__profile__time post__profile__time--down">1h ago</p>
        </article>`;
    }


    
    connectedCallback() {
        // this.myRoot.querySelectorAll("button")[0].addEventListener("click", (e) => {
        //     e.stopPropagation();
        //     const myCart = document.querySelector("cart-info");
        //     myCart.addToCart(this);
        //     document.getElementById("totalProduct").innerText = myCart.getTotalCount();
        // });
    }    

    disconnectedCallback() {
        // Implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        // Implementation
    }

    adoptedCallback() {
        // Implementation
    }
}

window.customElements.define('the-post-section', thePostSection);
// 

// import  RecentPostItem  from "./RecentPostItem.js";

// async function init() {
//     const postsData = await fetchData();

//     // Create an object containing the posts data
//     const dataObject = {
//         posts: postsData
//     };

//     // Convert the object to a JSON string
//     const jsonData = JSON.stringify(dataObject, null, 2);

//     function createPostElement(post) {
//         const newPost = new RecentPostItem(post);
//         return newPost.Render();
//     }

//     // Function to add posts to the posts container
//     function renderPosts() {
//         const postsContainer = document.getElementById("posts-container");

//         postsData.record.post.postList.forEach((post) => {
//             const postElement = createPostElement(post);
            
//             postsContainer.insertAdjacentHTML("afterbegin", postElement);

//             // Set up event listeners for the reaction buttons of the newly created post
//             const reactionButtons = document.querySelectorAll(".post__reactions__list");
//             reactionButtons.forEach(function (reactionButtons) {
//                 const countElement = reactionButtons.querySelector(".reaction-count");
//                 const reactionType = reactionButtons.textContent.trim().split(" ")[1].toLowerCase();
//                 let count = parseInt(countElement.textContent);

//                 // Check if the user has already reacted
//                 const userReactionKey = `user_reaction_${reactionType}`;
//                 let hasUserReacted = localStorage.getItem(userReactionKey);

                
//                 if (hasUserReacted) {
//                     // If the user has already reacted, display the count and style the button
//                     count = parseInt(localStorage.getItem(userReactionKey));
//                     reactionButtons.classList.add("clicked");
//                 }

//                 reactionButtons.addEventListener("click", function () {
//                     if (hasUserReacted) {
//                         // If the user has already reacted, remove the reaction
//                         count--;
//                         countElement.textContent = count;
//                         localStorage.removeItem(userReactionKey);
//                         reactionButtons.classList.remove("clicked");
//                         hasUserReacted = null;
//                     } else {
//                         // If the user hasn't reacted, add the reaction
//                         count++;
//                         countElement.textContent = count;
//                         localStorage.setItem(userReactionKey, count);
//                         reactionButtons.classList.add("clicked");
//                         hasUserReacted = count;
//                     }
//                 });
//             });
//         });
//     }

//     // Call the function to render posts
//     renderPosts();
// }

// // Call the init function
// init();