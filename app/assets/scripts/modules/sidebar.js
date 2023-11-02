const toggle = document.querySelector(".toggle");
const slide = document.querySelector(".slide");
const slideTitle = document.querySelector(".slide__title");
const slideList = document.querySelector(".slide__list");
const slideItems = document.querySelectorAll(".slide__list__item");

let showMenu = false;
toggle.addEventListener("click", toggleMenu);
function toggleMenu() {
    if (!showMenu) {
        toggle.classList.add("close");
        slide.classList.add("show");
        slideTitle.classList.add("show");
        slideList.classList.add("show");
        slideItems.forEach((item) =>
            item.classList.add("show"));

        // Reset the menu state
        showMenu = true;
    } else {
        toggle.classList.remove("close");
        slide.classList.remove("show");
        slideTitle.classList.remove("show");
        slideList.classList.remove("show");
        slideItems.forEach((item) =>
            item.classList.remove("show"));

        // Reset the menu state
        showMenu = false;
    }
}




document.getElementById("notif-icon").addEventListener("click", function(){
    if (document.querySelector(".popup").style.display === "none") {
        document.querySelector(".popup").style.display = "block";
    } else {
    }
});

        
        

// Close popups if clicking outside them
/*document.addEventListener("click", function(event) {
    if (!event.target.matches(".popup-button") && !event.target.matches(".popup")) {
        popups.forEach(function(popup) {
            popup.style.display = "none";
        });
    }
});*/
