class Reaction extends HTMLElement {
    constructor() {
        super();

        // Initial counts and state
        this.agreeCount = 0;
        this.disagreeCount = 0;
        this.isAgreeClicked = false;
        this.isDisagreeClicked = false;

        // Create shadow DOM
        this.attachShadow({ mode: 'open' });

        // Set up the initial HTML structure
        this.shadowRoot.innerHTML = `
        <style>
            .active-agree {
                color: green; /* Change this to your desired color for Agree */
            }
            .active-disagree {
                color: red; /* Change this to your desired color for Disagree */
            }
        </style>
        <p class="post__reactions__list">
            <i class="fa-regular fa-face-smile-beam post__reactions__icon"></i>
            <span class="reaction-count" id="agreeCount">${this.agreeCount}</span>
            <button class="reaction-button" id="agreeButton">Agree</button>
        </p>
        <p class="post__reactions__list">
            <i class="fa-regular fa-face-frown post__reactions__icon"></i>
            <span class="reaction-count" id="disagreeCount">${this.disagreeCount}</span>
            <button class="reaction-button" id="disagreeButton">Disagree</button>
        </p>
        `;

        // Bind event listeners
        this.shadowRoot.getElementById('agreeButton').addEventListener('click', () => this.toggleAgree());
        this.shadowRoot.getElementById('disagreeButton').addEventListener('click', () => this.toggleDisagree());
    }

    toggleAgree() {
        if (!this.isAgreeClicked) {
            this.agreeCount++;
        } else {
            this.agreeCount--;
        }

        this.isAgreeClicked = !this.isAgreeClicked;

        if (this.isDisagreeClicked) {
            this.isDisagreeClicked = !this.isDisagreeClicked;
            this.disagreeCount--;
        }

        this.updateButtonStyles();
        this.updateCounts();
    }

    toggleDisagree() {
        if (!this.isDisagreeClicked) {
            this.disagreeCount++;
        } else {
            this.disagreeCount--;
        }

        this.isDisagreeClicked = !this.isDisagreeClicked;

        if (this.isAgreeClicked) {
            this.isAgreeClicked = !this.isAgreeClicked;
            this.agreeCount--;
        }

        this.updateButtonStyles();
        this.updateCounts();
    }

    updateButtonStyles() {
        const agreeButton = this.shadowRoot.getElementById('agreeButton');
        const disagreeButton = this.shadowRoot.getElementById('disagreeButton');

        if (this.isAgreeClicked) {
            agreeButton.classList.add('active-agree');
            disagreeButton.classList.remove('active-disagree');
        } else {
            agreeButton.classList.remove('active-agree');
            disagreeButton.classList.add('active-disagree');
        }
    }

    updateCounts() {
        this.shadowRoot.getElementById('agreeCount').textContent = this.agreeCount;
        this.shadowRoot.getElementById('disagreeCount').textContent = this.disagreeCount;
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

window.customElements.define('reaction', Reaction);