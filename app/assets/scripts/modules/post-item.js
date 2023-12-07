class PostItem extends HTMLElement {
    constructor() {
        super();
        this.postId = this.getAttribute("postId");
        this.profileName = this.getAttribute("profileName");
        // this.attachShadow({ mode: 'open' });
        
        // this.profimg = post.user.profileImage;
        // this.timeAgo = 0;
        // this.title = post.postTitle;
        // this.detail = post.postDetail;
        // this.community = post.community;
        // this.publishedDate = post.publishedDate;
        // this.agreeCount = post.agreeCount;
        // this.disagreeCount = post.disagreeCount;
        // this.commentCount = post.comments.length;
        // this.shareCount = post.shareCount;

         // or any other logic you need
    }


    Render() {
        console.log("hi");
        this.innerHTML = `<p class="post__profile__name">${this.profileName}</p>`;
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
