const template = document.createElement("template");
template.innerHTML = `
    
    <section class="post-section">
        <div class="post-section__category">
            <slot name="category__title">end ontsloh ch ymu ym bna</slot>
            <a href="#" class="post-section__category__view-more">Цааш үзэх...</a>
        </div>

        <article class="post">
            <div class="post__profile">
                <img src="./assets/images/profile.png" alt="profile" class="post__profile__img">
                <p class="post__profile__name">Amet</p>
                <a href="#" class="post__profile__community">>>Lorem ipsum</a>
            </div>
            <hr>
            
            <slot name="title">bi bol title ni slot</slot>
            <slot name="detail">bi bol postniih n slot</slot>
            
            <p class="post__profile__time post__profile__time--down">1h ago</p>
        </article>
    </section>
<style>
.post-section {
  padding-top: 1rem;
}

.post-section__category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
}

.post-section__category__title {
  font-size: var(--desktop-text-medium);
}

.post-section__category__view-more {
  font-size: var(--desktop-text-xsmall);
  text-decoration: none;
  color: var(--color-black);
  cursor: pointer;
}
.post-section__category__view-more:hover {
  color: var(--color-main);
}

@media screen and (max-width: 860px) {
  .post-section {
      padding-top: 0.5rem;
  }

  .post-section__category__title {
      font-size: var(--tablet-text-medium);
  }

  .post-section__category__view-more {
      font-size: var(--tablet-text-small);
  }
}

@media screen and (max-width: 693px) {
  .post-section {
      padding-top: 0.25rem;
  }

  .post-section__category__title {
      font-size: var(--mobile-text-medium);
  }

  .post-section__category__view-more {
      font-size: var(--mobile-text-small);
  }
}

.post {
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: 1px solid var(--color-main);
}


.post__profile {
  display: flex;
  direction: row;
  align-items: center;
  margin: 0;
}

.post__profile__img {
  width: 2.5rem;
  padding-right: 1.5rem;
}


.post__profile__name {
  font-size: var(--desktop-text-medium);
}

.post__profile__time {
  margin-left: auto;
  opacity: 0.5;
}

.post__profile__time--down {
  display: flex;
  justify-content: flex-end;
  font-size: var(--desktop-text-xsmall);
}

.post__profile__community {
  margin-left: auto;
  opacity: 0.5;
  font-size: var(--desktop-text-small);
  text-decoration: none;
  color: var(--color-black);
}

hr {
  opacity: 0.5;
  margin: 0;
}

.post__title {
  font-size: var(--desktop-text-medium);
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.post__title:hover {
  transform: translateX(0.5rem);
  color: var(--color-main);
}

.post__detail {
  font-size: var(--desktop-text-small);
  text-align: justify;
}

@media screen and (max-width: 860px) {
  .post {
      padding: 0.5rem 1rem;
  }
  .post__profile__img {
      width: 1.75rem;
      padding-right: 1rem;
  }
  .post__profile__name,
  .post__title {
      font-size: var(--tablet-text-medium);
  }
  .post__profile__community,
  .post__profile__time,
  .post__detail,
  .post__reactions {
      font-size: var(--tablet-text-small);
  }
  .post__profile__time--down {
      font-size: var(--tablet-text-xsmall);
  }

  .post__reactions__list {
      padding-right: 1.25rem;
  }
  .post__reactions__list i {
      padding-right: 0.5rem;
  }
}

@media screen and (max-width: 693px) {
  .post__profile__img {
      width: 1.5rem;
      padding-right: 0.75rem;
  }
  .post__profile__name,
  .post__profile__community,
  .post__title {
      font-size: var(--mobile-text-medium);
  }
  .post__profile__time,
  .post__detail,
  .post__reactions {
      font-size: var(--mobile-text-small);
  }
  .post__profile__time--down {
      font-size: var(--mobile-text-xsmall);
  }
  .post__reactions__list {
      padding-right: 1rem;
  }
  .post__reactions__list i {
      padding-right: 0.25rem;
  }
}


</style>


`;

class PostTemplate extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("post-template", PostTemplate);
