import PostComment from "./post-comment.js";

function createComment(comment) {
    const newComment = new PostComment(comment);
    return newComment.render();
}

export default function renderComments(communityData, communityId, postId) {
    const commentsContainer = document.getElementById("comments-container");
    console.log(commentsContainer);
    commentsContainer.innerHTML = "";
    const allComments = communityData[parseInt(communityId) - 1].posts[parseInt(postId) - 1].comments;
    console.log(allComments);

    renderCommentList(allComments, commentsContainer, 3);

    if (allComments.length > 3) {
        const viewMoreButton = document.createElement("button");
        viewMoreButton.textContent = "View More";
        viewMoreButton.classList.add("post-comments__view-more");
        viewMoreButton.addEventListener("click", () => {
            renderCommentList(allComments, commentsContainer, allComments.length);
            viewMoreButton.style.display = "none";
        });
        commentsContainer.appendChild(viewMoreButton);
    }
    
}

function renderCommentList(comments, container, size){
    container.innerHTML = "";
    const displayComments = comments.slice(0, size);
    displayComments.forEach(comment => {
        const newComment = createComment(comment);
        container.insertAdjacentHTML("beforeend", newComment);
    });
}