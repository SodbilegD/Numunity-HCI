function createPostElement(post) {
    const newPost = new RecentPostItem(post);
    const postElement = document.createElement("article");
    postElement.classList.add("post");
    postElement.id = 'recentPost_${post.postId}';
    postElement.innerHTML = newPost.Render();
    const viewPost = postElement.querySelector(".post__title");
    console.log(viewPost);
    viewPost.addEventListener("click", function () {
        window.location.href = `discussion.html?communityID=${communityID}&postId=${post.postId}`;
    });
    return postElement;
}


moveToPostDetails = document.getElementsByTagName("article").addEventListener("click", 
        function(postId) {
            const nowUrl = window.location.href;
            let newUrl = nowUrl.replace("selectedcommunity.html" , "discussion.html");
            newUrl += `?communityId=${communityId}&postId=${postId}`;
            window.location.href = newUrl;
})