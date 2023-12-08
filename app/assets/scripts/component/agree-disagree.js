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
            font-size: 1rem;
        }
        .post__reactions_list{
            padding-right: 2.5rem;
        }
        i{
            padding-right: 1rem;
        }
        .reaction-button {
            border: none;
            background-color: #ffffff;
            color: #000000;
            font-family: 'Comfortaa', cursive;
            font-size: 1rem;
            padding-right: 2.5rem;
        }
        </style>
        <div class="reactions">
        <p class="post__reactions__list" id="agree">
            <i class="fa-regular fa-face-smile-beam post__reactions__icon"></i>
            <span class="reaction-count" id="agreeCount">${this.agreeCount}</span>
            <button class="reaction-button" id="agreeButton">Agree</button>
        </p>
        <p class="post__reactions__list" id="disagree">
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
        this.agreeCount = this.toggleColor('agree', 'disagree', 'agreeButton', 'disagreeButton', this.isAgreeClicked, this.agreeCount);
        this.isAgreeClicked = !this.isAgreeClicked;

        if (this.isAgreeClicked && this.isDisagreeClicked) {
            this.isDisagreeClicked = !this.isDisagreeClicked;
            this.disagreeCount--;
        }

        this.updateCounts();
    }

    toggleDisagree() {
        this.disagreeCount = this.toggleColor('disagree', 'agree', 'disagreeButton', 'agreeButton', this.isDisagreeClicked, this.disagreeCount);
        this.isDisagreeClicked = !this.isDisagreeClicked;

        if (this.isDisagreeClicked && this.isAgreeClicked) {
            this.isAgreeClicked = !this.isAgreeClicked;
            this.agreeCount--;
        }

        this.updateCounts();
    }

    toggleColor(clickedId, otherId, clickedButtonId, otherButtonId, isClicked, count) {
        const clickedElement = this.shadowRoot.getElementById(clickedId);
        const otherElement = this.shadowRoot.getElementById(otherId);
        const clickedButtonElement = this.shadowRoot.getElementById(clickedButtonId);
        const otherButtonElement = this.shadowRoot.getElementById(otherButtonId);

        if (!isClicked) {
            count++;
            clickedElement.style.color = '#5555d8';
            otherElement.style.color = '#000000';
            clickedButtonElement.style.color = '#5555d8';
            otherButtonElement.style.color = '#000000';
        } else {
            count--;
            clickedElement.style.color = '#000000';
            clickedButtonElement.style.color = '#000000';
        }

        return count; // Return the updated count
    }

    updateCounts() {
        this.shadowRoot.getElementById('agreeCount').textContent = this.agreeCount;
        this.shadowRoot.getElementById('disagreeCount').textContent = this.disagreeCount;
    }
}

window.customElements.define('agree-disagree', AgreeDisagree);