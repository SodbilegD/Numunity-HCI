import { fetchData } from "../modules/dataFetcher.js";

const jsondata = await fetchData();
const currentUrl = new URL(window.location.href);
const communityId = currentUrl.searchParams.get('communityId');
console.log(communityId);
const community = jsondata.record.community[communityId-1];

// community.createdDate.setHours(0, 0, 0, 0);
class theCommunitySection extends HTMLElement {
    constructor() {
        super();
        this.communityId = community.communityId;
        this.communityName = community.communityName;
        this.communityAbout = community.communityAbout;
        this.communityCreatedDate = community.createdDate;
        this.followersLength = community.followers.length;
        this.postsLength = community.posts.length;
        this.#render();
    }
    #render() {
        document.getElementById("community").insertAdjacentHTML('afterbegin', `
            <h1 class="community__name">>> ${this.communityName}</h1>`);
        document.getElementById("community-detail").insertAdjacentHTML('afterbegin', `
            <h3 class="advertisements__info__title">${this.communityName}</h3>
            <hr>
            <p class="advertisements__info__detail">${this.communityAbout}</p>
            <p class="advertisements__info__opened"><i class="fa-solid fa-clock"></i>Нээгдсэн: ${this.communityCreatedDate}</p>
            <div class="advertisements__info__container">
                <p class="advertisements__info__followers">Дагагчид<br><span>${this.followersLength}</span></p>
                <hr>
                <p class="advertisements__info__total">Нийт пост<br><span>${this.postsLength}</span></p>
            </div>
        `);
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

window.customElements.define('the-community-section', theCommunitySection);