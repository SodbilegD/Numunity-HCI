const { template } = require("lodash");
customElements.define('post-template',
  class extends HTMLElement {
    constructor() {
      super(); // Always call super first in constructor
      const postTemplate = document.getElementById('post-template').content;
      const shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.appendChild(postTemplate.cloneNode(true));
    }
  });
  
  // let template = document.getElementById("post-template");
  // let templateContent = template.content;
  // document.body.appendChild(templateContent);

<template id="post-template">
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
  
  .post{
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    border: 1px solid #5555d8;

    .post__profile{
        display: flex;
        direction: row;
        align-items: center;
        margin: 0;
        
        .post__profile__img{
            width: 2.5rem;
            padding-right: 1.5rem;
        }
        .post__profile__name{
            font-size: 1.25rem;
        }
        .post__profile__time{
            margin-left: auto;
            opacity: 0.5;
        }
        .post__profile__community{
            margin-left: auto;
            opacity: 0.5;
            font-size: 1rem;
            text-decoration: none;
            color: #000000;
        }
    }

    hr{
        opacity: 0.5;
        margin: 0;
    }

    .post__title{
        font-size: 1.25rem;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    .post__title:hover {
        transform: translateX(0.5rem);
        color: #5555d8;
    }
    .post__detail{
        font-size: 1rem;
        text-align: justify;
    }
    .post__reactions{
        display: flex;
        direction: row;
        justify-content: flex-start;

        .post__list{
            padding-right: 2.5rem;
            .clicked {
                background-color: #ffffff;
                color: #5555d8;
                .reaction-button{
                    background-color: #ffffff;
                    color: #5555d8;
                }
            }
            .reaction-button{
                border: none;
                background-color: #ffffff;
                color: #000000;
              }
          }
        }
      }
   </style>
        <fieldset>
            <slot name="post-template-legend">
                <legend>Post slot</legend>
            </slot>
            <article class="post">
                <div class="post__profile">
                    <img src="${this.profileImage}" alt="profile" class="post__profile__img">
                    <p class="post__profile__name">${this.username}</p>
                    <p class="post__profile__time">${this.timeAgo}</p>
                </div>
            </article>
        </fieldset>
</template>