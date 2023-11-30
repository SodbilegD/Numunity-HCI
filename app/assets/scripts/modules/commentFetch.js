import { isEqualWith } from "lodash";
import Comment from "./CommentClass.js";

function createComment(comment) {
    const newComment = new Comment(comment);
    return newComment.Render();
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
    const postComments = document.getElementById("post-comments");
    console.log(postComments);
    const newButton = postComments.getElementById("comment-new-filter");
    console.log(newButton);
    newButton.addEventListener("click", () => {
        const newComments = allComments.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
        renderCommentList(newComments, commentsContainer, 3);

        if (newComments.length > 3) {
            const newViewMoreButton = document.createElement("button");
            newViewMoreButton.textContent = "View More";
            newViewMoreButton.classList.add("post-comments__view-more");
            newViewMoreButton.addEventListener("click", () => {
                renderCommentList(newComments, commentsContainer, newComments.length);
                newViewMoreButton.style.display = "none";
            });
            commentsContainer.appendChild(newViewMoreButton);
        }
    });
    
    document.getElementById("total-comments").textContent = allComments.length;

    const sendCommentButton = document.getElementById("send-comment-button");
    sendCommentButton.addEventListener("click", async () => {
        const commentInput = document.getElementById("comment-input");
        const newCommentText = commentInput.value.trim();

        if (newCommentText !== "") {
            
            const newComment = {
                id: 11,
                body: newCommentText,
                postId: postId,
                user: {
                    id: 999,
                    username: "comment writer",
                    profileImage: "/assets/images/profile.png"
                },
                publishedDate: new Date().toISOString(),
                // Add any other properties you need
            };

            const updatedComments = allComments.unshift(newComment);

            // Update the comments container with the new comment
            renderCommentList(updatedComments, commentsContainer, updatedComments.length);

            // Clear the input field
            commentInput.value = "";

            // Update the total number of comments
            document.getElementById("total-comments").textContent = updatedComments.length;

            // Send the updated data to jsonbin.io
           // await sendDataToJsonBin(commentsData.record);
        }
    });
}

function renderCommentList(comments, container, size){
    container.innerHTML = "";
    const displayComments = comments.slice(0, size);
    displayComments.forEach(comment => {
        const newComment = createComment(comment);
        container.insertAdjacentHTML("beforeend", newComment);
    });
}