
// =========================================
// 1. PUBLICATION CATEGORY CONFIGURATION
// =========================================

const publicationCategories = {
    "peer-reviewed": {
        label: "publications"
    },

    "books": {
        label: "books"
    },

    "edited-books": {
        label: "edited books"
    },

    "book-chapters": {
        label: "book chapters"
    },

    "conference-proceedings": {
        label: "conference proceedings"
    },

    "other-articles": {
        label: "other articles"
    }
};


// =========================================
// 2. UPDATE PUBLICATION COUNT
// =========================================

function updatePublicationCount(section, visibleCount) {

    const countElement = section.querySelector(".publication-count");

    if (!countElement) return;

    const category = publicationCategories[section.id];

    if (!category) return;

    countElement.textContent =
        visibleCount + " " + category.label;
}


// =========================================
// 3. INITIALIZE PUBLICATION SECTIONS
// =========================================

function initializePublications() {

    Object.keys(publicationCategories).forEach(sectionId => {

        const section = document.getElementById(sectionId);

        if (!section) {
            console.warn("Publication section not found:", sectionId);
            return;
        }

        const cards = section.querySelectorAll(".publication-card");

        updatePublicationCount(section, cards.length);

    });

}


// =========================================
// 4. SEARCH PUBLICATIONS
// =========================================

function searchPublications(searchInput) {

    const sectionId = searchInput.dataset.search;

    const section = document.getElementById(sectionId);

    if (!section) {
        console.warn("Publication section not found:", sectionId);
        return;
    }

    const searchText = searchInput.value.trim().toLowerCase();

    const cards = section.querySelectorAll(".publication-card");

    let visibleCount = 0;

    cards.forEach(card => {

        const cardText = card.textContent.toLowerCase();

        const matches = cardText.includes(searchText);

        card.style.display = matches ? "" : "none";

        if (matches) {
            visibleCount++;
        }

    });

    updatePublicationCount(section, visibleCount);

}


// =========================================
// 5. SEARCH INPUT EVENT
// =========================================

document.addEventListener("input", function(event) {

    if (event.target.matches(".publication-search-input")) {

        searchPublications(event.target);

    }

});


// =========================================
// 6. INITIALIZE WHEN PAGE LOADS
// =========================================

document.addEventListener("DOMContentLoaded", function() {

    initializePublications();

});
