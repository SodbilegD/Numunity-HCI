class AgreeDisagree extends HTMLElement {
    constructor() {
        super();

        // Initial counts and state
        this.agreeCount = this.getAttribute("agreeCount") ;
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
        @media (max-width: 693px) {
            .reactions{
                font-size: 0.3rem;
            }
            .post__reactions_list{
                padding-right: 0.5rem;
            }
            i{
                padding-right: 0.25rem;
            }
            .reaction-button {
                font-size: 0.6rem;
            }
        }
        @media (max-width: 860px) {
            .reactions{
                font-size: 0.75rem;
            }
            .post__reactions_list{
                padding-right: 1rem;
            }
            i{
                padding-right: 0.5rem;
            }
            .reaction-button {
                font-size: 0.75rem;
            }
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
        if(this.isAgreeClicked){
            this.agreeCount++;
            this.shadowRoot.getElementById('agreeCount').textContent = this.agreeCount;
            this.shadowRoot.getElementById('agreeButton').style.color = '#5555d8';
            this.shadowRoot.getElementById('agree').style.color = '#5555d8';

            if(!this.isDisagreeClicked){
                this.shadowRoot.getElementById('disagreeButton').style.color = '#000000';
                this.shadowRoot.getElementById('disagree').style.color = '#000000';
                this.disagreeCount--;
                this.shadowRoot.getElementById('disagreeCount').textContent = this.disagreeCount;
                this.isDisagreeClicked = !this.isDisagreeClicked;
            }
        } else {
            this.agreeCount--;
            this.shadowRoot.getElementById('agreeCount').textContent = this.agreeCount;
            this.shadowRoot.getElementById('agreeButton').style.color = '#000000';
            this.shadowRoot.getElementById('agree').style.color = '#000000';
        }
        this.isAgreeClicked = !this.isAgreeClicked;        
    }
    toggleDisagree() {
        if(this.isDisagreeClicked){
            this.disagreeCount++;
            this.shadowRoot.getElementById('disagreeCount').textContent = this.disagreeCount;
            this.shadowRoot.getElementById('disagreeButton').style.color = '#5555d8';
            this.shadowRoot.getElementById('disagree').style.color = '#5555d8';

            if(!this.isAgreeClicked){
                this.shadowRoot.getElementById('agreeButton').style.color = '#000000';
                this.shadowRoot.getElementById('agree').style.color = '#000000';
                this.agreeCount--;
                this.shadowRoot.getElementById('agreeCount').textContent = this.agreeCount;
                this.isAgreeClicked = !this.isAgreeClicked;
            }
        } else {
            this.disagreeCount--;
            this.shadowRoot.getElementById('disagreeCount').textContent = this.disagreeCount;
            this.shadowRoot.getElementById('disagreeButton').style.color = '#000000';
            this.shadowRoot.getElementById('disagree').style.color = '#000000';
        }
        this.isDisagreeClicked = !this.isDisagreeClicked;        
    }
}

window.customElements.define('agree-disagree', AgreeDisagree);