
// =========================================
// 1. GET HTML ELEMENTS
// =========================================

const pages = document.querySelectorAll(".page");
const pageButtons = document.querySelectorAll("[data-page]");
const dropdowns = document.querySelectorAll(".dropdown");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


// =========================================
// 2. CLOSE ALL DROPDOWNS
// =========================================

function closeAllDropdowns() {

    dropdowns.forEach(dropdown => {

        dropdown.classList.remove("open");

        const toggle = dropdown.querySelector(".dropdown-toggle");

        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        }

    });

}


// =========================================
// 3. CLOSE MOBILE MENU
// =========================================

function closeMobileMenu() {

    if (navMenu) {
        navMenu.classList.remove("open");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }

}


// =========================================
// 4. DISPLAY SELECTED PAGE
// =========================================

function showPage(pageId) {

    const selectedPage = document.getElementById(pageId);

    // Check whether the requested page exists
    if (!selectedPage || !selectedPage.classList.contains("page")) {

        console.error("Page not found:", pageId);

        return;
    }

    // Hide all pages
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // Display selected page
    selectedPage.classList.add("active");


    // =====================================
    // 5. UPDATE ACTIVE NAVIGATION
    // =====================================

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    const clickedItem = document.querySelector(
        '.nav-menu [data-page="' + pageId + '"]'
    );

    if (clickedItem) {

        const parentDropdown = clickedItem.closest(".dropdown");

        if (parentDropdown) {

            const dropdownTitle =
                parentDropdown.querySelector(".dropdown-toggle");

            if (dropdownTitle) {
                dropdownTitle.classList.add("active");
            }

        } else if (clickedItem.classList.contains("nav-link")) {

            clickedItem.classList.add("active");

        }

    }


    // =====================================
    // 6. CLOSE MENUS
    // =====================================

    closeAllDropdowns();

    closeMobileMenu();


    // =====================================
    // 7. SCROLL TO TOP
    // =====================================

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================
// 8. NAVIGATION CLICK EVENTS
// =========================================

pageButtons.forEach(item => {

    item.addEventListener("click", function (event) {

        // Prevent logo link from jumping
        if (this.tagName === "A") {
            event.preventDefault();
        }

        const pageId = this.getAttribute("data-page");

        showPage(pageId);

    });

});


// =========================================
// 9. MOBILE MENU OPEN AND CLOSE
// =========================================

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        if (!isOpen) {
            closeAllDropdowns();
        }

    });

}


// =========================================
// 10. MOBILE DROPDOWN FUNCTIONALITY
// =========================================

dropdowns.forEach(dropdown => {

    const toggle = dropdown.querySelector(".dropdown-toggle");

    if (!toggle) {
        return;
    }

    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", function (event) {

        if (window.innerWidth <= 780) {

            event.stopPropagation();

            const willOpen = !dropdown.classList.contains("open");

            // Close other dropdowns
            closeAllDropdowns();

            // Open or close selected dropdown
            dropdown.classList.toggle("open", willOpen);

            toggle.setAttribute(
                "aria-expanded",
                String(willOpen)
            );

        }

    });

});


// =========================================
// 11. CLOSE MENUS WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener("click", function (event) {

    if (
        navMenu &&
        !navMenu.contains(event.target) &&
        menuToggle &&
        !menuToggle.contains(event.target)
    ) {

        closeMobileMenu();
        closeAllDropdowns();

    }

});


// =========================================
// 12. CLOSE MENUS USING ESCAPE KEY
// =========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeAllDropdowns();

        closeMobileMenu();

    }

});


// =========================================
// 13. HANDLE WINDOW RESIZE
// =========================================

window.addEventListener("resize", function () {

    // Close mobile menus when switching to desktop
    if (window.innerWidth > 780) {

        closeMobileMenu();
        closeAllDropdowns();

    }

});


// =========================================
// 14. DISPLAY CURRENT YEAR
// =========================================

const yearElement = document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// =========================================
// 15. CHECK ALL PAGE IDs
// =========================================

pageButtons.forEach(item => {

    const pageId = item.getAttribute("data-page");

    if (!document.getElementById(pageId)) {

        console.error("Missing HTML section for:", pageId);

    }

});


// =========================================
// 16. CHECK INITIAL PAGE
// =========================================

const activePage = document.querySelector(".page.active");

if (!activePage) {

    const homePage = document.getElementById("home");

    if (homePage) {
        homePage.classList.add("active");
    }

}


// =========================================
// 17. RESEARCH GUIDANCE SUBMENU
// =========================================



// RESEARCH GROUP SUBMENU
document.querySelectorAll(".submenu-toggle").forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        const submenu = this.nextElementSibling;

        if (submenu) {
            submenu.classList.toggle("show-submenu");

            const isOpen = submenu.classList.contains("show-submenu");
            this.setAttribute("aria-expanded", String(isOpen));
        }
    });
});