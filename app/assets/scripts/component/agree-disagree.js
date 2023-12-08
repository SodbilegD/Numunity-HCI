class AgreeDisagree extends HTMLElement {
    constructor() {
        super();

        // Initial counts and state
        this.agreeCount = this.getAttribute("agreeCount");
        this.disagreeCount = this.getAttribute("disagreeCount");
        this.isAgreeClicked = this.getAttribute("isAgreeClicked");
        this.isDisagreeClicked = this.getAttribute("isDisagreeClicked");

        // Create shadow DOM
        this.attachShadow({ mode: 'open' });

        // Set up the initial HTML structure
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');

        .reactions{
            display: flex;
            direction: row;
            font-size: 0.75rem;
        }
        .post__reactions_list{
            padding-right: 2.5rem;
        }
        .clicked,
        .clicked .reaction-button {
            background-color: #5555d8;
            color: #ffffd8;
            font-family: 'Comfortaa', cursive;
        }
        .reaction-button {
            border: none;
            background-color: #ffffff;
            color: #000000;
            font-family: 'Comfortaa', cursive;
            font-size: 0.75rem;
        }
        </style>
        <div class="reactions">
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
        </div>
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
            agreeButton.classList.add('clicked');
            disagreeButton.classList.remove('clicked');
        } else {
            agreeButton.classList.remove('clicked');
            disagreeButton.classList.add('clicked');
        }
    }

    updateCounts() {
        this.shadowRoot.getElementById('agreeCount').textContent = this.agreeCount;
        this.shadowRoot.getElementById('disagreeCount').textContent = this.disagreeCount;
    }
}

window.customElements.define('agree-disagree', AgreeDisagree);