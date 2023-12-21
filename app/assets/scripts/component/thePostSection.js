// ENE COMPONENTIIG THECOMMUNITYSECTION COMPONENTTOIGOO NEGTGESEN YERNI ENE HEREGGU


// import { fetchData } from "../modules/dataFetcher.js";

class thePostSection extends HTMLElement {
    constructor() {
        super();
        this.postsContainer = document.getElementById("posts-container");
        this.trendButtonElement = document.getElementById("trendButton");
        this.newButtonElement = document.getElementById("newButton");
        this.communityId = null;

        this.trendButtonElement.addEventListener("click", this.filterTrend.bind(this));
        this.newButtonElement.addEventListener("click", this.filterNew.bind(this));

    }

    async connectedCallback() {
        try {
            const jsondata = await fetchData();
            const currentUrl = new URL(window.location.href);
            this.communityId = currentUrl.searchParams.get('communityId');
            this.community = jsondata.record.community[this.communityId - 1];
            this.posts = this.community.posts;
            this.renderPosts(this.posts);
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
        posts.forEach(post => this.#Render(post));
    }
    
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
        // this.myRoot.innerHTML = <p class="post__profile__name">${this.username}</p>;

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
            var postTitleElement = document.createElement('h3');
            postElement.appendChild(postTitleElement);
            postTitleElement.classList.add('post__title');
            postTitleElement.textContent = this.postTitle;

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
        this.postsContainer.appendChild(postElement);
        this.addEventListenerToPostTitle(postTitleElement, this.postId);
    }

    addEventListenerToPostTitle(postElement, postId) {
        postElement.addEventListener("click", () => {
            window.location.href = `discussion.html?communityId=${this.communityId}&postId=${postId}`;
        });
    };


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