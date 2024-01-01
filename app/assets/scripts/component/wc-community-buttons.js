class CommunityButtons extends HTMLElement {
    constructor() {
        super();
        this.#render();
        //implementation
    }
    #render(){
        this.innerHTML = `
            <section class="community">
            <style>
            :root{
                --color-bg: #F5F5FA;
                --color-fg: #18191a;
                /* search bar color */
                --color-sbg: #ffffff;
                --color-sfg: #3f3f3f;
                /* post color */
                --color-pfg: #ffffff;
                --color-pbg: #3a3b3c;
                /* border */
                --color-borderfg:#5555d8;
                --color-borderbg: none;
                /* post profile ard taliin >>lorem */
                --color-cfg: #3f3f3f;
                --color-cbg: #ffffff;
                /* search ugnii ungu kekw :(( */
                --color-hfg: #5555d8;
                --color-hbg: #ffffff; 
                @media(prefers-color-scheme: light){
                    body {
                      background-color: var(--color-bg);
                      color: var(--color-fg);
                    } 
            }
            </style>
                <div id="community"></div>
                <button type="button" class="btn community__join-button"></button>
                <button type="button" class="btn community__new-button" id="newButton">шинэ</button>
                <button type="button" class="btn community__trending-button" id="trendButton">тренд</button>
            </section>
        `
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

window.customElements.define('community-buttons', CommunityButtons);