class CustomComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const componentStyles = new CSSStyleSheet();

    componentStyles.replace(`
        :host {
          display: block;
        }
        /* Additional styles for your custom component */
      `);

    shadowRoot.adoptedStyleSheets = [componentStyles, everything, buttonStyle];
  }

  connectedCallback() {
    // these should be sanitized!
    const title = this.getAttribute("my-title");
    const content = this.getAttribute("my-content");

    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: flex;
              flex-direction: column;
              border: 1px solid #ddd;
              border-radius: 0.2rem;
              padding: 1rem;
            }
          </style>
    
          <div>
            ${title}
            <button>I am inside a shadow-root component, click me!</button>
          </div>
          `;
  }
}

customElements.define("custom-component", CustomComponent);