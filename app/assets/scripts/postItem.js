class PostItem extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow DOM
      this.attachShadow({ mode: 'open' });
  
      // Default data
      this.postData = {
        profileName: '',
        timeAgo: '',
        title: '',
        detail: '',
        agreeCount: 0,
        disagreeCount: 0,
        commentCount: 0,
        shareCount: 0,
      };
    }
  
    static get observedAttributes() {
      return ['data'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data') {
        this.postData = JSON.parse(newValue);
        this.render();
      }
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <div class="post">
            <!-- Post content using this.postData -->
        </div>
      `;
    }
  }
  
  customElements.define('post-item', PostItem);
  