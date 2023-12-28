// import { fetchData } from "../modules/dataFetcher.js";
//advertisements deer bairlah ali ng community medeelliig haruulah hsg
class theCommunitySection extends HTMLElement {
    constructor() {
        super();
        this.postsContainer = document.getElementById("posts-container");
        this.trendButtonElement = document.getElementById("trendButton");
        this.newButtonElement = document.getElementById("newButton");
        this.communityId = null;

        this.trendButtonElement.addEventListener("click", this.filterTrend.bind(this));
        this.newButtonElement.addEventListener("click", this.filterNew.bind(this));
        
        this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    #render(community) {
        document.getElementById("community").insertAdjacentHTML('afterbegin', `
            <h1 class="community__name">>> ${community.communityName}</h1>`);
        document.getElementById("community-detail").insertAdjacentHTML('afterbegin', `
            <h3 class="advertisements__info__title">${community.communityName}</h3>
            <hr>

            
            
            <p class="advertisements__info__detail">${community.communityAbout}</p>
            <p class="advertisements__info__opened"><i class="fa-solid fa-clock"></i>Нээгдсэн: ${community.createdDate}</p>
            <div class="advertisements__info__container">
                <p class="advertisements__info__followers">Дагагчид<br><span>${community.followers.length}</span></p>
                <hr>
                <p class="advertisements__info__total">Нийт пост<br><span>${community.posts.length}</span></p>
            </div>
        `);
        this.posts = community.posts;
        this.renderPosts(this.posts);
    }

    async connectedCallback() {
        try {
            const currentUrl = new URL(window.location.href);
            this.communityId = currentUrl.searchParams.get('communityId');
            const response = await fetch(`http://localhost:3000/selectedcommunity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ communityId: this.communityId }),
            });
            console.log("responsee",response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.users = data.user;
            this.#render(data.community);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    filterTrend() {
        const currentDate = new Date();
        const filteredTrend = this.posts.filter(post =>
            Date.parse(post.publishedDate) > currentDate - 7 && post.agreeCount > 15
        );
    
        this.renderPosts(filteredTrend);
    }
    
    filterNew() {
        const currentDate = new Date();
        const filteredNew = this.posts.filter(post =>
        Date.parse(post.publishedDate) > currentDate - 7);
    
        this.renderPosts(filteredNew);
    }

    renderPosts(posts) {
        this.postsContainer.innerHTML = "";
        posts.forEach(post => {
            const userId = post.user;
            const user = this.users.find(user => user.userId === parseInt(userId));
            this.#RenderPost(post, user);
        });
    }
    
    #RenderPost(post, user) {       
        
        var postElement = document.createElement('article');
        postElement.classList.add('post');
        postElement.id = `recentPost_${post.postId}`;
        postElement.insertAdjacentHTML("afterbegin", `
        
        // testing some dark mode thing
        theme="${window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}">
        
        
        
        <div class="post__profile">
                <img src="${user.profImg}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${user.userName}</p>
                <p class="post__profile__time">${post.publishedDate}</p>
            </div>
            <hr>`);
            var postTitleElement = document.createElement('h3');
            postElement.appendChild(postTitleElement);
            postTitleElement.classList.add('post__title');
            postTitleElement.textContent = post.postTitle;

            
            const postTemplate = document.getElementById('post-template');
            const clone = document.importNode(postTemplate.content, true);
            clone.querySelector('[slot="userName"]').textContent = user.userName;
            clone.querySelector('[slot="publishedDate"]').textContent = post.publishedDate;
            clone.querySelector('[slot="postTitle"]').textContent = post.postTitle;
            clone.querySelector('[slot="postDetail"]').textContent = post.postDetail;
            clone.querySelector('[slot="commentCount"]').textContent = post.comments.length;
            clone.querySelector('[slot="shareCount"]').textContent = post.shareCount;
            this.postsContainer.appendChild(clone);
    

            postElement.insertAdjacentHTML("beforeend",`
            
            <template id="post-template">
            <article class="post">
              <div class="post__profile">
                <img class="post__profile__img" alt="profile" src="" />
                <p class="post__profile__name"><slot name="userName"></slot></p>
                <p class="post__profile__time"><slot name="publishedDate"></slot></p>
              </div>
              <hr />
              <h3 class="post__title"><slot name="postTitle"></slot></h3>

            <p class="post__detail"><slot name="postDetail">${post.postDetail}</slot></p>
            <div class="post__reactions">
                <agree-disagree agreeCount=${post.agreeCount} disagreeCount=${post.disagreeCount} isAgreeClicked=${false} isDisAgreeClicked=${false}></agree-disagree>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-comment post__reactions__icon"></i>
                    <span class="reaction-count">${post.comments.length}</span> Comment
                </p>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                    <span class="reaction-count"><slot name="shareCount">${post.shareCount}</slot></span> Share
                </p>
            </div>
        </article>
        </template>`);
        this.postsContainer.appendChild(postElement);
        this.addEventListenerToPostTitle(postTitleElement, post.postId);
    }

    addEventListenerToPostTitle(postElement, postId) {
        postElement.addEventListener("click", () => {
            window.location.href = `discussion.html?communityId=${this.communityId}&postId=${postId}`;
        });
    };

    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }
    
    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('the-community-section', theCommunitySection);
export const community = new theCommunitySection();