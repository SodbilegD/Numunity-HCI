class NavigationBar extends HTMLElement {
    constructor() {
        super();
        this.#render();
        //implementation
        
    }
     #render(){
        this.innerHTML = `
        <nav class="slide">
            <h1 class="slide__title">Цэс</h1>
            <ul class="slide__list">
                <li class="slide__list__item"><a href="#"><i class="fas fa-tv"></i>dashboard</a></li>
                <li class="slide__list__item"><a href="#"><i class="far fa-user"></i>profile</a></li>
                <li class="slide__list__item"><a href="#"><i class="fab fa-gripfire"></i>trending</a></li>
                <li class="slide__list__item"><a href="#"><i class="far fa-comment"></i>messages</a></li>
                <li class="slide__list__item"><a href="#"><i class="far fa-folder"></i>file manager</a></li>
                <li class="slide__list__item"><a href="#"><i class="far fa-address-book"></i>portfolio</a></li>
                <li class="slide__list__item"><a href="#"><i class="far fa-heart"></i>saved</a></li>
                <li class="slide__list__item"><a href="#"><i class="fas fa-cogs"></i>settings</a></li>
            </ul>
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

window.customElements.define('navigation-bar', NavigationBar);