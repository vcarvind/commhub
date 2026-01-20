// Data Source
const resources = [
    // Emergency
    { id: 1, name: "Emergency Dispatch", category: "Emergency Services", description: "Police, Fire, and Ambulance.", location: "Call 911", icon: "🚨" },
    { id: 2, name: "Poison Control", category: "Emergency Services", description: "Emergency poison information.", location: "800-222-1222", icon: "☠️" },

    // Fort Bend County
    { id: 3, name: "Sheriff/Constable Dispatch", category: "County Services", description: "Fort Bend County Sheriff.", location: "281-341-4665", icon: "👮" },
    { id: 4, name: "Fort Bend County Commissioner", category: "County Services", description: "County administration.", location: "281-238-1400", icon: "🏛️" },
    { id: 5, name: "Constable Precinct 3", category: "County Services", description: "Administration office.", location: "281-238-1430", icon: "👮" },
    { id: 6, name: "Willowfork Fire Department", category: "Emergency Services", description: "Fire suppression and rescue.", location: "281-395-0011", icon: "🚒" },
    { id: 7, name: "Fort Bend Animal Services", category: "Services", description: "Animal control and welfare.", location: "281-342-1512", icon: "🐾" },
    { id: 8, name: "Household Hazardous Waste", category: "Services", description: "Safe disposal services.", location: "281-633-7581", icon: "☣️" },

    // Harris County
    { id: 9, name: "Harris County Sheriff", category: "County Services", description: "Law enforcement.", location: "713-221-6000", icon: "👮" },
    { id: 10, name: "Harris County Commissioner", category: "County Services", description: "County administration.", location: "713-755-6306", icon: "🏛️" },
    { id: 11, name: "Constable Precinct 5 (Dispatch)", category: "County Services", description: "Dispatch line.", location: "281-463-6666", icon: "👮" },
    { id: 12, name: "Constable Precinct 5 (Admin)", category: "County Services", description: "Administration line.", location: "832-927-6700", icon: "👮" },
    { id: 13, name: "HCESD 48 Fire Department", category: "Emergency Services", description: "Fire department services.", location: "281-599-8888", icon: "🚒" },
    { id: 14, name: "Harris County Animal Services", category: "Services", description: "Animal control.", location: "281-999-3191", icon: "🐾" },

    // Utilities
    { id: 15, name: "Call Before You Dig", category: "Utilities", description: "Safety marking for underground lines.", location: "811", icon: "🏗️" },
    { id: 16, name: "Best Trash", category: "Utilities", description: "Waste management services.", location: "281-313-2378", icon: "🗑️" },
    { id: 17, name: "Republic Waste", category: "Utilities", description: "Waste disposal.", location: "281-446-2030", icon: "🗑️" },
    { id: 18, name: "Texas Pride", category: "Utilities", description: "Disposal solutions.", location: "281-342-8178", icon: "🗑️" },
    { id: 19, name: "GFL Environmental", category: "Utilities", description: "Environmental services.", location: "281-368-8397", icon: "♻️" },
    { id: 20, name: "Inframark", category: "Utilities", description: "Water and infrastructure services.", location: "281-579-4500", icon: "💧" },
    { id: 21, name: "SI Environmental", category: "Utilities", description: "Water utility services.", location: "832-490-1601", icon: "💧" },

    // Medical
    { id: 22, name: "Memorial Hermann Katy", category: "Medical", description: "Full-service hospital.", location: "281-644-7000", icon: "🏥" },
    { id: 23, name: "Houston Methodist Continuing Care", category: "Medical", description: "Long-term acute care.", location: "832-522-7550", icon: "🏥" },
    { id: 24, name: "Houston Methodist West", category: "Medical", description: "Full-service medical center.", location: "832-522-1000", icon: "🏥" },
    { id: 25, name: "Texas Children's Hospital West", category: "Medical", description: "Pediatric care.", location: "832-227-1000", icon: "🏥" },

    // Postal & Shipping
    { id: 26, name: "Katy Post Office", category: "Services", description: "20180 Park Row", location: "281-829-5062", icon: "✉️" },
    { id: 27, name: "Katy Annex Post Office", category: "Services", description: "1331 Pin Oak Rd", location: "281-574-1401", icon: "✉️" },
    { id: 28, name: "Katy Finance Post Office", category: "Services", description: "5701 4th St", location: "281-391-7538", icon: "✉️" },
    { id: 29, name: "ACE Cinco Ranch (CPU)", category: "Services", description: "1720 S Mason Rd", location: "281-392-5200", icon: "📦" },
    { id: 30, name: "FedEx", category: "Services", description: "Shipping services.", location: "800-463-3339", icon: "🚚" },
    { id: 31, name: "UPS", category: "Services", description: "Shipping services.", location: "888-742-5877", icon: "🚚" },

    // Community
    { id: 32, name: "Katy Independent School District", category: "Education", description: "Public school district registration.", location: "katyisd.org", icon: "🎓" },
    { id: 33, name: "The ARC of Katy", category: "Community", description: "Programs for individuals with I/DD.", location: "thearcofkaty.org", icon: "🤝" },
    { id: 34, name: "National Hurricane Center", category: "Information", description: "Weather alerts and tracking.", location: "Online", icon: "🌪️" }
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
    // Pick specific highlights
    const highlights = [resources[5], resources[21], resources[31]]; // Willowfork Fire, Memorial Hermann, Katy ISD

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
