// Portfolio Website JavaScript

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

// Projects Data
const projectsData = [
    {
        id: 1,
        title: "Project Alpha",
        description: "A modern web application built with React and Node.js featuring real-time collaboration and advanced data visualization.",
        thumbnail: "projects/imga.png",
        video: "projects/0205.mp4",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "D3.js"],
        links: {
            live: "#",
            github: "#"
        },
        fullDescription: "This project showcases a comprehensive web application that combines modern frontend technologies with a robust backend infrastructure. The application features real-time collaboration capabilities, allowing multiple users to work together seamlessly. Advanced data visualization components provide insights through interactive charts and graphs, making complex data easily understandable."
    },
    {
        id: 2,
        title: "Project Beta",
        description: "Mobile-first e-commerce platform with advanced filtering, payment integration, and responsive design.",
        thumbnail: "projects/imgb.png",
        video: "projects/0805.mp4",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Stripe", "PWA"],
        links: {
            live: "#",
            github: "#"
        },
        fullDescription: "A comprehensive e-commerce solution designed with mobile-first principles. The platform includes advanced product filtering, secure payment processing through Stripe integration, and progressive web app capabilities for enhanced user experience. The responsive design ensures optimal performance across all devices."
    },
    {
        id: 3,
        title: "Project Gamma",
        description: "AI-powered dashboard for data analytics with machine learning insights and predictive modeling.",
        thumbnail: "projects/imgc.png",
        video: "projects/0205.mp4", // Reusing video for demo
        technologies: ["Python", "TensorFlow", "React", "FastAPI", "Docker"],
        links: {
            live: "#",
            github: "#"
        },
        fullDescription: "An intelligent analytics dashboard that leverages machine learning algorithms to provide predictive insights and data-driven recommendations. Built with Python and TensorFlow for the AI components, and React for the frontend, this project demonstrates the integration of advanced analytics with modern web technologies."
    }
];

// Load Projects with Tabs
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const imageGallery = document.createElement('div');
    const videoGallery = document.createElement('div');
    
    imageGallery.className = 'project-gallery';
    videoGallery.className = 'project-gallery';
    
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        if (project.video) {
            projectCard.querySelector('.project-thumbnail').classList.add('video-indicator');
            videoGallery.appendChild(projectCard);
        } else {
            imageGallery.appendChild(projectCard);
        }
    });

    // Show image gallery by default
    projectsGrid.appendChild(imageGallery);
    projectsGrid.appendChild(videoGallery);
    
    // Setup tab functionality
    const tabs = document.querySelectorAll('.project-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (tab.getAttribute('data-tab') === 'images') {
                imageGallery.style.display = 'grid';
                videoGallery.style.display = 'none';
            } else {
                imageGallery.style.display = 'none';
                videoGallery.style.display = 'grid';
            }
        });
    });
    
    // Activate images tab by default
    document.querySelector('[data-tab="images"]').classList.add('active');
    imageGallery.style.display = 'grid';
    videoGallery.style.display = 'none';
}

// Create Project Card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);
    
    card.innerHTML = `
        <div class="project-thumbnail">
            <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openProjectModal(project));
    
    return card;
}

// Modal Functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const modalVideo = document.getElementById('modalVideo');

function openProjectModal(project) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalLinks = document.getElementById('modalLinks');
    
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.fullDescription;
    
    // Set up video with HLS support if available
    setupVideoPlayer(modalVideo, project.video);
    
    // Add technologies
    modalTech.innerHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Add links
    modalLinks.innerHTML = `
        <a href="${project.links.live}" target="_blank">Live Demo</a>
        <a href="${project.links.github}" target="_blank">GitHub</a>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

// Video Player Setup with HLS Support
function setupVideoPlayer(videoElement, videoSrc) {
    if (videoSrc.endsWith('.m3u8')) {
        // HLS streaming support
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            videoElement.src = videoSrc;
        }
    } else {
        // Regular video file
        videoElement.src = videoSrc;
    }
}

// Modal Event Listeners
closeBtn.addEventListener('click', closeProjectModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
});

// Project Tabs
const projectTabs = document.querySelectorAll('.project-tab');
const projectSections = document.querySelectorAll('.project-section');

projectTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and sections
    projectTabs.forEach(t => t.classList.remove('active'));
    projectSections.forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding section
    tab.classList.add('active');
    projectSections[index].classList.add('active');
  });
});

// Employment History Animation
const jobEntries = document.querySelectorAll('.job-entry');

const observeJobs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

jobEntries.forEach(entry => {
  entry.style.opacity = '0';
  entry.style.transform = 'translateY(20px)';
  observeJobs.observe(entry);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing Animation for Hero Section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 50);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skills Animation on Scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize skills animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}