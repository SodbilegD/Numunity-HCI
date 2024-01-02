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
        console.log(this.posts);
        const filteredNew = this.posts.filter(post =>
        new Date(post.publishedDate) >= currentDate - 7);
        console.log(filteredNew);
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
        
        function timeAgo(input) {
        const date = (input instanceof Date) ? input : new Date(input);
        const formatter = new Intl.RelativeTimeFormat('en');
        const ranges = {
            years: 3600 * 24 * 365,
            months: 3600 * 24 * 30,
            weeks: 3600 * 24 * 7,
            days: 3600 * 24,
            hours: 3600,
            minutes: 60,
            seconds: 1
        };
        const secondsElapsed = (date.getTime() - Date.now()) / 1000;
        for (let key in ranges) {
            if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return formatter.format(Math.round(delta), key);
            }
        }
        } 
        post.timeAgo = timeAgo(Date.parse(post.publishedDate));
        var postElement = document.createElement('article');
        postElement.classList.add('post');
        postElement.id = `recentPost_${post.postId}`;
        postElement.insertAdjacentHTML("afterbegin", `
        
            <div class="post__profile">
                <img src="${user.profImg}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${user.userName}</p>
                <p class="post__profile__time">${post.timeAgo}</p>
            </div>
            <hr>`);
            var postTitleElement = document.createElement('h3');
            postElement.appendChild(postTitleElement);
            postTitleElement.classList.add('post__title');
            postTitleElement.textContent = post.postTitle;

            postElement.insertAdjacentHTML("beforeend",`
            <p class="post__detail">${post.postDetail}</p>
            <div class="post__reactions">
                <agree-disagree agreeCount=${post.agreeCount} disagreeCount=${post.disagreeCount} isAgreeClicked=${false} isDisAgreeClicked=${false}></agree-disagree>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-comment post__reactions__icon"></i>
                    <span class="reaction-count">${post.comments.length}</span> Comment
                </p>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                    <span class="reaction-count">${post.shareCount}</span> Share
                </p>
            </div>
        </article>`);
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