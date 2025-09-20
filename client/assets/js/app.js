// Main app initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('App loaded!');
});

// Navigation between pages

function showSection(sectionId) {
    // Hide all page sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate the corresponding nav item
    const activeNavItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    console.log(`Switched to section: ${sectionId}`);
}

// Search stuff

function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            // Add your search logic here
        });
    });
}

// Button click handlers

function initializeButtons() {
    // Add Inventory Button
    const addInventoryBtn = document.querySelector('.btn-primary');
    if (addInventoryBtn && addInventoryBtn.textContent.includes('Add Inventory')) {
        addInventoryBtn.addEventListener('click', function() {
            console.log('Add Inventory button clicked');
            // Add your add inventory logic here
        });
    }
    
    // Export Button
    const exportBtn = document.querySelector('.btn-secondary');
    if (exportBtn && exportBtn.textContent.includes('Export')) {
        exportBtn.addEventListener('click', function() {
            console.log('Export button clicked');
            // Add your export logic here
        });
    }
}

// Start everything up

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeButtons();
    console.log('All systems initialized!');
});
