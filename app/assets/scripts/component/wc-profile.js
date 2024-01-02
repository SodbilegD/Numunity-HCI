// import { community } from './wc-community-section.js';
// window.customElements.define('the-community-section', theCommunitySection);

class WcProfile extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    async connectedCallback() {
        const savedCommunity = document.getElementById("posts-container");
        const response = await fetch("http://localhost:3000/getuser",
            {
                method: 'POST',
                cache: "no-cache",
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.user = data.user;
            console.log(this.user);

            const response2 = await fetch(`http://localhost:3000/community`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            if (!response2.ok) {
                throw new Error(`HTTP error! Status: ${response2.status}`);
            }
            const result = await response2.json();
            this.community = result.community;
            console.log("this community", this.community);
            console.log(this.user.savedCommunities);

            this.user.savedCommunities.forEach(async communityId => {
                const matchingCommunity = this.community.find(community => community.communityId === communityId);
                if (matchingCommunity) {
                    const communityName = matchingCommunity.communityName;
                    savedCommunity.insertAdjacentHTML("beforeend", `
                        <p>${communityName}</p><br>
                    `);
                }
            });
            this.render();
            
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

        communityElement.insertAdjacentHTML("beforeend",`
            </div>
            <hr>
            <p class="post__detail">${community.communityAbout}</p>
            <p class="post__profile__community"><i class="fa-solid fa-users"></i>  Дагагчид: ${community.followers.length}</p>
            <p class="post__profile__community"><i class="fa-regular fa-comments"></i>  Нийт пост: ${community.posts.length}</p>
            <p class="post__profile__time post__profile__time--down">${community.createdDate}</p>
        `);
        this.communityContainer.appendChild(communityElement);
        this.addEventListenerToTitle(titleElement, community.communityId);
    }

    render(){
        this.innerHTML = `
            <section class="userprofile">
                <img src="${this.user.profImg}" alt="profile" class="userprofile__img">
                <h2 class="userprofile__username">${this.user.userName}</h2>
            </section>
        `;
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

window.customElements.define('wc-profile', WcProfile);