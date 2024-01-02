<template id="post-template">
  <article class="post">
    <div class="post__profile">
      <img class="post__profile__img" alt="profile" src="" />
      <p class="post__profile__name"><slot name="userName"></slot></p>
      <p class="post__profile__time"><slot name="publishedDate"></slot></p>
    </div>
    <hr />
    <h3 class="post__title"><slot name="postTitle"></slot></h3>
    <p class="post__detail"><slot name="postDetail"></slot></p>
    <div class="post__reactions">
      <agree-disagree agreeCount=${post.agreeCount} disagreeCount=${post.disagreeCount} isAgreeClicked=${false} isDisAgreeClicked=${false}></agree-disagree>
      <p class="post__reactions__list">
        <i class="fa-regular fa-comment post__reactions__icon"></i>
        <span class="reaction-count"><slot name="commentCount"></slot></span> Comment
      </p>
      <p class="post__reactions__list">
        <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
        <span class="reaction-count"><slot name="shareCount"></slot></span> Share
      </p>
    </div>
  </article>
</template>

#RenderPost(post, user) {
  const postTemplate = document.getElementById('post-template');
  const clone = document.importNode(postTemplate.content, true);
  clone.querySelector('[slot="userName"]').textContent = user.userName;
  clone.querySelector('[slot="publishedDate"]').textContent = post.publishedDate;
  clone.querySelector('[slot="postTitle"]').textContent = post.postTitle;
  clone.querySelector('[slot="postDetail"]').textContent = post.postDetail;
  clone.querySelector('[slot="commentCount"]').textContent = post.comments.length;
  clone.querySelector('[slot="shareCount"]').textContent = post.shareCount;
  this.postsContainer.appendChild(clone);
}




class News extends HTMLElement
{
    /*Baiguulagch*/
    constructor()
    {
        super();

        this.myRoot = this.attachShadow({ mode : "closed" });

        this.image = this.getAttribute("image");
        this.title = this.getAttribute("title");
        this.desc = this.getAttribute("desc");
        this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.#Render();
    }

    #Render()
    {
        this.myRoot.innerHTML = `
        <style>

        :host {
            --background-color-light: #00000;
            --text-color-light: #000000;
            --background-color-dark: #1a1a1a;
            --text-color-dark: #ffffff;
          }

        /* 1 medeenii heseg */
        .medee{
           font-family: var(--font);
           margin: 1.25rem;
           background-color: var(--background-color-light);
           color: var(--text-color-light);
           border-radius: 5px;  
           height: 24rem;
           overflow: hidden;

        /* Medeenii zurag */
        & img{
           object-fit: cover;
           height: 60%;
           width: 100%;
           }
        }

        /* Medeenii text heseg */
        .title{
           background-color: white;
           padding: 0rem 1.25rem;
           margin: 0rem;

           /* Garchignii doodoh zuraas */
           & h5::after{
              display: block;
              content: "";
              height: 2px;
              width: 100%;
              border-radius: 3px;
              background: var(--main-bg-color);
              margin-top: 1.25rem;
              margin-bottom: -1.25rem;
           }
        }

        /* Medeenii zuragnii hover */
        .medee:hover .zurag{
           height: 30%;
           transition-duration: 0.6s;
           transition-timing-function: ease-in;
        }

        /* Medeenii title hover */
        .medee:hover .title{
           height: 70%;
           border-radius: 5px;
        }

        /* Medeenii delgerengui heseg */
        .desc{
           padding-top: 0.6rem;
           display: none;
           color: #666C74;
           font-size: 10px;
           text-align: justify;
        }

        /* Medeenii delgerengui hesgiin hover */
        .medee:hover .desc{
           display: block;
        }
        </style>

        <!--Neg medeenii heseg-->
        <article class="medee">

                <!--Medeenii zurag-->
                <img src="${this.image}" alt="news1" class="zurag">

                <div class="title">
                    <h5>${this.title}</h5>

                    <!--Medeenii delgerengui-->
                    <p class="desc">${this.desc}</p>
                </div>
        </article>`;
    }
    

    //Attribute butsaalt
    static get observedAttributes()
    {
        return ["image", "title", "desc"];
    }

    //Attribute soligdolt
    attributeChangedCallback(name, oldVal, newVal)
    {
        switch(name)
        {
            case "image":
                this.image = newVal;
                this.#Render();
                break;
            
            // case "title":
            //     this.title = newVal;
            //     this.#Render();
            //     break;
            
            case "desc":
                this.desc = newVal;
                this.#Render();
                break;

            default:
                break;
        }
    }
} 
window.customElements.define('recent-news',News);