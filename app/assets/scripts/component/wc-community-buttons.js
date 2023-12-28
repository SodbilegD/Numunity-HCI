class CommunityButtons extends HTMLElement {
    constructor() {
        super();
        this.#render();
        //implementation
    }
    #render(){
        this.innerHTML = `
            <section class="community">
                <div id="community"></div>
                <button type="button" class="btn community__join-button"></button>
                <button type="button" class="btn community__new-button" id="newButton">шинэ</button>
                <button type="button" class="btn community__trending-button" id="trendButton">тренд</button>
            </section>
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

window.customElements.define('community-buttons', CommunityButtons);