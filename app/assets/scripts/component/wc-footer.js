// footer web component
class WcFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');
        .footer {
            background-color: var(--color-white);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0.75rem auto;
            padding: 1rem 5rem;
            max-width: 100%;
            border-radius: 0.5rem;
        }
        
        .footer__nav {
            flex-direction: row;
            align-self: center;
        }
        
        .footer__nav h3 {
            text-align: center;
            font-size: var(--desktop-text-medium);
        }
        
        .footer__nav ul {
            list-style: none;
            font-size: var(--desktop-text-small);
        }
        
        .footer__nav li {
            list-style: none;
            margin-bottom: 1rem;
        }
        
        .footer__nav a {
            text-decoration: none;
        }
        
        .footer__nav i {
            margin-right: 1rem;
            color: var(--color-main);
        }
        
        .footer__copyright {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .footer__copyright h3 {
            color: var(--color-main);
            font-size: var(--desktop-text-xlarge);
            justify-content: center;
        }
        
        .footer__copyright img {
            width: 3rem;
            height: 3rem;
            margin-right: 2rem;
        }
        
        .footer__copyright p {
            color: var(--color-main);
            font-size: var(--desktop-text-small);
        }
        
        .footer__contacts {
            flex-direction: row;
            align-self: flex-start;
        }
        
        .footer__contacts h3 {
            text-align: center;
            font-size: var(--desktop-text-medium);
            margin-bottom: 2rem;
        }
        
        .footer__contacts p {
            font-size: var(--desktop-text-small);
        }
        
        .footer__contacts i {
            align-items: center;
            justify-content: center;
            margin: 1rem;
            color: var(--color-main);
            font-size: var(--desktop-text-medium);
        }
        
        @media screen and (max-width: 1260px) {
            .footer__nav {
                display: none;
            }
        }
        
        @media screen and (max-width: 860px) {
            .footer__copyright h3 {
                font-size: var(--tablet-text-medium);
                img {
                    width: 2rem;
                    height: 2rem;
                    margin-right: 1rem;
                }
            }
        
            .footer__copyright p {
                font-size: var(--tablet-text-small);
            }
        
            .footer__contacts i {
                margin-right: 0.5rem;
                font-size: var(--tablet-text-medium);
            }
        
            .footer__contacts h3 {
                font-size: var(--tablet-text-small);
            }
            .footer__contacts p {
                font-size: var(--tablet-text-medium);
                margin-bottom: 1rem;
            }
        }
        
        @media screen and (max-width: 693px) {
            .footer {
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .footer__contacts {
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .footer__contacts h3 {
                font-size: var(--mobile-text-medium);
            }
            .footer__contacts p {
                font-size: var(--mobile-text-medium);
                margin-bottom: 0.5rem;
            }
            .footer__contacts i {
                margin: 0.5rem;
                font-size: var(--mobile-text-small);
            }
            .footer__copyright {
                flex-direction: column;
                
            }
            .footer__copyright h3 {
                font-size: var(--mobile-text-medium);
                img {
                    width: 2rem;
                    height: 2rem;
                    margin-right: 1rem;
                }
            }
            .footer__copyright p {
                font-size: var(--mobile-text-small);
            }
        }        
    </style>
        <footer class="footer">
            <div class="footer__nav">
                <ul>
                    <li><a href="index.html"><i class="fa-solid fa-house"></i>Нүүр хуудас</a></li>
                    <li><a href="discussion.html"><i class="fa-solid fa-comments"></i>Хэлэлцүүлэг</a></li>
                    <li><a href="chat.html"><i class="fa-solid fa-comment-dots"></i>Чат өрөө</a></li>
                    <li><a href="profile.html"><i class="fa-solid fa-user"></i>Миний профайл</a></li>
                </ul>
            </div>
            <div class="footer__copyright">
                <h3><img src="assets/images/logo.png" alt="Team DKS logo">DKS</h3>
                <p>DKS &copy; 2023 - All Rights Reserved</p>
            </div>
            <div class="footer__contacts">
                <h3>Холбоо барих:</h3>
                <p><i class="fa-solid fa-phone"></i>+976 8066 5030</p>
                <p><i class="fa-solid fa-envelope"></i>team_dks@nomail.com</p>
                <i class="fa-sharp fa-solid fa-share-nodes fa-bounce fa-2xl"></i>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-whatsapp"></i>
            </div>
        </footer>
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

window.customElements.define('wc-footer', WcFooter);