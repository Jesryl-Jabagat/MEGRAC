

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

// User Profile Dropdown handling
function initializeUserDropdown() {
    const userProfile = document.getElementById('userProfileDropdown');
    const dropdownMenu = document.getElementById('userDropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileBtn = document.getElementById('profileBtn');

    // Update user name in header
    const username = sessionStorage.getItem('currentUser');
    const role = sessionStorage.getItem('currentRole');
    const userNameElement = document.querySelector('.user-name');

    if (userNameElement) {
        if (role === 'admin') {
            userNameElement.textContent = 'Admin';
        } else if (role === 'user') {
            userNameElement.textContent = username ? username : 'User';
        } else if (role === 'manager') {
            userNameElement.textContent = 'Manager';
        }
    }

    if (userProfile && dropdownMenu) {
        // Toggle dropdown on profile click
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });

        // Prevent dropdown from closing when clicking inside it
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentRole');
            const pathLower = window.location.pathname.toLowerCase();
            const isInPages = pathLower.indexOf('/pages/') !== -1;
            const pagesPrefix = isInPages ? '' : '../pages/';
            window.location.href = pagesPrefix + 'logIn.html';
        });
    }

    // Profile functionality (placeholder)
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Profile page coming soon!');
            dropdownMenu.classList.remove('show');
        });
    }
}

// Start everything up

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeButtons();
    initializeUserDropdown();

    // Highlight active nav item based on current page
    const path = window.location.pathname.toLowerCase();
    const pageToClass = [
        { match: /index\.html$|\/$/i, cls: 'dashboard' },
        { match: /inventory\.html$/i, cls: 'inventory' },
        { match: /sales\.html$/i, cls: 'sales' },
        { match: /purchases\.html$/i, cls: 'purchases' },
        { match: /customers\.html$/i, cls: 'customers' },
        { match: /suppliers\.html$/i, cls: 'suppliers' },
        { match: /transactions\.html$/i, cls: 'transactions' },
        { match: /money\.html$/i, cls: 'cash' },
        { match: /cashcount\.html$/i, cls: 'cash' }
    ];

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(i => i.classList.remove('active'));

    const mapping = pageToClass.find(m => m.match.test(path)) || pageToClass[0];
    if (mapping) {
        const activeItem = document.querySelector(`.nav-item.${mapping.cls}`);
        if (activeItem) activeItem.classList.add('active');
    }

    // Role-based nav visibility
    const role = sessionStorage.getItem('currentRole');
    const visibilityByRole = {
        'user':      ['purchases', 'customers', 'cash'],
        'manager':   ['dashboard', 'inventory'],
        'admin':     ['dashboard', 'inventory', 'sales', 'purchases', 'customers', 'suppliers', 'transactions', 'cash']
    };
    const visible = visibilityByRole[role] || [];
    if (visible.length) {
        document.querySelectorAll('.nav-item').forEach(item => {
            const classes = Array.from(item.classList);
            const key = classes.find(c => ['dashboard','inventory','sales','purchases','customers','suppliers','transactions','cash'].includes(c));
            if (key && visible.indexOf(key) === -1) {
                item.style.display = 'none';
            }
        });
    }

    // Initialize cash count page if present
    initializeCashCount();

    console.log('All systems initialized!');
});

// Cash count page logic
function initializeCashCount() {
    const cashContainer = document.getElementById('cash-count-container');
    if (!cashContainer) return;

    const inputs = cashContainer.querySelectorAll('input[data-denom]');
    const totalEl = document.getElementById('cash-total');

    function recalc() {
        let sum = 0;
        inputs.forEach(input => {
            const denom = parseFloat(input.getAttribute('data-denom')) || 0;
            const qty = parseFloat(input.value) || 0;
            sum += denom * qty;
        });
        totalEl.textContent = `₱${sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    inputs.forEach(i => i.addEventListener('input', recalc));
    recalc();

    const confirmBtn = document.getElementById('confirm-cash-count');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            sessionStorage.setItem('cashCountDone', 'true');
            // After confirmation, redirect user role to Purchases (first allowed) or Dashboard otherwise
            const role = sessionStorage.getItem('currentRole');
            const pathLower = window.location.pathname.toLowerCase();
            const isInPages = pathLower.indexOf('/pages/') !== -1;
            const clientPrefix = isInPages ? '../' : '';
            const pagesPrefix = isInPages ? '' : '../pages/';
            if (role === 'user') {
                window.location.href = pagesPrefix + 'purchases.html';
            } else {
                window.location.href = clientPrefix + 'index.html';
            }
        });
    }
}
