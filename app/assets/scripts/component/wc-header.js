import WcButton from "./wc-button.js";
window.customElements.define('wc-button', WcButton);
//header web component
class WcHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
            .main-header {
                margin: 0.75rem 0;
                background-color: var(--color-white);
                color: var(--color-main);
                padding: 0 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 0.5rem;
            }
            
            .main-header__container1 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .main-header__container1__logo {
                width: 2rem;
                height: 2rem;
            }
            
            .main-header__container1__title {
                font-size: var(--desktop-text-medium);
            }
            
            .main-header__search-bar {
                display: flex;
                align-items: center;
                width: calc(100% / 3);
                padding: 0.25rem 1.25rem;
                border-radius: 1.25rem;
                background-color: var(--color-background-white);
            }
            
            .main-header__search-field {
                width: 100%;
                padding: 0.25rem;
                margin: 0 0.5rem;
                border: none;
                background-color: transparent;
            }
            
            .main-header__search-field:focus {
                outline: none;
            }
            
            .main-header__search-field::placeholder {
                font-size: var(--desktop-text-small);
                color: var(--color-main);
            }
            
            .main-header__container2 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 4rem;
                color: var(--color-main);
            }
            
            .main-header__container2--icons {
                gap: 4rem;
            }
            
            .main-header__container2--buttons {
                gap: 1rem;
            }
            
            .main-header__container2__notif,
            .main-header__container2__profile {
                text-decoration: none;
                font-size: 1.25rem;
                color: var(--color-main);
            }
            
            .main-header__container2__user {
                display: none;
            }

            @media (max-width: 860px) {
                .main-header{
                    padding: 0 1rem;
                }
                .main-header__container1{
                    padding: 0 1rem;
                }
                .main-header__container1__logo{
                    width: 1.5rem;
                    height: 1.5rem;
                }
                .main-header__container1__title{
                    font-size: var(--tablet-text-medium);
                }
                .main-header__search-field::placeholder{
                    font-size: var(--tablet-text-small);
                }
                .main-header__container2--icons{
                    gap: 2rem;
                }           
            }
            
            @media (max-width: 693px) {
                
                .main-header__container1__logo{
                    width: 1rem;
                    height: 1rem;
                }
                .main-header__container1__title{
                    font-size: var(--mobile-text-medium);
                }
                .main-header__search-field::placeholder{
                    font-size: var(--mobile-text-small);
                }
                .main-header__search-bar{
                    width: 0;
                    padding: 0;
                    margin: 0;
                }
                .main-header__search-field{
                    display: none;
                }
                .main-header__container2--icons{
                    gap: 1rem;
                }
                .main-header__container2__user{
                    display: none;
                }           
            }
            </style>
            <header class="main-header">
                <div class="toggle" id="hamburger-toggle">
                    <span class="toggle__line topline"></span>
                    <span class="toggle__line midline"></span>
                    <span class="toggle__line bottomline"></span>
                </div>
                <div class="main-header__container1">
                    <img src="assets/images/logo.png" alt="Team DKS logo" class="main-header__container1__logo">
                    <h2 class="main-header__container1__title">DKS</h2>
                </div>
                <form class="main-header__search-bar">
                    <i class="fa-solid fa-magnifying-glass" class="main-header__search-icon"></i>
                    <input type="text" label="Search" placeholder="Хайлт хийх" class="main-header__search-field">
                </form>
                <div class="main-header__container2 main-header__container2--buttons" id="header-button">
                    <wc-button buttonType="login"></wc-button>
                    <wc-button buttonType="signup"></wc-button>
                    <i class="fa-regular fa-user main-header__container2__user"></i>
                </div>
            </header>
        `;
        // hamburger tsesnii button toggle
        const toggle = this.querySelector("#hamburger-toggle");
        toggle.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("toggleSidebar"));
        });
        if(document.cookie !== null){
            const header = document.getElementById("header-button");
            header.classList.add("main-header__container2__user");
            header.classList.remove("main-header__login-button");
            header.classList.remove("main-header__signup-button");
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

window.customElements.define('wc-header', WcHeader);