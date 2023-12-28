class WcFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <div class="footer__nav">
                <h3>Цэс:</h3>
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