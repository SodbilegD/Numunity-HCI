class WritePost extends HTMLElement {
    constructor() {
        super();
        //implementation
        this.#render();
    }
    #render(){
        this.innerHTML = `
        <form class="write-post">
            <img src="/assets/images/profile.png" alt="profile" class="write-post__prof">
            <textarea class="write-post__status-box" rows="1" placeholder="What's on your mind?" ></textarea>
            <a href="#" class="write-post__img-icon"><i class="fa-solid fa-image"></i></a>
        </form>
        `
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

window.customElements.define('write-post', WritePost);