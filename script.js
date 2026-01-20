// Data Source
const resources = [
    {
        id: 1,
        name: "Willowfork Fire Department",
        category: "Emergency Services",
        description: "providing fire suppression, rescue, and emergency medical services to the community.",
        location: "24655 Westheimer Pkwy",
        icon: "🚒"
    },
    {
        id: 2,
        name: "Fort Bend County Animal Services",
        category: "Services",
        description: "Dedicated to the welfare of animals and the safety of the residents in Fort Bend County.",
        location: "1210 Blume Rd, Rosenberg",
        icon: "🐾"
    },
    {
        id: 3,
        name: "Cinco Ranch Parks & Rec",
        category: "Parks",
        description: "Maintain and operate over 50 parks, greenbelts, and recreational facilities.",
        location: "Various Locations",
        icon: "🌳"
    },
    {
        id: 4,
        name: "Cinco Ranch Pools",
        category: "Amenities",
        description: "Access to 11 community pools including the Beach Club and Water Park.",
        location: "Various Locations",
        icon: "🏊"
    },
    {
        id: 5,
        name: "Pickleball & Tennis Courts",
        category: "Sports",
        description: "Reserve charts for tennis or pickleball. Leagues and lessons available.",
        location: "Approved Courts",
        icon: "🎾"
    },
    {
        id: 6,
        name: "Cinco Ranch Cricket Pitch",
        category: "Sports",
        description: "Regulation size cricket pitch available for resident use and league play.",
        location: "Community Center",
        icon: "🏏"
    },
    {
        id: 7,
        name: "The Golf Club at Cinco Ranch",
        category: "Sports",
        description: "18-hole championship golf course open to the public with membership options.",
        location: "2830 Cinco Ranch Blvd",
        icon: "⛳"
    },
    {
        id: 8,
        name: "Residential Property Association",
        category: "Services",
        description: "Managing deed restrictions, architectural control, and community standards.",
        location: "3022 Windemere Park Ln",
        icon: "🏠"
    },
    {
        id: 9,
        name: "Community Volunteer Fire Dept",
        category: "Emergency Services",
        description: "Volunteer-driven emergency response team serving the greater area.",
        location: "16005 Bellaire Blvd",
        icon: "👨‍🚒"
    },
    {
        id: 10,
        name: "Cinco Ranch Library",
        category: "Services",
        description: "Public library branch offering books, digital media, and community programs.",
        location: "2620 Commercial Center Blvd",
        icon: "📚"
    },
    {
        id: 11,
        name: "Nature Trails Network",
        category: "Parks",
        description: "Miles of paved and natural trails for jogging, biking, and walking.",
        location: "Throughout Community",
        icon: "🚲"
    },
    {
        id: 12,
        name: "Lake House Community Center",
        category: "Amenities",
        description: "Event space rental and community gathering hub overlooking the lake.",
        location: "25202 Springwood Lake Dr",
        icon: "🏛️"
    }
];

// State
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const spotlightContainer = document.getElementById('spotlight-container');
const resourceContainer = document.getElementById('resource-container');
const filterContainer = document.getElementById('filter-container');
const searchInput = document.getElementById('search-input');
const noResultsInfo = document.getElementById('no-results');
const addResourceForm = document.getElementById('add-resource-form');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderSpotlights();
    generateFilterButtons();
    renderResources();
    setupEventListeners();
    setupAnimations();
});

// Logic
function renderSpotlights() {
    // Pick 3 random highlights or specific ones
    const highlights = [resources[2], resources[6], resources[11]]; // Parks, Golf, Trails
    
    spotlightContainer.innerHTML = highlights.map(item => `
        <div class="card fade-in">
            <div class="card-header">
                <span class="card-tag">${item.category}</span>
                ${item.icon}
            </div>
            <div class="card-body">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="card-meta">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    ${item.location}
                </div>
            </div>
        </div>
    `).join('');
}

function generateFilterButtons() {
    const categories = ['All', ...new Set(resources.map(r => r.category))];
    
    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat.toLowerCase() === 'all' ? 'active' : ''}" 
                data-category="${cat}">
            ${cat}
        </button>
    `).join('');
}

function renderResources() {
    // Filter logic
    const filtered = resources.filter(item => {
        const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Toggle No Results
    if (filtered.length === 0) {
        resourceContainer.innerHTML = '';
        noResultsInfo.classList.remove('hidden');
    } else {
        noResultsInfo.classList.add('hidden');
        resourceContainer.innerHTML = filtered.map((item, index) => `
            <div class="resource-item fade-in" style="animation-delay: ${index * 0.05}s">
                <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:1rem;">
                    <span style="font-size:2rem;">${item.icon}</span>
                    <span style="font-size:0.8rem; background:#f0f0f0; padding:4px 8px; border-radius:12px; color:#666;">${item.category}</span>
                </div>
                <h4 style="font-size:1.1rem; margin-bottom:0.5rem;">${item.name}</h4>
                <p style="font-size:0.9rem; color:#666; margin-bottom:1rem; line-height:1.5;">${item.description}</p>
                <div style="font-size:0.85rem; color:#888; display:flex; align-items:center; gap:0.5rem;">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    ${item.location}
                </div>
            </div>
        `).join('');
    }
}

function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderResources();
    });

    // Filters
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            // Update state
            currentFilter = e.target.getAttribute('data-category');
            if (currentFilter === 'All') currentFilter = 'all';
            renderResources();
        }
    });

    // Form
    addResourceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate data collection
        const name = document.getElementById('res-name').value;
        const category = document.getElementById('res-category').value;
        
        // Visual feedback
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "Submitted!";
        btn.style.backgroundColor = "#8F9E8B"; // Sage Green
        
        alert(`Thank you! "${name}" has been submitted for review.`);
        
        e.target.reset();
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 3000);
    });

    // Scroll Header effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.padding = "0.8rem 0";
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
        } else {
            header.style.padding = "1.5rem 0";
            header.style.boxShadow = "none";
        }
    });
}

function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Select elements to animate
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}
