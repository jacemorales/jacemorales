// Portfolio Website JavaScript

const FALLBACK_IMAGE_URL = 'img/placeholder.png';
const FALLBACK_VIDEO_THUMBNAIL_URL = 'img/placeholder.png'; // Or a different placeholder for videos

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        themeToggle.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.25)';
        if (body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(31, 41, 55, 0.25)';
        }
    }
});

// Fetch and Load Projects
async function loadProjects(url, containerId) {
    try {
        const res = await fetch(url);
        const projects = await res.json();

        const projectsGrid = document.getElementById(containerId);
        const gallery = document.createElement('div');
        gallery.className = 'project-gallery';

        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            gallery.appendChild(projectCard);
        });

        projectsGrid.innerHTML = ''; // Clear existing content
        projectsGrid.appendChild(gallery);
    } catch (error) {
        console.error(`Error loading projects from ${url}:`, error);
    }
}

// Slideshow Logic
function initializeSlideshow(container, media) {
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    let currentIndex = 0;
    let slideInterval;

    const showSlide = (index) => {
        const slides = container.querySelectorAll('.slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % media.length;
        showSlide(currentIndex);
    };

    const startSlideshow = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };

    const stopSlideshow = () => {
        clearInterval(slideInterval);
    };

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopSlideshow();
        currentIndex = (currentIndex - 1 + media.length) % media.length;
        showSlide(currentIndex);
        startSlideshow();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    container.addEventListener('mouseenter', stopSlideshow);
    container.addEventListener('mouseleave', startSlideshow);

    startSlideshow();
}

// Create Project Card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    const media = project.images || project.videos;
    const isVideo = !!project.videos;

    let mediaHtml = media.map((src, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}">
            <img src="${isVideo ? project.thumbnail : src}" alt="${project.title}" loading="lazy" onerror="this.onerror=null; this.src='${isVideo ? FALLBACK_VIDEO_THUMBNAIL_URL : FALLBACK_IMAGE_URL}';">
        </div>
    `).join('');

    card.innerHTML = `
        <div class="project-thumbnail">
            <div class="slideshow">
                ${mediaHtml}
            </div>
            ${media.length > 1 ? `
                <div class="slideshow-nav">
                    <button class="prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="next"><i class="fas fa-chevron-right"></i></button>
                </div>
            ` : ''}
            ${isVideo ? `<div class="play-icon"><i class="fas fa-play"></i></div>` : ''}
        </div>
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;

    if (media.length > 1) {
        initializeSlideshow(card, media);
    }

    card.addEventListener('click', () => {
        openProjectModal(project);
    });

    return card;
}

// Modal Functionality
const modal = document.getElementById('projectModal');
const closeBtn = modal ? modal.querySelector('.close') : null;

function openProjectModal(project) {
    if (!modal) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalLinks = document.getElementById('modalLinks');
    const modalMediaContainer = modal.querySelector('.modal-video');

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.fullDescription;

    const media = project.images || project.videos;
    const isVideo = !!project.videos;
    let currentIndex = 0;

    const updateMedia = () => {
        let mediaContent = '';
        if (isVideo) {
            mediaContent = `
                <video src="${media[currentIndex]}" controls autoplay muted playsinline onerror="this.onerror=null; this.parentElement.innerHTML = '<img src=\\'${FALLBACK_VIDEO_THUMBNAIL_URL}\\' alt=\\'Error loading video\\'>';">
                    Your browser does not support the video tag.
                </video>`;
        } else {
            mediaContent = `<img src="${media[currentIndex]}" alt="${project.title}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE_URL}';">`;
        }

        modalMediaContainer.innerHTML = `
            <div class="modal-slideshow">
                ${mediaContent}
                ${media.length > 1 ? `
                    <div class="slideshow-nav">
                        <button class="prev"><i class="fas fa-chevron-left"></i></button>
                        <button class="next"><i class="fas fa-chevron-right"></i></button>
                    </div>
                ` : ''}
            </div>
        `;
    };

    updateMedia();

    if (media.length > 1) {
        initializeSlideshow(modalMediaContainer, media);
    }

    modalTech.innerHTML = project.technologies.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    if (project.links) {
        modalLinks.innerHTML = `
            <a href="${project.links.live}" target="_blank" class="btn btn-primary">Live Demo</a>
            <a href="${project.links.github}" target="_blank" class="btn btn-secondary">GitHub</a>
        `;
    } else {
        modalLinks.innerHTML = '';
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!modal) return;
    const video = modal.querySelector('video');
    if (video) {
        video.pause();
        video.src = '';
    }
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Typing Animation for Hero Section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);

    function type() {
        if (i < text.length) {
            cursor.before(text.charAt(i));
            i++;
            setTimeout(type, speed);
        } else {
            cursor.style.display = 'none';
        }
    }
    type();
}


// MAIN DOMContentLoaded LISTENER
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
    }

    if (document.getElementById('projectsGrid')) {
        loadProjects('projects_image.json', 'projectsGrid');
    }

    const showVideosBtn = document.getElementById('show-video-projects-btn');
    const videoProjectsSection = document.getElementById('video-projects');

    if (showVideosBtn && videoProjectsSection) {
        showVideosBtn.addEventListener('click', () => {
            videoProjectsSection.style.display = 'block';
            loadProjects('projects_video.json', 'videoProjectsGrid');
            showVideosBtn.style.display = 'none';
        });
    }

    if (document.getElementById('skills-grid')) {
        generateTechStack('skills-grid');
    }
    
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        if(text) typeWriter(typewriterElement, text);
    }

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content, .job-card');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Modal event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeProjectModal();
        }
    });
});
