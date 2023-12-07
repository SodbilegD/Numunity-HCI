class DKSAgree extends HTMLElement {
    constructor() {
        super();
        this.agreeCount = this.getAttribute("agreeCount");
        this.disagreeCount = this.getAttribute("disagreeCount");
        this.isAgreeClicked = false;
        this.isDisagreeClicked = false;

        // Create shadow DOM
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        .reactions{
            display: flex;
            direction: row;
        }
        .post__reactions_list{
            padding-right: 2.5rem;
        }
        .clicked,
        .clicked .reaction-button {
            background-color: #5555d8;
            color: #ffffd8;
        }
        .reaction-button {
            border: none;
            background-color: #ffffff;
            color: #000000;
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

window.customElements.define('the-dks-agree', DKSAgree);