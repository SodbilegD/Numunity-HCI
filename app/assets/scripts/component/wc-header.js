// import WcSidebar from "./wc-sidebar.js";
// window.customElements.define('wc-sidebar', WcSidebar);

class WcHeader extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        this.innerHTML = `
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
                <div class="main-header__container2 main-header__container2--buttons">
                    <button type="button" class="main-header__login-button btn btn--op btn--login" onclick="window.location.href='login.html'">Нэвтрэх</button>
                    <button type="button" class="main-header__signup-button  btn btn--signup">Бүртгүүлэх</button>
                    <i class="fa-regular fa-user main-header__container2__user"></i>
                </div>
            </header>
        `;

        const toggle = this.querySelector("#hamburger-toggle");
        toggle.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("toggleSidebar"));
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

window.customElements.define('wc-header', WcHeader);