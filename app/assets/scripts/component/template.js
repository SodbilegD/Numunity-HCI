const { template } = require("lodash");

//let starRating = document.getElementById("star-rating-template").content;
//document.body.appendChild(starRating);

customElements.define('post-template',
  class extends HTMLElement {
    constructor() {
      super(); // Always call super first in constructor
      const starRating = document.getElementById('post-template').content;
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(starRating.cloneNode(true));
  }
});
  // let template = document.getElementById("post-template");
  // let templateContent = template.content;
  // document.body.appendChild(templateContent);