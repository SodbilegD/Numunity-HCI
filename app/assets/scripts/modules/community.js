export class community {
    constructor(temp) {
        this.communityId = temp.communityId;
        this.communityName = temp.communityName;
        this.communityAbout = temp.communityAbout;
        this.createdDate = temp.createdDate;
        this.followers = temp.followers;
        this.posts = temp.posts;
    }

    Render() {
        // document.getElementById("community").innerHTML = "";
        console.log(document.getElementById("community"));
        document.getElementById("community").insertAdjacentHTML('afterbegin', `
            <h1 class="community__name">>> ${this.communityName}</h1>`);
    
        document.getElementById("community-detail").innerHTML = "";
        document.getElementById("community-detail").insertAdjacentHTML('afterbegin', `
            <h3 class="advertisements__info__title">${this.communityName}</h3>
            <hr>
            <p class="advertisements__info__detail">${this.communityAbout}</p>
            <p class="advertisements__info__opened"><i class="fa-solid fa-clock"></i>Нээгдсэн: ${this.createdDate}</p>
            <div class="advertisements__info__container">
                <p class="advertisements__info__followers">Дагагчид<br><span>${this.followers.length}</span></p>
                <hr>
                <p class="advertisements__info__total">Нийт пост<br><span>${this.posts.length}</span></p>
            </div>
        `);
    }
    
}

class Community extends HTMLElement {
    constructor(temp) {
        super();
        this.communityId = temp.communityId;
        this.communityName = temp.communityName;
        this.communityAbout = temp.communityAbout;
        this.createdDate = temp.createdDate;
        this.followers = temp.followers;
        this.posts = temp.posts;
    }
    #render() {
        // document.getElementById("community").innerHTML = "";
        console.log(document.getElementById("community"));
        document.getElementById("community").insertAdjacentHTML('afterbegin', `
            <h1 class="community__name">>> ${this.communityName}</h1>`);
    
        document.getElementById("community-detail").innerHTML = "";
        document.getElementById("community-detail").insertAdjacentHTML('afterbegin', `
            <h3 class="advertisements__info__title">${this.communityName}</h3>
            <hr>
            <p class="advertisements__info__detail">${this.communityAbout}</p>
            <p class="advertisements__info__opened"><i class="fa-solid fa-clock"></i>Нээгдсэн: ${this.createdDate}</p>
            <div class="advertisements__info__container">
                <p class="advertisements__info__followers">Дагагчид<br><span>${this.followers.length}</span></p>
                <hr>
                <p class="advertisements__info__total">Нийт пост<br><span>${this.posts.length}</span></p>
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

window.customElements.define('community', Community);