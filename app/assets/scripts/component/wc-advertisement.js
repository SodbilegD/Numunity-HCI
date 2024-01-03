// Surtalchilgaanii web component
class WcAdvertisement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>    
                .advertisements {
                    width: 15rem;
                    margin: 0 0 0 1rem;
                    background-color: var(--color-white);
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                }
            
                .advertisements__list {
                    list-style: none;
                    padding: 0 0.5rem;
                }
                img{
                    width: 100%;
                    margin-bottom: 1rem;
                }

                @media (max-width: 1260px){
                    .advertisements{
                        display: none;
                    }
                }
            </style>
            <aside class="advertisements">
                <ul class="advertisements__list">
                    <li class="advertisements__item"><a href="ad.com"><img src="assets/images/ad1.png" alt="advertisements1"></a></li>                
                    <li class="advertisements__item"><a href="ad.com"><img src="assets/images/ad2.png" alt="advertisements1"></a></li>
                    <li class="advertisements__item"><a href="ad.com"><img src="assets/images/ad3.png" alt="advertisements2"></a></li>
                </ul>
            </aside>
        `;
        
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

window.customElements.define('wc-advertisement', WcAdvertisement);