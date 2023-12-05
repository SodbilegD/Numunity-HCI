class PostComment extends HTMLElement {
    constructor(commentData) {
        super();
        //implementation
        this.id = commentData.id;
        this.body = commentData.body;
        this.username = commentData.user.username;
        this.profileImage = commentData.user.profileImage;
        this.publishedDate = commentData.publishedDate;
    }

    #render(){
        this.innerHTML = 
        `<div class="single-comment" id="single-comment_${this.getAttribute(this.id)}">
            <div class="single-comment__profile">
                <img src="${this.profileImage}" alt="profile" class="single-comment__profile__img">
                <p class="single-comment__profile__name">${this.username}</p>
            </div>
            <p class="single-comment__detail">${this.body}</p>

            <div class="single-comment__reactions">                            
                <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-up"></i>Agree</p>
                <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-down"></i></p>                                
                <p class="single-comment__reactions__list"><i class="fa-solid fa-reply"></i>Reply</p>
            </div>
        </div>`
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

window.customElements.define('post-comment', PostComment);