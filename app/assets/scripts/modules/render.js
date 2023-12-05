
import { fetchData } from "./dataFetcher.js";

async function initialize() {
    const jsondata = await fetchData();
    const post = jsondata.record.community[0].posts[0];

    const postContainer = document.getElementById("posts-container");
    const postItem = document.createElement("post-item");
    postItem.setAttribute("postId", post.postId);
    postItem.setAttribute("profileName", post.user.username);
    postContainer.appendChild(postItem);
    console.log(postContainer);
    // Assuming that the post-item custom element has a setPostData method
    //if (typeof postItem.setPostData === "function") {
    // } else {
    //     console.error("setPostData method not found on post-item element.");
    // }
}

initialize();