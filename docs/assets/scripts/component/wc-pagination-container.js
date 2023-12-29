class PaginationContainer extends HTMLElement {
    constructor() {
        super();
        //implementation
        this.#render();
    }

    #render(){
        this.innerHTML = `
        <nav class="pagination-container">
            <button class="pagination-button" id="prev" aria-label="Previous page" title="Previous page">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
                <div id="pagination" class="pagination"></div>
            <button class="pagination-button" id="next" aria-label="Next page" title="Next page">
                <i class="fa-solid fa-arrow-right"></i> 
            </button>
        </nav>
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

window.customElements.define('pagination-container', PaginationContainer);