import { fetchData } from "../modules/dataFetcher.js";

class theCommunitySection extends HTMLElement {
    constructor() {
        super();
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
    async connectedCallback() {
        try {
            const jsondata = await fetchData();
            const currentUrl = new URL(window.location.href);
            this.communityId = currentUrl.searchParams.get('communityId');
    
            const community = jsondata.record.community[this.communityId - 1];
            this.communityName = community.communityName;
            this.communityAbout = community.communityAbout;
            this.communityCreatedDate = community.createdDate;
            this.followersLength = community.followers.length;
            this.postsLength = community.posts.length;

            this.#render();

        } catch (error) {
            console.error('Error fetching data:', error);
        }
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