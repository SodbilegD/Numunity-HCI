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
        
        const toggle = document.querySelector(".toggle");
        const slide = document.querySelector(".slide");
        const slideTitle = document.querySelector(".slide__title");
        const slideList = document.querySelector(".slide__list");
        const slideItems = document.querySelectorAll(".slide__list__item");

        let showMenu = false;
        toggle.addEventListener("click", () => {
            if (!showMenu) {
                toggle.classList.add("close");
                slide.classList.add("show");
                slideTitle.classList.add("show");
                slideList.classList.add("show");
                slideItems.forEach((item) =>
                    item.classList.add("show"));

                // Reset the menu state
                showMenu = true;
            } else {
                toggle.classList.remove("close");
                slide.classList.remove("show");
                slideTitle.classList.remove("show");
                slideList.classList.remove("show");
                slideItems.forEach((item) =>
                    item.classList.remove("show"));

                // Reset the menu state
                showMenu = false;
            }
        });
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