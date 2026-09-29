// Portfolio Website JavaScript

const FALLBACK_IMAGE_URL = 'img/no_item.png';
const FALLBACK_VIDEO_THUMBNAIL_URL = 'img/no_item.png';

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

const techStackData = [

    // =========================================================
    // MARKUP & STYLING
    // =========================================================
    { name: "HTML", icon: "fab fa-html5", category: "Markup & Styling" },
    { name: "CSS", icon: "fab fa-css3-alt", category: "Markup & Styling" },
    { name: "Sass", icon: "fab fa-sass", category: "Markup & Styling" },
    {
        name: "Tailwind CSS",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"/></svg>',
        category: "Markup & Styling"
    },
    { name: "Bootstrap", icon: "fab fa-bootstrap", category: "Markup & Styling" },
    { name: "HTMX", icon: "fas fa-code", category: "Markup & Styling" },


    // =========================================================
    // PROGRAMMING LANGUAGES
    // =========================================================
    { name: "JavaScript (ES6+)", icon: "fab fa-js-square", category: "Programming Languages" },
    {
        name: "TypeScript",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"/><path data-name="original" fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9 9 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26z"/></svg>',
        category: "Programming Languages"
    },
    { name: "PHP", icon: "fab fa-php", category: "Programming Languages" },
    { name: "Python", icon: "fab fa-python", category: "Programming Languages" },
    { name: "Ruby", icon: "fas fa-gem", category: "Programming Languages" },
    { name: "C", icon: "fas fa-code", category: "Programming Languages" },
    { name: "C#", icon: "fas fa-hashtag", category: "Programming Languages" },
    { name: "Java", icon: "fab fa-java", category: "Programming Languages" },
    { name: "Kotlin", icon: "fab fa-android", category: "Programming Languages" },
    { name: "Swift", icon: "fab fa-swift", category: "Programming Languages" },
    { name: "Dart", icon: "fas fa-code", category: "Programming Languages" },


    // =========================================================
    // FRONTEND FRAMEWORKS & LIBRARIES
    // =========================================================
    { name: "React", icon: "fab fa-react", category: "Frontend Frameworks & Libraries" },
    { name: "Vue.js", icon: "fab fa-vuejs", category: "Frontend Frameworks & Libraries" },
    { name: "Angular", icon: "fab fa-angular", category: "Frontend Frameworks & Libraries" },
    { name: "SolidJS", icon: "fas fa-code", category: "Frontend Frameworks & Libraries" },
    { name: "Qwik", icon: "fas fa-bolt", category: "Frontend Frameworks & Libraries" },
    { name: "Preact", icon: "fab fa-react", category: "Frontend Frameworks & Libraries" },
    { name: "MeteorJS", icon: "fas fa-meteor", category: "Frontend Frameworks & Libraries" },
    { name: "Three.js", icon: "fas fa-cube", category: "Frontend Frameworks & Libraries" },
    { name: "Redux", icon: "fas fa-layer-group", category: "Frontend Frameworks & Libraries" },
    { name: "jQuery", icon: "fab fa-js-square", category: "Frontend Frameworks & Libraries" },


    // =========================================================
    // META-FRAMEWORKS / FULL-STACK FRAMEWORKS
    // =========================================================
    { name: "Next.js", icon: "fas fa-code", category: "Meta-Frameworks" },
    { name: "Nuxt.js", icon: "fab fa-vuejs", category: "Meta-Frameworks" },


    // =========================================================
    // BACKEND RUNTIME & FRAMEWORKS
    // =========================================================
    { name: "Node.js", icon: "fab fa-node-js", category: "Backend & Server Development" },
    { name: "Express.js", icon: "fab fa-node-js", category: "Backend & Server Development" },
    { name: "NestJS", icon: "fab fa-node-js", category: "Backend & Server Development" },
    { name: "PHP", icon: "fab fa-php", category: "Backend & Server Development" },
    { name: "Laravel", icon: "fab fa-laravel", category: "Backend & Server Development" },
    { name: "Python", icon: "fab fa-python", category: "Backend & Server Development" },
    { name: "Django", icon: "fab fa-python", category: "Backend & Server Development" },
    { name: "Flask", icon: "fab fa-python", category: "Backend & Server Development" },
    { name: "FastAPI", icon: "fab fa-python", category: "Backend & Server Development" },
    { name: "Ruby on Rails", icon: "fas fa-gem", category: "Backend & Server Development" },
    { name: "Spring Boot", icon: "fas fa-leaf", category: "Backend & Server Development" },


    // =========================================================
    // MOBILE DEVELOPMENT
    // =========================================================
    { name: "React Native", icon: "fab fa-react", category: "Mobile Development" },
    { name: "Flutter", icon: "fas fa-mobile-alt", category: "Mobile Development" },
    { name: "Dart", icon: "fas fa-code", category: "Mobile Development" },
    { name: "Kotlin", icon: "fab fa-android", category: "Mobile Development" },
    { name: "Swift", icon: "fab fa-swift", category: "Mobile Development" },


    // =========================================================
    // DATABASES & DATA STORAGE
    // =========================================================
    { name: "MySQL", icon: "fas fa-database", category: "Databases & Data Storage" },
    { name: "PostgreSQL", icon: "fas fa-database", category: "Databases & Data Storage" },
    { name: "MongoDB", icon: "fas fa-database", category: "Databases & Data Storage" },
    { name: "Redis", icon: "fas fa-database", category: "Databases & Data Storage" },
    { name: "NoSQL", icon: "fas fa-database", category: "Databases & Data Storage" },
    { name: "Prisma", icon: "fas fa-database", category: "Databases & Data Storage" },


    // =========================================================
    // API & WEB SERVICES
    // =========================================================
    { name: "REST APIs", icon: "fas fa-server", category: "API & Web Services" },
    { name: "GraphQL", icon: "fas fa-project-diagram", category: "API & Web Services" },
    { name: "Postman", icon: "fas fa-rocket", category: "API & Web Services" },
    { name: "AJAX", icon: "fas fa-bolt", category: "API & Web Services" },


    // =========================================================
    // CLOUD & INFRASTRUCTURE
    // =========================================================
    { name: "AWS", icon: "fab fa-aws", category: "Cloud & Infrastructure" },
    { name: "Apache", icon: "fas fa-server", category: "Cloud & Infrastructure" },
    { name: "Docker", icon: "fab fa-docker", category: "Cloud & Infrastructure" },
    { name: "Firebase", icon: "fas fa-fire", category: "Cloud & Infrastructure" },
    { name: "Vercel", icon: "fas fa-triangle", category: "Cloud & Infrastructure" },
    { name: "Netlify", icon: "fas fa-cloud", category: "Cloud & Infrastructure" },


    // =========================================================
    // DEVOPS, VERSION CONTROL & DEVELOPMENT TOOLS
    // =========================================================
    { name: "Git", icon: "fab fa-git-alt", category: "DevOps & Developer Tools" },
    { name: "GitHub", icon: "fab fa-github", category: "DevOps & Developer Tools" },
    { name: "Shell Scripting", icon: "fas fa-terminal", category: "DevOps & Developer Tools" },
    { name: "Bash", icon: "fas fa-terminal", category: "DevOps & Developer Tools" },
    { name: "FileZilla", icon: "fas fa-file-upload", category: "DevOps & Developer Tools" },
    { name: "VS Code", icon: "fas fa-code", category: "DevOps & Developer Tools" },


    // =========================================================
    // BUILD TOOLS & PACKAGE MANAGEMENT
    // =========================================================
    { name: "npm", icon: "fab fa-npm", category: "Build Tools & Package Management" },
    { name: "Yarn", icon: "fab fa-yarn", category: "Build Tools & Package Management" },
    { name: "npx", icon: "fab fa-npm", category: "Build Tools & Package Management" },


    // =========================================================
    // AI / LLM / AUTOMATION
    // =========================================================
    { name: "LLM Development", icon: "fas fa-brain", category: "AI & LLM Development" },
    { name: "AI Agents", icon: "fas fa-robot", category: "AI & LLM Development" },
    { name: "AI Automation", icon: "fas fa-microchip", category: "AI & LLM Development" },


    // =========================================================
    // CREATIVE / 3D / VIDEO DEVELOPMENT
    // =========================================================
    { name: "Three.js", icon: "fas fa-cube", category: "3D & Creative Development" },
    { name: "Remotion", icon: "fas fa-video", category: "3D & Creative Development" },


    // =========================================================
    // UI / UX & DESIGN
    // =========================================================
    { name: "Figma", icon: "fab fa-figma", category: "UI/UX & Design" },
    { name: "UI/UX Design", icon: "fas fa-palette", category: "UI/UX & Design" },


    // =========================================================
    // ADDITIONAL JAVASCRIPT / WEB TECHNOLOGIES
    // =========================================================
    { name: "Lodash", icon: "fab fa-js-square", category: "JavaScript Ecosystem" },
    { name: "Underscore.js", icon: "fab fa-js-square", category: "JavaScript Ecosystem" }

];
function generateTechStack(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; // Clear previous content

    const techByCategory = techStackData.reduce((acc, tech) => {
        const { category } = tech;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tech);
        return acc;
    }, {});

    for (const category in techByCategory) {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'skill-category';

        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categoryEl.appendChild(categoryTitle);

        const skillsList = document.createElement('div');
        skillsList.className = 'skills-list';

        techByCategory[category].forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            let iconHtml = '';
            if (skill.icon.startsWith('<svg')) {
                iconHtml = skill.icon;
            } else {
                iconHtml = `<i class="${skill.icon}"></i>`;
            }

            skillItem.innerHTML = `${iconHtml}<span>${skill.name}</span>`;
            skillsList.appendChild(skillItem);
        });

        categoryEl.appendChild(skillsList);
        container.appendChild(categoryEl);
    }
}

