class PostItem extends HTMLElement {
    constructor() {
        super();
        this.postId = this.getAttribute("postId");
        this.profileName = this.getAttribute("profileName");
        this.myRoot = attachShadow({ mode: 'open' });
        this.profimg = this.getAttribute("profImg");
        this.timeAgo = this.getAttribute("timeAgo");
        this.title = this.getAttribute("title");
        this.detail = this.getAttribute("detail");
        this.community = this.getAttribute("community");
        this.publishedDate = this.getAttribute("publishedDate");
        this.agreeCount = this.getAttribute("agreeCount");
        this.disagreeCount = this.getAttribute("disagreeCount");
        this.commentCount = this.getAttribute("commentCount");
        this.shareCount = post.shareCount;

         // or any other logic you need
         this.#Render();
    }


    #Render() {
        console.log("hi");
        this.myRoot.innerHTML = `<p class="post__profile__name">${this.profileName}</p>`;
        // this.innerHTML = `<div class="post__profile" id="posts-container">
        //             <img src="${this.profimg}" alt="profile" class="post__profile__img">
        //             <p class="post__profile__name">${this.profileName}</p>
        //             <p class="post__profile__time">${this.timeAgo}</p>
        //         </div>
        //         <hr>
        //         <h3 class="post__title"><a href="discussion.html?postId=${this.postId}"></a>${this.title}</h3>
        //         <p class="post__detail">${this.detail}</p>
        //         <div class="post__reactions">
        //             <agree-disagree></agree-disagree>
        //             <p class="post__reactions__list">
        //                 <i class="fa-regular fa-comment post__reactions__icon"></i>
        //                 <span class="reaction-count">${this.commentCount}</span> Comment
        //             </p>
        //             <p class="post__reactions__list">
        //                 <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
        //                 <span class="reaction-count">${this.shareCount}</span> Share
        //             </p>
        //         </div>`;
    }

    #RenderSinglePost() {
        return `
        <article class="post" id="recentPost_${this.id}">
            <div class="post__profile" id="posts-container">
                <img src="${this.profimg}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${this.profileName}</p>
                <a href="#" class="post__profile__community">>>${this.community}</a>
            </div>
            <hr>
            <h1 class="post__title">${this.title}</h1>
            <p class="post__detail">${this.detail}</p>
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
        this.myRoot.querySelectorAll("button")[0].addEventListener("click", (e) => {
            e.stopPropagation();
            const myCart = document.querySelector("cart-info");
            myCart.addToCart(this);
            document.getElementById("totalProduct").innerText = myCart.getTotalCount();
        });
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

window.customElements.define('post-item', PostItem);
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