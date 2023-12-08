import { fetchData } from "../modules/dataFetcher.js";
import { sendDataToJsonBin } from "../modules/dataFetcher.js";

const jsondata = await fetchData();
const currentUrl = new URL(window.location.href);
const communityId = currentUrl.searchParams.get('communityId');
const community = jsondata.record.community[communityId-1];
const posts = community.posts;
const postsId = currentUrl.searchParams.get('postId');
const comments = posts[postsId-1].comments;
const postsContainer = document.getElementById("posts-container");
const commentsContainer = document.getElementById("comments-container");
const trendCommentButton = document.getElementById("comment-trend-filter");
const commentCounter = document.getElementById("total-comments");

const sendCommentButton = document.getElementById("send-comment-button");

class PostComment extends HTMLElement {
    constructor() {
        super();
        const filteredSinglePost = posts.filter(post => post.postId == postsId);
        this.renderSinglePost(filteredSinglePost[0]);
        comments.forEach(comment => {
            this.#render(comment);
        });
        trendCommentButton.addEventListener("click", () => {
            // window.location.href = `selectedcommunity.html?communityId=${communityId}/latest`;
            commentsContainer.innerHTML = "";
            var currentDate = new Date();
            console.log(Date.parse(posts[0].publishedDate) - currentDate);
            var filteredDate = comments.filter(comment => Date.parse(comment.publishedDate) < currentDate - 7 && comment.agreeCount > 10);
            filteredDate.forEach(comment => {
                this.#render(comment);
            });
            
            // filteredData = filterNew(posts);
            // this.#Render(filteredData);
        });
        commentCounter.innerHTML = comments.length;
        sendCommentButton.addEventListener("click", async () => {
            const commentInput = document.getElementById("comment-input");
            const newCommentText = commentInput.value.trim();
    
            if (newCommentText !== "") {
                
                const newComment = {
                    id: commentCounter.innerHTML,
                    body: newCommentText,
                    user: {
                        id: 999,
                        username: "comment writer",
                        profileImage: "/assets/images/profile.png"
                    },
                    publishedDate: new Date().toISOString(),
                    // Add any other properties you need
                };
    
                comments.push(newComment);
                
                commentsContainer.innerHTML = "";
                comments.forEach(comment => {
                    this.#render(comment);
                });
    
                commentInput.value = "";
                commentCounter.innerHTML = comments.length;
    
                await sendDataToJsonBin(jsondata.record);
            }});
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
        commentsContainer.appendChild(commentElement);        
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
        this.communityName = community.communityName;
        postsContainer.innerHTML = `
        <article class="post" id="recentPost_${this.postId}">
            <div class="post__profile" id="posts-container">
                <img src="${this.postProfileImage}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${this.postUsername}</p>
                <a href="#" class="post__profile__community">>>${this.communityName}</a>
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
        //implementation
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