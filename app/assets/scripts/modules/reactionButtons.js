class ReactionButtons extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow DOM
      this.attachShadow({ mode: 'open' });
  
      // Default data
      this.reactionCount = 0;
    }
  
    static get observedAttributes() {
      return ['count'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'count') {
        this.reactionCount = parseInt(newValue, 10);
        this.render();
      }
    }
  
    connectedCallback() {
      this.render();
  
      // Add event listeners for reactions
      this.shadowRoot.querySelector('.reaction-button').addEventListener('click', () => {
        this.reactionCount++;
        this.dispatchEvent(new CustomEvent('reactionChanged', { detail: this.reactionCount }));
        this.render();
      });
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
        </style>
        <div class="post__reactions__list">
          <!-- Reaction button content using this.reactionCount -->
        </div>
      `;
    }
  }
  
  customElements.define('reaction-buttons', ReactionButtons);