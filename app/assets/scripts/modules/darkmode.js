class ThemeButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(document.getElementById("theme-button-template").content.cloneNode(true));

    this.button = this.shadowRoot.querySelector("[data-theme-button]");
    this.localStorageTheme = localStorage.getItem("theme");
    this.systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.currentThemeSetting = this.calculateSettingAsThemeString();

    this.updateButton();
    this.updateThemeOnHtmlEl();

    this.button.addEventListener("click", this.handleButtonClick.bind(this));
  }

  calculateSettingAsThemeString() {
    if (this.localStorageTheme !== null) {
      return this.localStorageTheme;
    }

    if (this.systemSettingDark.matches) {
      return "dark";
    }

    return "light";
  }

  updateButton() {
    const newCta = this.currentThemeSetting === "dark" ? "L" : "D";

    this.button.setAttribute("aria-label", newCta);
    this.button.innerText = newCta;
  }

  updateThemeOnHtmlEl() {
    document.querySelector("html").setAttribute("data-theme", this.currentThemeSetting);
  }

  handleButtonClick() {
    const newTheme = this.currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    this.currentThemeSetting = newTheme;

    this.updateButton();
    this.updateThemeOnHtmlEl();
  }
}

customElements.define("theme-button", ThemeButton);





      // function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
      //   if (localStorageTheme !== null) {
      //     return localStorageTheme;
      //   }
      
      //   if (systemSettingDark.matches) {
      //     return "dark";
      //   }
      
      //   return "light";
      // }
      
      // function updateButton({ buttonEl, isDark }) {
      //   const newCta = isDark ? "L" : "D";
        
      //   buttonEl.setAttribute("aria-label", newCta);
      //   buttonEl.innerText = newCta;
      // }
    
      // function updateThemeOnHtmlEl({ theme }) {
      //   document.querySelector("html").setAttribute("data-theme", theme);
      // }
      
      // const button = document.querySelector("[data-theme-toggle]");
      // const localStorageTheme = localStorage.getItem("theme");
      // const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
      
      // let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
      
      // updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
      // updateThemeOnHtmlEl({ theme: currentThemeSetting });
    
      // button.addEventListener("click", (event) => {
      //   const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
      
      //   localStorage.setItem("theme", newTheme);
      //   updateButton({ buttonEl: button, isDark: newTheme === "dark" });
      //   updateThemeOnHtmlEl({ theme: newTheme });
      
      //   currentThemeSetting = newTheme;
      // });

