class WcAdvertisement extends HTMLElement {
    constructor() {
        super();
        this.adType = this.getAttribute("adType") ?? "default";
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>    
                .advertisements {
                    background-color: var(--color-white);
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                    margin-left: 1rem;
                }

                aside img{
                    width: 100%;
                    margin-bottom: 1.5rem;
                }
            
                .advertisements__list {
                    list-style: none;
                    padding: 0 0.5rem;
                }

                .advertisements__info {
                    padding: 0 1.5rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                    border: 1px solid var(--color-main);
                }

                .advertisements__info__title {
                    font-size: var(--desktop-text-medium);
                    text-align: center;
                }

                .advertisements__info__detail {
                    font-size: var(--desktop-text-small);
                    text-align: justify;
                }

                .advertisements__info__opened {
                    font-size: var(--desktop-text-small);
                    margin: 0;
                }

                .advertisements__info__opened i {
                    padding-right: 0.75rem;
                    color: var(--color-main);
                }

                .advertisements__info__container {
                    display: flex;
                    text-align: center;
                    font-size: var(--desktop-text-small);
                    margin-top: 0;
                }

                .advertisements__info__followers,
                .advertisements__info__total {
                    flex: 1;
                    margin-top: 0.5rem;
                    line-height: 2.5rem;
                }

                .advertisements__info__followers span,
                .advertisements__info__total span {
                    font-size: var(--desktop-text-medium);
                    font-weight: 600;
                }

                .advertisements__info__followers {
                    padding-right: 0.1rem;
                    border-right: 1px solid var(--color-main);
                }

                .advertisements__info__total {
                    padding-left: 0.3rem;
                }

                @media (max-width: 1260px){
                    .advertisements{
                        display: none;
                    }
                }

                @media (max-width: 860px) {
                    .advertisements__info {
                        padding: 0 1rem;
                    }
                
                    .advertisements__info__title {
                        font-size: var(--tablet-text-medium);
                    }
                
                    .advertisements__info__detail,
                    .advertisements__info__opened,
                    .advertisements__info__container,
                    .advertisements__info__followers,
                    .advertisements__info__total {
                        font-size: var(--tablet-text-small);
                    }
                }

                @media (max-width: 693px) {
                    .advertisements__info {
                        padding: 0.5rem;
                    }
                
                    .advertisements__info__title {
                        font-size: var(--mobile-text-medium);
                    }
                
                    .advertisements__info__detail,
                    .advertisements__info__opened,
                    .advertisements__info__container,
                    .advertisements__info__followers,
                    .advertisements__info__total {
                        font-size: var(--mobile-text-small);
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