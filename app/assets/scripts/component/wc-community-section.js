// import { fetchData } from "../modules/dataFetcher.js";
// import { sendDataToJsonBin } from "../modules/dataFetcher.js";

//post-comment tag. discussion dr ashiglaj bga

class PostComment extends HTMLElement {
    constructor() {
        super();
        this.postsContainer = document.getElementById("posts-container");
        this.commentsContainer = document.getElementById("comments-container");
        this.commentCounter = document.getElementById("total-comments");
         
        this.trendCommentButton = document.getElementById("comment-trend-filter");
        this.trendCommentButton.addEventListener("click", this.filterTrend.bind(this));

        const sendCommentButton = document.getElementById("send-comment-button");
        sendCommentButton.addEventListener("click", this.handleSendComment.bind(this));
    }

    async connectedCallback() {
        try {
            const currentUrl = new URL(window.location.href);
            this.communityId = currentUrl.searchParams.get('communityId');
            this.postId = currentUrl.searchParams.get('postId');
            const response = await fetch(`http://localhost:3000/discussion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ communityId: this.communityId , postId: this.postId }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            this.users = data.user;
            this.community = data.community;
            this.post = this.community.posts.find(e => e.postId === this.postId);
            this.comments = this.post.comments;
            this.sessions = data.sessions;

            this.renderSinglePost(this.post);
            this.renderComments(this.comments);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    renderComments(comments) {
        this.commentsContainer.innerHTML = "";
        comments.forEach(comment => { 
            const userId = comment.user;
            const user = this.users.find(user => user.userId === parseInt(userId));
            this.#render(comment, user)
        });
        this.commentCounter.innerHTML = this.comments.length;
    }

    #render(comment, user){
        this.commentPublishedDate = comment.publishedDate;
        
        var commentElement = document.createElement('div');
        commentElement.classList.add('single-comment');
        commentElement.id = `single-comment_${(comment.commentId)}`;

        commentElement.insertAdjacentHTML("afterbegin",
        `<div class="single-comment__profile">
                <img src="${user.profImg}" alt="profile" class="single-comment__profile__img">
                <p class="single-comment__profile__name">${user.userName}</p>
            </div>
            <p class="single-comment__detail">${comment.body}</p>

            <div class="single-comment__reactions">
                <agree-disagree agreeCount=${comment.agreeCount} disagreeCount=${comment.disagreeCount} isAgreeClicked=${false} isDisAgreeClicked=${false}></agree-disagree>                                                           
                <p class="single-comment__reactions__list"><i class="fa-solid fa-reply"></i>Reply</p>
            </div>`);
        this.commentsContainer.appendChild(commentElement);        
    }

    renderSinglePost(post) {
        const userId = post.user;
        const user = this.users.find(user => user.userId === parseInt(userId));

        this.postsContainer.innerHTML = `
        <article class="post" id="recentPost_${post.postId}">
            <div class="post__profile" id="posts-container">
                <img src="${user.profImg}" alt="profile" class="post__profile__img">
                <p class="post__profile__name">${user.userName}</p>
                <a href="selectedcommunity.html?communityId=${this.community.communityId}" class="post__profile__community">>>${this.community.communityName}</a>
            </div>
            <hr>
            <h1 class="post__title">${post.postTitle}</h1>
            <p class="post__detail">${post.postDetail}</p>
            <div class="post__reactions post__reactions--hidden">
                <agree-disagree agreeCount="${post.agreeCount}" disagreeCount="${post.disagreeCount}"></agree-disagree>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-comment post__reactions__icon"></i>
                    <span class="reaction-count">${post.comments.length}</span> Comment
                </p>
                <p class="post__reactions__list">
                    <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                    <span class="reaction-count">${post.shareCount}</span> Share
                </p>
            </div>
            <p class="post__profile__time post__profile__time--down">1h ago</p>
        </article>`;
    }

    filterTrend() {
        const currentDate = new Date();
        const filteredTrend = this.comments.filter(comment =>
        Date.parse(comment.publishedDate) > currentDate - 7 && comment.agreeCount > 10
        );

        this.renderComments(filteredTrend);
    }

    async handleSendComment() {
        const currentUrl = new URL(window.location.href);
        const communityId = currentUrl.searchParams.get('communityId');
        const postId = currentUrl.searchParams.get('postId');
        const commentCounter = document.getElementById("total-comments");
        const commentInput = document.getElementById("comment-input");
        console.log(commentInput.value);
        const newCommentText = commentInput.value.trim();
        
        if (newCommentText !== "") {
            
            const response = await fetch("http://localhost:3000/getuser",
            {
                method: 'POST',
                cache: "no-cache",
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                }
            });
            console.log("responseeeee",response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const user = data.user;

            const newComment = {
                id: commentCounter.innerHTML,
                body: newCommentText,
                user: user.userId,
                publishedDate: new Date().toISOString(),
                agreeCount: 0,
                disagreeCount: 0
            };

            const otherResponse = await fetch("http://localhost:3000/addnewcomment",
            {
                method: 'POST',
                cache: "no-cache",
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ communityId: communityId, postId: postId, newComment: newComment})
            });
            if (!otherResponse.ok) {
                throw new Error(`HTTP error! Status: ${otherResponse.status}`);
            }
            const otherdata = await otherResponse.json();
            this.comments = otherdata.comments;
            this.renderComments(this.comments);
            commentInput.value = "";
        };}

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