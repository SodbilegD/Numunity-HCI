import { fetchData } from "./dataFetcher.js";

async function initialize() {
    const jsondata = await fetchData();
    const community = jsondata.record.community[0];
    // this.jsondata = JSON.parse(localStorage.getItem("jsondata"));
    console.log(community);
    const postContainer = document.getElementById("community-detail");
    const postItem = document.createElement("the-community-section");
    postItem.setAttribute("communityId", community.communityId);
    postItem.setAttribute("communityName", community.communityName);
    postItem.setAttribute("communityAbout", community.communityAbout);
    postItem.setAttribute("communityCreatedDate", community.createdDate);
    postItem.setAttribute("followersLength", community.followers.length);
    postItem.setAttribute("postsLength", community.posts.length);
    
    // postContainer.appendChild(postItem);
    // console.log(postContainer);
    // Assuming that the post-item custom element has a setPostData method
    //if (typeof postItem.setPostData === "function") {
    // } else {
    //     console.error("setPostData method not found on post-item element.");
    // }
}

initialize();