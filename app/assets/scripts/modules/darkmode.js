class DarkModeComponent extends HTMLElement {
  constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      const container = document.createElement('div');
      //         container.setAttribute('class', 'dark-mode-container');
      
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');

      </style>
      
      container.innerHTML = 
      
      <button
      type="button"
      data-theme-toggle
      aria-label="Change to light theme"
      class="darktheme"
      >light theme</button>
      `;

      shadow.appendChild(container);
      function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
        if (localStorageTheme !== null) {
          return localStorageTheme;
        }
      
        if (systemSettingDark.matches) {
          return "dark";
        }
      
        return "light";
      }
      
      function updateButton({ buttonEl, isDark }) {
        const newCta = isDark ? "L" : "D";
        
        buttonEl.setAttribute("aria-label", newCta);
        buttonEl.innerText = newCta;
      }
    
      function updateThemeOnHtmlEl({ theme }) {
        document.querySelector("html").setAttribute("data-theme", theme);
      }
      
      const button = document.querySelector("[data-theme-toggle]");
      const localStorageTheme = localStorage.getItem("theme");
      const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
      
      let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
      
      updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
      updateThemeOnHtmlEl({ theme: currentThemeSetting });
    
      button.addEventListener("click", (event) => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
      
        localStorage.setItem("theme", newTheme);
        updateButton({ buttonEl: button, isDark: newTheme === "dark" });
        updateThemeOnHtmlEl({ theme: newTheme });
      
        currentThemeSetting = newTheme;
      });
}

// function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
//     if (localStorageTheme !== null) {
//       return localStorageTheme;
//     }
  
//     if (systemSettingDark.matches) {
//       return "dark";
//     }
  
//     return "light";
//   }
  
//   function updateButton({ buttonEl, isDark }) {
//     const newCta = isDark ? "L" : "D";
    
//     buttonEl.setAttribute("aria-label", newCta);
//     buttonEl.innerText = newCta;
//   }

//   function updateThemeOnHtmlEl({ theme }) {
//     document.querySelector("html").setAttribute("data-theme", theme);
//   }
  
//   const button = document.querySelector("[data-theme-toggle]");
//   const localStorageTheme = localStorage.getItem("theme");
//   const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
//   let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
//   updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
//   updateThemeOnHtmlEl({ theme: currentThemeSetting });

//   button.addEventListener("click", (event) => {
//     const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
//     localStorage.setItem("theme", newTheme);
//     updateButton({ buttonEl: button, isDark: newTheme === "dark" });
//     updateThemeOnHtmlEl({ theme: newTheme });
  
//     currentThemeSetting = newTheme;
//   });
//   class DarkModeComponent extends HTMLElement {
//     constructor() {
//         super();

//         // Create a Shadow DOM
//         const shadow = this.attachShadow({ mode: 'open' });

//         // Create a container element within the Shadow DOM
//         const container = document.createElement('div');
//         container.setAttribute('class', 'dark-mode-container');

//         // Add content to the container
//         container.innerHTML = `
//             <p>This is some content inside the Shadow DOM.</p>
//             <button type="button" aria-label="Change theme" class="darktheme">Toggle Theme</button>
//         `;

//         // Append the container to the Shadow DOM
//         shadow.appendChild(container);

//         // Add event listener to the button
//         const button = shadow.querySelector('.darktheme');
//         button.addEventListener('click', this.toggleDarkMode.bind(this));
//     }

//     toggleDarkMode() {
//         // Toggle a class on the host element to apply dark mode styles
//         this.classList.toggle('dark-mode-on');
//     }
// }

// // Define the custom element
// customElements.define('dark-mode-component', DarkModeComponent);
