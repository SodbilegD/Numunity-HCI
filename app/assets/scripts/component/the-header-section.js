class TheHeaderSection extends HTMLElement {
    constructor() {
        super();
        this.#render();
        //implementation
    }
    #render(){
        this.innerHTML = `
        <header class="main-header">
            <div class="toggle">
                <span class="toggle__line topline"></span>
                <span class="toggle__line midline"></span>
                <span class="toggle__line bottomline"></span>
            </div>
            <nav class="slide">
                <h1 class="slide__title">Цэс</h1>
                <ul class="slide__list">
                    <li class="slide__list__item"><a href="#"><i class="fas fa-tv"></i>dashboard</a></li>
                    <li class="slide__list__item"><a href="#"><i class="far fa-user"></i>profile</a></li>
                    <li class="slide__list__item"><a href="#"><i class="fab fa-gripfire"></i>trending</a></li>
                    <li class="slide__list__item"><a href="#"><i class="far fa-comment"></i>messages</a></li>
                    <li class="slide__list__item"><a href="#"><i class="far fa-folder"></i>file manager</a></li>
                    <li class="slide__list__item"><a href="#"><i class="far fa-address-book"></i>portfolio</a></li>
                    <li class="slide__list__item"><a href="#"><i class="far fa-heart"></i>saved</a></li>
                    <li class="slide__list__item"><a href="#"><i class="fas fa-cogs"></i>settings</a></li>
                </ul>
            </nav>
            <div class="main-header__container1">
                <img src="assets/images/logo.png" alt="Team DKS logo" class="main-header__container1__logo">
                <h2 class="main-header__container1__title">DKS</h2>
            </div>
            
            <form class="main-header__search-bar">
                <i class="fa-solid fa-magnifying-glass" class="main-header__search-icon"></i>
                <input type="text" label="Search" placeholder="Хайлт хийх" class="main-header__search-field">
            </form>
            <div class="main-header__container2 main-header__container2--icons">

                <div class="popup-container">
                    <a href="#" id="notif-icon" class="main-header__container2__notif"><i class="fa-regular fa-bell"></i></a>
                    <div class="popup">
                        <h2 class="popup__title">Мэдэгдэл</h2>
                        <ul class="popup__list">
                            <li class="popup__list__item"><a href="#">@kkkk_blahkkk хэрэглэгч тантай санал нэгдлээ.</a></li>
                            <li class="popup__list__item"><a href="#">@kkkk_blahkkk хэрэглэгч тантай санал нэгдлээ.</a></li>
                            <li class="popup__list__item"><a href="#">@kkkk_blahkkk хэрэглэгч тантай санал нэгдлээ.</a></li>
                            <li class="popup__list__item"><a href="#">@kkkk_blahkkk хэрэглэгч тантай санал нэгдлээ.</a></li>
                        </ul>
                            <a href="#" class="popup__viewmore">Цааш үзэх</a>
                    </div>
                </div>

                <div class="popup-container">
                    <a href="#" id="myprofile-icon" class="main-header__container2__profile"><i class="fa-regular fa-user"></i></a>
                    <div class="popup">
                        <h2 class="popup__title">Миний профайл</h2>
                        <img src="/assets/images/profile.png" alt="myprofile">
                        <ul class="popup__list popup__list--profile">
                            <li class="popup__list__item popup__list__item--profile">
                                <span class="popup-myprofile__icon"><i class="fa-regular fa-folder-open"></i></span>
                                <a href="#">Хадгалсан</a>
                            </li>
                            <li class="popup__list__item popup__list__item--profile">
                                <span class="popup-myprofile__icon"><i class="fa-solid fa-gear"></i></span>
                                <a href="#">Тохиргоо</a>
                            </li>
                            <li class="popup__list__item popup__list__item--profile">
                                <span class="popup-myprofile__icon"><i class="fa-solid fa-circle-question"></i></span>
                                <a href="#">Тусламж</a>
                            </li>
                            <li class="popup__list__item popup__list__item--profile">
                                <span class="popup-myprofile__icon"><i class="fa-solid fa-arrow-right-from-bracket"></i></span>
                                <a href="#">Гарах</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        `
    }
    connectedCallback() {
        //implementation
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

window.customElements.define('the-header-section', TheHeaderSection);