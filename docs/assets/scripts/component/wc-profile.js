// import { community } from './wc-community-section.js';
// window.customElements.define('the-community-section', theCommunitySection);

class WcProfile extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    async connectedCallback() {
        const response = await fetch("http://localhost:3000/getuser",
            {
                method: 'POST',
                cache: "no-cache",
                headers: {
                    "Content-Type": 'application/json; charset=UTF-8'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.user = data.user;
            console.log(this.user);

            this.user.savedPosts.forEach(async post => {
                const communityId = post.communityId;
                const postId = post.postId;
                const response2 = await fetch(`http://localhost:3000/selectedcommunity`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ communityId: communityId, user: 1 }),
                });
                if (!response2.ok) {
                    throw new Error(`HTTP error! Status: ${response2.status}`);
                }
                const data = await response2.json();
                console.log(data);
                console.log(data.community);
                // console.log(data.community.posts);
                // const postItem = data.community.posts.find(post => post.postId === postId);
                // console.log(postItem);
            });
    }

    render(){
        this.innerHTML = `
            <section class="profile">
                <img src="" alt="profile" class="profile__img">
                <h2 class="profile__username">username</h2>
            </section>
            <section class="postsContainer">
                
            </section>
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

window.customElements.define('wc-profile', WcProfile);