import { fetchData } from './dataFetcher.js';
import { renderPosts } from './post.js';

// Fetch the data
const data = await fetchData();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const date = urlParams.get('publishedDate');

// Filter the data based on the category and date parameters
const trendButtonElement = document.getElementById("trendButton");
const newButtonElement = document.getElementById("newButton");
console.log(Date.parse(posts[0].publishedDate));
var filteredDate = posts.filter(post => Date.parse(post.publishedDate).getDate() < currentDate.getDate() - 7);
console.log(filteredDate);
var filteredTrend = posts.filter(post => Date.parse(post.publishedDate).getDate() < currentDate.getDate() - 7);
console.log(filteredTrend);

addEventListenerToTrend(filteredDate, trendButtonElement);
addEventListenerToNew(filteredTrend, newButtonElement);


function addEventListenerToNew(filteredData, postElement) {
  postElement.addEventListener("click", (filteredData) => {
    window.location.href = `selectedcommunity.html?communityId=${communityId}/latest`;
    return filteredData;
  });
};
function addEventListenerToTrend(filteredData, postElement) {
  postElement.addEventListener("click", (filteredData) => {
    window.location.href = `selectedcommunity.html?communityId=${communityId}/trend`;
    return filteredData;
  });
};
function renderPosts(filteredData) {
    var postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";
    filteredData.record.community[communityId - 1].posts.forEach((post) => {
      // this.myRoot.innerHTML = <p class="post__profile__name">${this.username}</p>;
      var postElement = postsContainer.createElement('article');
      postElement.classList.add('post');
      postElement.id = `recentPost_${filteredData.postId}`;
      postElement.insertAdjacentHTML("afterbegin", `
    
        <div class="post__profile">
            <img src="${filteredData.profileImage}" alt="profile" class="post__profile__img">
            <p class="post__profile__name">${filteredData.username}</p>
            <p class="post__profile__time">${filteredData.timeAgo}</p>
        </div>
        <hr>`);
      var postTitleElement = document.createElement('h3');
      postElement.appendChild(postTitleElement);
      postTitleElement.classList.add('post__title');
      postTitleElement.textContent = filteredData.postTitle;

      postElement.insertAdjacentHTML("beforeend", `
        <p class="post__detail">${filteredData.postDetail}</p>
        <div class="post__reactions">
            <agree-disagree agreeCount=${filteredData.agreeCount} disagreeCount=${filteredData.disagreeCount} isAgreeClicked=${false} isDisAgreeClicked=${false}></agree-disagree>
            <p class="post__reactions__list">
                <i class="fa-regular fa-comment post__reactions__icon"></i>
                <span class="reaction-count">${filteredData.commentCount}</span> Comment
            </p>
            <p class="post__reactions__list">
                <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                <span class="reaction-count">${filteredData.shareCount}</span> Share
            </p>
        </div>
    </article>`);
      postsContainer.appendChild(postElement);
      this.addEventListenerToPostTitle(postTitleElement, filteredData.postId);
    });
}