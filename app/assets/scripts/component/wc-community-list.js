// import { fetchData } from "../modules/dataFetcher.js";
import timeAgo from "../modules/timeAgo.js";

class TheCommunityList extends HTMLElement {
    constructor() {
        super();
        this.communityContainer = document.getElementById("community-list");
    }

    renderCommunities() {
        this.communityContainer.innerHTML = "";
        this.communities.forEach(community => this.#render(community));
    }

    #render(community) {
        var communityElement = document.createElement('article');
        communityElement.classList.add('post');
        communityElement.id = `${community.communityId}`;
        communityElement.insertAdjacentHTML("afterbegin",`<div class="post__profile">`);
        var titleElement = document.createElement('h3');
        communityElement.appendChild(titleElement);
        titleElement.classList.add('post__title');
        titleElement.textContent = community.communityName;
        const createdDate = timeAgo(Date.parse(community.createdDate));
        communityElement.insertAdjacentHTML("beforeend",`
            </div>
            <hr>
            <p class="post__detail">${community.communityAbout}</p>
            <p class="post__profile__community"><i class="fa-solid fa-users"></i>  Дагагчид: ${community.followers.length}</p>
            <p class="post__profile__community"><i class="fa-solid fa-comments"></i>  Нийт пост: ${community.posts.length}</p>
            <p class="post__profile__community"><i class="fa-solid fa-clock"></i>  Нээгдсэн: ${createdDate}</p>
        `);
        this.communityContainer.appendChild(communityElement);
        this.addEventListenerToTitle(titleElement, community.communityId);
    }

    addEventListenerToTitle(communityElement, communityId) {
        communityElement.addEventListener("click", () => {
            window.location.href = `selectedcommunity.html?communityId=${communityId}`;
        });
    };
    
    async connectedCallback() {
        try {
            const response = await fetch(`http://localhost:3000/community`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            console.log("responsee: ", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            this.communities = data.community;
            this.renderCommunities(); // Assuming data has a property 'community'
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // @FETCHING DATA FROM JSONBIN
    // async connectedCallback() {
    //     try {
    //         const jsondata = await fetchData();    
    //         this.communities = jsondata.record.community;
    //         this.renderCommunities();

    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }

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

window.customElements.define('the-community-list', TheCommunityList);