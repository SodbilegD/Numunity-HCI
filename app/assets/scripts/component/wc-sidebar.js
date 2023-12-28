//Sidebar component
class WcSidebar extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        this.innerHTML = `
        <nav class="slide">
            <h1 class="slide__title">Цэс</h1>
            <ul class="slide__list">
                <li class="slide__list__item"><a href="#"><i class="fa-solid fa-house"></i>Нүүр хуудас</a></li>
                <li class="slide__list__item"><i class="fa-solid fa-comments"></i>Хэлэлцүүлэг
                    <ul>
                        <li class="slide__list__subitem"><a href="selectedcommunity.html?communityId=1">Веб програмчлал</a></li>
                        <li class="slide__list__subitem"><a href="selectedcommunity.html?communityId=2">Гоё хоол</a></li>
                    </ul>
                </li>
                <li class="slide__list__item"><a href="#"><i class="fa-solid fa-comment-dots"></i>Chat өрөө</a></li>
                <li class="slide__list__item"><a href="#"><i class="far fa-user"></i>Миний профайл</a></li>
                <li class="slide__list__item slide__list__item--logout"><a href="#"><i class="fa-solid fa-right-from-bracket"></i>Гарах</a></li>
            </ul>
        </nav>
        `;

        document.addEventListener("toggleSidebar", () => {
            this.toggleSidebar();
        })
    }

    toggleSidebar() {
        const slide = this.querySelector(".slide");
        slide.classList.toggle("show");
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

window.customElements.define('wc-sidebar', WcSidebar);