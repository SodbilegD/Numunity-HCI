//Sidebar component
class WcSidebar extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
            .slide {
                width: 15rem;
                background-color: var(--color-white);
                transition: 0.5s ease;
                border-radius: 0.5rem;
                padding: 1rem;
                display: none;
                height: 98%;
                margin: 0 1rem 1rem 0;
            }
          
            .slide__title {
                color: var(--color-black);
                font-size: var(--desktop-text-medium);
                text-align: center;
            }
            
            .slide__list {
                display: flex;
                flex-direction: column;
                padding: 0;
            }
            
            .slide__list__item {
                list-style: none;
                margin: 0;
                padding: 2rem 1rem 0 1rem;
                font-size: var(--desktop-text-small);
                transition: transform 0.3s ease;
                cursor: pointer;
            }
            
            .slide__list__item--logout {
                margin-top: auto;
            }
            
            .slide__list__item a {
                text-transform: capitalize;
                text-decoration: none;
                color: var(--color-black);
            }
            
            .slide__list__item:hover {
                transform: translateX(1.5rem);
                color: var(--color-main);
                font-weight: 700;   
            }
            
            .slide__list__item:hover a {
                color: var(--color-main);
                font-weight: 700;
            }
            
            .slide__list__item i {
                padding-right: 1rem;
            }

            .slide__list__subitem{
                padding-top: 1rem;
                transition: transform 0.3s ease;
            }

            .slide__list__subitem:hover {
                transform: translateX(1rem);
            }
            
            .slide.show {
                display: block;
            }
          
            .toggle {
                display: flex;
                flex-direction: column;
                gap: 0.3rem;
                cursor: pointer;
                transition: all 0.3s ease-out;
            }
            
            .toggle__line {
                height: 0.2rem;
                width: 1.5rem;
                background-color: var(--color-main);
                transition: all 0.3s ease-out;
            }
            
            .toggle.close {
                transform: rotate(180deg);
            }
            
            .toggle.close .topline {
                transform: rotate(45deg) translate(0.3rem, 0.3rem);
            }
            
            .toggle.close .midline {
                opacity: 0;
            }
            
            .toggle.close .bottomline {
                transform: rotate(-45deg) translate(0.4rem, -0.4rem);
            }
          
            @media (max-width: 860px) {            
                .slide{
                    width: 9rem;
                    padding: 0.5rem;
                }
                .slide__title{
                    font-size: var(--tablet-text-medium);
                }
                .slide__list__item{
                    font-size: var(--tablet-text-small);
                }
                .slide__list__item:hover{
                    transform: translateX(0.75rem);
                }
                .slide__list__item i{
                    padding-right: 0.3rem;
                }
                .toggle{
                    gap: 0.2rem;
                }
                .toggle__line{
                    height: 0.15rem;
                    width: 1.2rem;
                }
                .toggle.close .topline{
                    transform: rotate(45deg) translate(0.2rem, 0.2rem);
                }
                .toggle.close .bottomline {
                    transform: rotate(-45deg) translate(0.3rem, -0.3rem);
                }
            }
            
            @media (max-width: 693px) {
                .slide{
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
                .slide__title{
                    padding-top: 3rem;
                    text-align: center;
                }
                .slide__list__item{
                    padding: 1rem 2rem;
                }
                .slide__list__item:hover{
                    transform: translateX(0.75rem);
                }
                .slide__list__item i{
                    padding-right: 0.3rem;
                }
                .toggle{
                    z-index: 2;
                    gap: 0.15rem;
                }
                .toggle__line{
                    height: 0.15rem;
                    width: 1rem;
                }
                .toggle.close .topline{
                    transform: rotate(45deg) translate(0.175rem, 0.175rem);
                }
                .toggle.close .bottomline {
                    transform: rotate(-45deg) translate(0.25rem, -0.25rem);
                }            
            }
        </style>
        <nav class="slide">
            <h1 class="slide__title">Цэс</h1>
            <ul class="slide__list">
                <li class="slide__list__item"><a href="index.html"><i class="fa-solid fa-house"></i>Нүүр хуудас</a></li>
                <li class="slide__list__item"><i class="fa-solid fa-comments"></i><a href="community.html">Хэлэлцүүлэг</a>
                    <ul>
                        <li class="slide__list__subitem"><a href="selectedcommunity.html?communityId=1">Хүн Ком Харилцаа</a></li>
                        <li class="slide__list__subitem"><a href="selectedcommunity.html?communityId=2">Гоё хоолтой газар хаана байна?</a></li>
                        <li class="slide__list__subitem"><a href="selectedcommunity.html?communityId=3">МУИС-МТЭС-МКУТ оюутнууд</a></li>
                        <li class="slide__list__subitem"><a href="selectedcommunity.html?communityId=4">Кинонд дурлагсад</a></li>
                    </ul>
                </li>
                <li class="slide__list__item"><a href="chat.html"><i class="fa-solid fa-comment-dots"></i>Chat өрөө</a></li>
                <li class="slide__list__item"><a href="profile.html"><i class="far fa-user"></i>Миний профайл</a></li>
            </ul>
        </nav>
        `;
        const logoutLink = document.querySelector(".slide__list__item--logout");
        const toggle = document.querySelector(".toggle");
        const slide = document.querySelector(".slide");
        const slideTitle = document.querySelector(".slide__title");
        const slideList = document.querySelector(".slide__list");
        const slideItems = document.querySelectorAll(".slide__list__item");

        let showMenu = false;
        // click hiih uyd sidebariig haruulna
        toggle.addEventListener("click", () => {
            if (!showMenu) {
                toggle.classList.add("close");
                slide.classList.add("show");
                slideTitle.classList.add("show");
                slideList.classList.add("show");
                slideItems.forEach((item) => item.classList.add("show"));
                // Reset the menu state
                showMenu = true;
            } else {
                toggle.classList.remove("close");
                slide.classList.remove("show");
                slideTitle.classList.remove("show");
                slideList.classList.remove("show");
                slideItems.forEach((item) => item.classList.remove("show"));
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