// Slideshow Logic
function initializeSlideshow(container, project, isModal) {
    const media = project.images || project.videos;
    if (media.length <= 1) return;

    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    let currentIndex = 0;
    let slideInterval;

    const showSlide = (index) => {
        if (isModal) {
            const mediaContainer = container.querySelector('.modal-slideshow-media');
            const isVideo = !!project.videos;
            let mediaContent = '';
            if (isVideo) {
                mediaContent = `
                    <video src="${media[index]}" controls autoplay muted onerror="this.onerror=null; this.parentElement.innerHTML = '<img src=\\'${FALLBACK_VIDEO_THUMBNAIL_URL}\\' alt=\\'Error loading video\\'>';">
                        Your browser does not support the video tag.
                    </video>`;
            } else {
                mediaContent = `<img src="${media[index]}" alt="${project.title}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE_URL}';">`;
            }
            mediaContainer.innerHTML = mediaContent;
        } else {
            const slides = container.querySelectorAll('.slide');
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % media.length;
        showSlide(currentIndex);
    };

    const startSlideshow = () => {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    };

    const stopSlideshow = () => {
        clearInterval(slideInterval);
    };

    if (prevBtn && nextBtn) {
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
    }

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
        initializeSlideshow(card, project, false);
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

    let initialMediaContent = '';
    if (project.videos) {
        initialMediaContent = `
            <video src="${media[0]}" controls autoplay muted onerror="this.onerror=null; this.parentElement.innerHTML = '<img src=\\'${FALLBACK_VIDEO_THUMBNAIL_URL}\\' alt=\\'Error loading video\\'>';">
                Your browser does not support the video tag.
            </video>`;
    } else {
        initialMediaContent = `<img src="${media[0]}" alt="${project.title}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE_URL}';">`;
    }

    modalMediaContainer.innerHTML = `
        <div class="modal-slideshow">
            <div class="modal-slideshow-media">${initialMediaContent}</div>
            ${media.length > 1 ? `
                <div class="slideshow-nav">
                    <button class="prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="next"><i class="fas fa-chevron-right"></i></button>
                </div>
            ` : ''}
        </div>
    `;

    if (media.length > 1) {
        initializeSlideshow(modalMediaContainer.querySelector('.modal-slideshow'), project, true);
    }

    modalTech.innerHTML = project.technologies.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    if (project.links && Array.isArray(project.links)) {
        modalLinks.innerHTML = project.links.map(link =>
            `<a href="${link.url}" target="_blank" class="btn ${link.type === 'primary' ? 'btn-primary' : 'btn-secondary'}">${link.name}</a>`
        ).join('');
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