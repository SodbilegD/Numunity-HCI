 class WcButton extends HTMLElement {
    constructor() {
        super();
        this.buttonType = this.getAttribute("buttonType") ?? "default";
        this.joined = this.getAttribute("joined") ?? false;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Create a button element
        const button = document.createElement('button');
        button.type = 'button';

        // Add specific classes based on buttonType
        switch (this.buttonType) {
            case "login": 
                button.classList.add("main-header__login-button", "btn", "btn--op", "btn--login");
                button.textContent = "Нэвтрэх";
                button.onclick = () => {
                    window.location.href = 'login.html';
                };
                break;
            case "signup": 
                button.classList.add("main-header__signup-button", "btn", "btn--signup");
                button.textContent = "Бүртгүүлэх";
                break;
            case "logout": 
                button.classList.add("main-header__logout-button", "btn", "btn--op", "btn--logout");
                button.textContent = "Гарах";
                break;
            case "join": 
                button.classList.add("btn", "community__join-button");
                button.textContent = "";
                button.setAttribute("joined", false);
                break;
            case "new": 
                button.classList.add("btn", "community__new-button", "btn--new");
                button.textContent = "шинэ";
                break;
            case "trend": 
                button.classList.add("btn", "community__trending-button", "btn--trend");
                button.textContent = "тренд";
                break;
            case "send":
                button.classList.add("btn", "write-comment__send-button");
                button.textContent = "илгээх";
                break;
            default: 
                button.classList.add("btn");
                button.textContent = "Default";
                break;
        }

        // Insert the button element into the innerHTML
        this.shadowRoot.innerHTML = `
        <style>
            .btn {
                background-color: var(--color-main);
                color: var(--color-white);
                padding: 0.5rem 1.5rem;
                border: 1px solid var(--color-main);
                border-radius: 2rem;
                font-size: var(--desktop-text-small);
                font-family: 'Comfortaa', cursive;
                cursor: pointer;
            }
            
            .btn--op {
                background-color: var(--color-white);
                color: var(--color-main);
            }

            .btn--logout{
                display: block;
            }
            
            .btn:hover {
                color: var(--color-main);
                background-color: var(--color-background-white);
            }
            
            .btn--op:hover {
                background-color: var(--color-main);
                color: var(--color-white);
            }
            
            /* Mixins */
            @media (max-width: 860px) {
                .btn {
                    font-size: var(--tablet-text-small);
                    padding: 0.4rem 0.8rem;
                }
            }
            
            @media (max-width: 693px) {
                .btn {
                    font-size: var(--mobile-text-small);
                    padding: 0.25rem 0.75rem;
                }
                .btn--login,
                .btn--signup {
                    display: none;
                }
            }

            .community__join-button {
                margin-left: 1rem;
                margin-right: auto;
            }
            
            .community__join-button::before {
                content: "нэгдэх";
            }
            
            .community__trending-button {
                margin-left: 1rem;
            }
        </style>
        `;
        this.shadowRoot.appendChild(button);
    }

    disconnectedCallback() {
        // Implementation for disconnectedCallback
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log("attributeChangedCallback");
        if (name === 'joined' && oldVal !== newVal) {

            const joined = newVal === 'true';

            const button = this.shadowRoot.querySelector('#joinButton');

            if (button) {
                button.textContent = joined ? 'нэгдсэн' : 'нэгдэх';
                this.joined = joined;
            }
        }
        
    }
    

    adoptedCallback() {
        // Implementation for adoptedCallback
    }
}

export default WcButton;
