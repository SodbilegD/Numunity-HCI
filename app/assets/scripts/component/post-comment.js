import { fetchData } from "../modules/dataFetcher.js";
import { sendDataToJsonBin } from "../modules/dataFetcher.js";

class PostComment extends HTMLElement {
    constructor() {
        super();
        this.comments = [];
        this.posts = [];
        this.post = {};
        this.postsContainer = document.getElementById("posts-container");
        this.commentsContainer = document.getElementById("comments-container");
        this.commentCounter = document.getElementById("total-comments");
        this.sendCommentButton = document.getElementById("send-comment-button");
    
        this.trendCommentButton = document.getElementById("comment-trend-filter");
        this.trendCommentButton.addEventListener("click", this.filterTrend.bind(this));
    
        this.sendCommentButton.addEventListener("click", this.handleSendComment.bind(this));
    }

    async connectedCallback() {
        await this.fetchData();
        this.renderSinglePost(this.post);
        this.renderComments(this.comments);
    }

    async fetchData() {
        this.jsondata = await fetchData();
        const currentUrl = new URL(window.location.href);
        const communityId = currentUrl.searchParams.get('communityId');
        const postsId = currentUrl.searchParams.get('postId');
        
        this.community = this.jsondata.record.community[communityId - 1];
        console.log(this.community);
        this.posts = this.community.posts;
        this.post = this.posts.find(post => post.postId == postsId);
        this.comments = this.post.comments || [];
    }

    renderComments(comments) {
        this.commentsContainer.innerHTML = "";
        comments.forEach(comment => this.#render(comment));
        this.commentCounter.innerHTML = this.comments.length;
    }

    #render(comment){
        this.commentId = comment.id;
        this.commentBody = comment.body;
        this.commentUsername = comment.user.username;
        this.commentProfileImage = comment.user.profileImage;
        this.commentPublishedDate = comment.publishedDate;
        
        var commentElement = document.createElement('div');
        commentElement.classList.add('single-comment');
        commentElement.id = `single-comment_${(this.commentId)}`;

        commentElement.insertAdjacentHTML("afterbegin",
        `<div class="single-comment__profile">
                <img src="${this.commentProfileImage}" alt="profile" class="single-comment__profile__img">
                <p class="single-comment__profile__name">${this.commentUsername}</p>
            </div>
            <p class="single-comment__detail">${this.commentBody}</p>

            <div class="single-comment__reactions">                            
                <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-up"></i>agree</p>
                <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-down"></i></p>                                
                <p class="single-comment__reactions__list"><i class="fa-solid fa-reply"></i>Reply</p>
            </div>`);
        this.commentsContainer.appendChild(commentElement);        
    }

    renderSinglePost(post) {
        this.postId = post.postId;
        this.postTitle = post.postTitle;
        this.postUsername = post.user.username;
        this.postProfileImage = post.user.profileImage;
        this.postDetail = post.postDetail;
        this.publishedDate = post.publishedDate;
        this.timeAgo = new Date();
        this.timeAgo = Date.parse(this.timeAgo) - Date.parse(this.publishedDate);
        this.timeAgo = new Date(this.timeAgo);
        this.agreeCount = post.agreeCount;
        this.disagreeCount = post.disagreeCount;
        this.commentCount = post.comments.length;
        this.shareCount = post.shareCount;
        this.communityId = this.community.communityId;
        this.communityName = this.community.communityName;

        this.postsContainer.innerHTML = `
        <article class="post" id="recentPost_${this.postId}">
            <div class="post__profile" id="posts-container">
                <img src="${this.postProfileImage}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${this.postUsername}</p>
                <a href="selectedcommunity.html?communityId=${this.communityId}" class="post__profile__community">>>${this.communityName}</a>
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

    async handleSendComment() {
        const commentInput = document.getElementById("comment-input");
        const newCommentText = commentInput.value.trim();
    
        if (newCommentText !== "") {
            const newComment = {
                id: this.commentCounter.innerHTML,
                body: newCommentText,
                user: {
                    id: 999,
                    username: "comment writer",
                    profileImage: "/assets/images/profile.png"
                },
                publishedDate: new Date().toISOString(),
            };
    
            this.comments.push(newComment);
    
            this.renderComments(this.comments);
    
            commentInput.value = "";
            await sendDataToJsonBin(this.jsondata.record);
        }
    }
    
    filterTrend() {
        const currentDate = new Date();
        const filteredTrend = this.comments.filter(comment =>
        Date.parse(comment.publishedDate) > currentDate - 7 && comment.agreeCount > 10
        );

        this.renderComments(filteredTrend);
    }

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

window.customElements.define('post-comment', PostComment);