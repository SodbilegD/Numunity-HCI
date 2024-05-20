import WcButton from "./wc-button.js";
window.customElements.define('wc-button', WcButton);
//header web component
class WcHeader extends HTMLElement {
    constructor() {
        super();
        const loginButton = this.querySelector("#loginButton");
        const signupButton = this.querySelector("#signupButton");
        const logoutButton = this.querySelector("#logoutButton");
    }

    connectedCallback(){
        this.render();
    }

    render() {
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
                    <img src="assets/images/logo.png" alt="Team Numunity logo" class="main-header__container1__logo">
                    <h2 class="main-header__container1__title">Numunity</h2>
                </div>
                <form class="main-header__search-bar">
                    <i class="fa-solid fa-magnifying-glass" class="main-header__search-icon"></i>
                    <input type="text" label="Search" placeholder="Хайлт хийх" class="main-header__search-field">
                </form>
                <div class="main-header__container2 main-header__container2--buttons" id="header-button">
                    <wc-button id="loginButton" buttonType="login"></wc-button>
                    <wc-button id="signupButton" buttonType="signup"></wc-button>
                    <wc-button id="logoutButton" buttonType="logout"></wc-button>
                </div>
            </header>
        `;
        //login hiigdegu uyd logoutbutton alga bolgoh
        logoutButton.style.display = "none";
        const toggle = this.querySelector("#hamburger-toggle");
        //click hiigdeh uyd sidebar garch irne
        toggle.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("toggleSidebar"));
        });
        //login uguig checkleh
        this.UserLoginCheck();        
    }

    async UserLoginCheck(){
        const response = await fetch("http://localhost:3000/getuser",
        {
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const sessionId = data.sessionId;
            console.log("user's session id", sessionId);
            //login hiigdsen uyd alga bolgono
            loginButton.style.display = "none";
            signupButton.style.display = "none";
            logoutButton.style.display = "block";
            //logout hiih func
            logoutButton.addEventListener("click", async () => {
                try {
                    const logoutResponse = await fetch("http://localhost:3000/logout", {
                        method: 'POST',
                        cache: "no-cache",
                        headers: {
                            "Content-Type": 'application/json; charset=UTF-8'
                        },
                        //user session ID-g 
                        body: JSON.stringify({ sessionId: sessionId})
                    });

                    if (logoutResponse.ok) {
                        window.location.href="index.html";
                        alert("User logged out successfully");
                    } else {
                        alert("Not logged out?");
                        console.error("Error logging out:", logoutResponse.statusText);
                    }
                } catch (error) {
                    console.error("Error logging out:", error);
                }
            })
        } else {
            loginButton.style.display = "block";
            signupButton.style.display = "block";
            logoutButton.style.display = "none";
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