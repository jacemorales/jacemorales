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

// Fetch and Load Projects
async function loadProjects() {
    try {
        const res = await fetch('image_projects.json');
        const photoProjects = await res.json();

        const projectsGrid = document.getElementById('projectsGrid');
        const photoGallery = document.createElement('div');
        photoGallery.className = 'project-gallery';

        photoProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            photoGallery.appendChild(projectCard);
        });

        projectsGrid.innerHTML = ''; // Clear existing content
        projectsGrid.appendChild(photoGallery);
    } catch (error) {
        console.error('Error loading photo projects:', error);
    }
}

async function loadVideoProjects() {
    try {
        const res = await fetch('video_projects.json');
        const videoProjects = await res.json();

        const videoProjectsGrid = document.getElementById('videoProjectsGrid');
        const videoGallery = document.createElement('div');
        videoGallery.className = 'project-gallery';

        videoProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            videoGallery.appendChild(projectCard);
        });

        videoProjectsGrid.innerHTML = ''; // Clear existing content
        videoProjectsGrid.appendChild(videoGallery);
    } catch (error) {
        console.error('Error loading video projects:', error);
    }
}

const techStackData = [
    // Markup & Styling
    { name: "HTML", icon: "fab fa-html5", category: "Markup & Styling" },
    { name: "CSS", icon: "fab fa-css3-alt", category: "Markup & Styling" },
    { name: "Sass", icon: "fab fa-sass", category: "Markup & Styling" },
    { name: "Tailwind CSS", icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"/></svg>', category: "Markup & Styling" },
    { name: "Bootstrap", icon: "fab fa-bootstrap", category: "Markup & Styling" },

    // Programming Languages
    { name: "JavaScript (ES6+)", icon: "fab fa-js-square", category: "Programming Languages" },
    { name: "TypeScript", icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"/><path data-name="original" fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"/></svg>', category: "Programming Languages" },
    { name: "PHP", icon: "fab fa-php", category: "Programming Languages" },
    { name: "Ruby", icon: "fas fa-gem", category: "Programming Languages" },
    { name: "Python", icon: "fab fa-python", category: "Programming Languages" },
    { name: "Kotlin", icon: "fab fa-android", category: "Programming Languages" },
    { name: "Dart", icon: "fas fa-gem", category: "Programming Languages" },

    // Frontend Frameworks
    { name: "React", icon: "fab fa-react", category: "Frontend Frameworks" },
    { name: "Vue", icon: "fab fa-vuejs", category: "Frontend Frameworks" },
    { name: "AngularJS", icon: "fab fa-angular", category: "Frontend Frameworks" },
    { name: "Next.js", icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"/></svg>', category: "Frontend Frameworks" },
    { name: "jQuery", icon: "fab fa-js-square", category: "Frontend Frameworks" },
    { name: "Lodash", icon: "fab fa-js-square", category: "Frontend Frameworks" },
    { name: "UnderscoreJS", icon: "fab fa-js-square", category: "Frontend Frameworks" },
    { name: "MeteorJS", icon: "fas fa-meteor", category: "Frontend Frameworks" },
    { name: "Three.js", icon: "fas fa-cube", category: "Frontend Frameworks" },

    // Backend Frameworks
    { name: "Laravel", icon: "fab fa-laravel", category: "Backend Frameworks" },
    { name: "Ruby on Rails", icon: "fas fa-gem", category: "Backend Frameworks" },
    { name: "Django", icon: "fab fa-python", category: "Backend Frameworks" },
    { name: "Flask", icon: "fab fa-python", category: "Backend Frameworks" },
    { name: "FastAPI", icon: "fab fa-python", category: "Backend Frameworks" },
    { name: "Express.js", icon: "fab fa-node-js", category: "Backend Frameworks" },
    { name: "NestJS", icon: "fab fa-node-js", category: "Backend Frameworks" },

    // Databases
    { name: "MySQL", icon: "fas fa-database", category: "Databases" },
    { name: "PostgreSQL", icon: "fas fa-database", category: "Databases" },
    { name: "MongoDB", icon: "fas fa-database", category: "Databases" },
    { name: "Redis", icon: "fas fa-database", category: "Databases" },

    // Design Skills
    { name: "UI/UX Design", icon: "fas fa-palette", category: "Design" },

    // DevOps & Tools
    { name: "Git", icon: "fab fa-git-alt", category: "DevOps & Tools" },
    { name: "GitHub", icon: "fab fa-github", category: "DevOps & Tools" },
    { name: "Docker", icon: "fab fa-docker", category: "DevOps & Tools" },
    { name: "npm / yarn", icon: "fab fa-npm", category: "DevOps & Tools" },
    { name: "Postman", icon: "fas fa-rocket", category: "DevOps & Tools" },
    { name: "VS Code", icon: "fas fa-code", category: "DevOps & Tools" },
    { name: "Firebase", icon: "fas fa-database", category: "DevOps & Tools" },
    { name: "Vercel", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path style="fill-rule:nonzero;fill:#000;fill-opacity:1" d="M63.984 17.184 127.964 128H0Zm0 0"/></svg>', category: "DevOps & Tools" },
    { name: "Netlify", icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="147" height="40"> <radialGradient id="a" cy="0%" r="100.11%" gradientTransform="matrix(0 .9989 -1.152 0 .5 -.5)"> <stop offset="0" stop-color="#20c6b7"/> <stop offset="1" stop-color="#4d9abf"/> </radialGradient> <g fill="none" fill-rule="evenodd"> <path fill="#0e1e25" d="m53.37 12.978.123 2.198c1.403-1.7 3.245-2.55 5.525-2.55 3.951 0 5.962 2.268 6.032 6.804v12.568h-4.26v-12.322c0-1.207-.26-2.1-.78-2.681-.52-.58-1.371-.87-2.552-.87-1.719 0-3 .78-3.84 2.338v13.535h-4.262v-19.02h4.016zm24.378 19.372c-2.7 0-4.89-.852-6.567-2.557-1.678-1.705-2.517-3.976-2.517-6.812v-.527c0-1.898.365-3.595 1.096-5.089.73-1.494 1.757-2.657 3.078-3.49 1.321-.831 2.794-1.247 4.42-1.247 2.583 0 4.58.826 5.988 2.478 1.41 1.653 2.114 3.99 2.114 7.014v1.723h-12.4c.13 1.57.652 2.812 1.57 3.726s2.073 1.371 3.464 1.371c1.952 0 3.542-.79 4.77-2.373l2.297 2.198c-.76 1.136-1.774 2.018-3.042 2.645-1.269.627-2.692.94-4.27.94zm-.508-16.294c-1.17 0-2.113.41-2.832 1.23-.72.82-1.178 1.963-1.377 3.428h8.12v-.317c-.094-1.43-.474-2.51-1.14-3.243-.667-.732-1.59-1.098-2.771-1.098zm16.765-7.7v4.623h3.35v3.164h-3.35v10.617c0 .726.144 1.25.43 1.573.286.322.798.483 1.535.483a6.55 6.55 0 0 0 1.49-.176v3.305c-.97.27-1.905.404-2.806.404-3.273 0-4.91-1.81-4.91-5.431v-10.776h-3.124v-3.164h3.122v-4.623h4.261zm11.137 23.643h-4.262v-27h4.262zm9.172 0h-4.262v-19.02h4.262zm-4.525-23.96c0-.655.207-1.2.622-1.634.416-.433 1.009-.65 1.78-.65.772 0 1.368.217 1.79.65.42.434.63.979.63 1.635 0 .644-.21 1.18-.63 1.608-.422.428-1.018.642-1.79.642-.771 0-1.364-.214-1.78-.642-.415-.427-.622-.964-.622-1.608zm10.663 23.96v-15.857h-2.894v-3.164h2.894v-1.74c0-2.11.584-3.738 1.753-4.887 1.17-1.148 2.806-1.722 4.91-1.722.749 0 1.544.105 2.386.316l-.105 3.34a8.375 8.375 0 0 0 -1.631-.14c-2.035 0-3.052 1.048-3.052 3.146v1.687h3.858v3.164h-3.858v15.856h-4.261zm17.87-6.117 3.858-12.903h4.542l-7.54 21.903c-1.158 3.199-3.122 4.799-5.893 4.799-.62 0-1.304-.106-2.052-.317v-3.305l.807.053c1.075 0 1.885-.196 2.429-.589.543-.392.973-1.051 1.289-1.977l.613-1.635-6.664-18.932h4.595z"/> <path fill="url(#a)" fill-rule="nonzero" d="m28.589 14.135-.014-.006c-.008-.003-.016-.006-.023-.013a.11.11 0 0 1 -.028-.093l.773-4.726 3.625 3.626-3.77 1.604a.083.083 0 0 1 -.033.006h-.015c-.005-.003-.01-.007-.02-.017a1.716 1.716 0 0 0 -.495-.381zm5.258-.288 3.876 3.876c.805.806 1.208 1.208 1.355 1.674.022.069.04.138.054.209l-9.263-3.923a.728.728 0 0 0 -.015-.006c-.037-.015-.08-.032-.08-.07s.044-.056.081-.071l.012-.005zm5.127 7.003c-.2.376-.59.766-1.25 1.427l-4.37 4.369-5.652-1.177-.03-.006c-.05-.008-.103-.017-.103-.062a1.706 1.706 0 0 0 -.655-1.193c-.023-.023-.017-.059-.01-.092 0-.005 0-.01.002-.014l1.063-6.526.004-.022c.006-.05.015-.108.06-.108a1.73 1.73 0 0 0 1.16-.665c.009-.01.015-.021.027-.027.032-.015.07 0 .103.014l9.65 4.082zm-6.625 6.801-7.186 7.186 1.23-7.56.002-.01c.001-.01.003-.02.006-.029.01-.024.036-.034.061-.044l.012-.005a1.85 1.85 0 0 0 .695-.517c.024-.028.053-.055.09-.06a.09.09 0 0 1 .029 0l5.06 1.04zm-8.707 8.707-.81.81-8.955-12.942a.424.424 0 0 0 -.01-.014c-.014-.019-.029-.038-.026-.06 0-.016.011-.03.022-.042l.01-.013c.027-.04.05-.08.075-.123l.02-.035.003-.003c.014-.024.027-.047.051-.06.021-.01.05-.006.073-.001l9.921 2.046a.164.164 0 0 1 .076.033c.013.013.016.027.019.043a1.757 1.757 0 0 0 1.028 1.175c.028.014.016.045.003.078a.238.238 0 0 0 -.015.045c-.125.76-1.197 7.298-1.485 9.063zm-1.692 1.691c-.597.591-.949.904-1.347 1.03a2 2 0 0 1 -1.206 0c-.466-.148-.869-.55-1.674-1.356l-8.993-8.993 2.349-3.643c.011-.018.022-.034.04-.047.025-.018.061-.01.091 0a2.434 2.434 0 0 0 1.638-.083c.027-.01.054-.017.075.002a.19.19 0 0 1 .028.032l8.999 13.059zm-14.087-10.186-2.063-2.063 4.074-1.738a.084.084 0 0 1 .033-.007c.034 0 .054.034.072.065a2.91 2.91 0 0 0 .13.184l.013.016c.012.017.004.034-.008.05l-2.25 3.493zm-2.976-2.976-2.61-2.61c-.444-.444-.766-.766-.99-1.043l7.936 1.646a.84.84 0 0 0 .03.005c.049.008.103.017.103.063 0 .05-.059.073-.109.092l-.023.01zm-4.056-4.995a2 2 0 0 1 .09-.495c.148-.466.55-.868 1.356-1.674l3.34-3.34a2175.525 2175.525 0 0 0 4.626 6.687c.027.036.057.076.026.106-.146.161-.292.337-.395.528a.16.16 0 0 1 -.05.062c-.013.008-.027.005-.042.002h-.002l-8.949-1.877zm5.68-6.403 4.489-4.491c.423.185 1.96.834 3.333 1.414 1.04.44 1.988.84 2.286.97.03.012.057.024.07.054.008.018.004.041 0 .06a2.003 2.003 0 0 0 .523 1.828c.03.03 0 .073-.026.11l-.014.021-4.56 7.063c-.012.02-.023.037-.043.05-.024.015-.058.008-.086.001a2.274 2.274 0 0 0 -.543-.074c-.164 0-.342.03-.522.063h-.001c-.02.003-.038.007-.054-.005a.21.21 0 0 1 -.045-.051l-4.808-7.013zm5.398-5.398 5.814-5.814c.805-.805 1.208-1.208 1.674-1.355a2 2 0 0 1 1.206 0c.466.147.869.55 1.674 1.355l1.26 1.26-4.135 6.404a.155.155 0 0 1 -.041.048c-.025.017-.06.01-.09 0a2.097 2.097 0 0 0 -1.92.37c-.027.028-.067.012-.101-.003-.54-.235-4.74-2.01-5.341-2.265zm12.506-3.676 3.818 3.818-.92 5.698v.015a.135.135 0 0 1 -.008.038c-.01.02-.03.024-.05.03a1.83 1.83 0 0 0 -.548.273.154.154 0 0 0 -.02.017c-.011.012-.022.023-.04.025a.114.114 0 0 1 -.043-.007l-5.818-2.472-.011-.005c-.037-.015-.081-.033-.081-.071a2.198 2.198 0 0 0 -.31-.915c-.028-.046-.059-.094-.035-.141zm-3.932 8.606 5.454 2.31c.03.014.063.027.076.058a.106.106 0 0 1 0 .057c-.016.08-.03.171-.03.263v.153c0 .038-.039.054-.075.069l-.011.004c-.864.369-12.13 5.173-12.147 5.173s-.035 0-.052-.017c-.03-.03 0-.072.027-.11a.76.76 0 0 0 .014-.02l4.482-6.94.008-.012c.026-.042.056-.089.104-.089l.045.007c.102.014.192.027.283.027.68 0 1.31-.331 1.69-.897a.16.16 0 0 1 .034-.04c.027-.02.067-.01.098.004zm-6.246 9.185 12.28-5.237s.018 0 .035.017c.067.067.124.112.179.154l.027.017c.025.014.05.03.052.056 0 .01 0 .016-.002.025l-1.052 6.462-.004.026c-.007.05-.014.107-.061.107a1.729 1.729 0 0 0 -1.373.847l-.005.008c-.014.023-.027.045-.05.057-.021.01-.048.006-.07.001l-9.793-2.02c-.01-.002-.152-.519-.163-.52z" transform="translate(-.702)"/> </g> </svg>', category: "DevOps & Tools" },

    // Other
    { name: "AJAX", icon: "fas fa-bolt", category: "Other" },
    { name: "REST", icon: "fas fa-server", category: "Other" },
    { name: "GraphQL", icon: "fas fa-project-diagram", category: "Other" }
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

// Create Project Card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    const media = project.images || project.videos;
    const isVideo = !!project.videos;

    let mediaHtml = media.map((src, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}">
            <img src="${isVideo ? project.thumbnail : src}" alt="${project.title}" loading="lazy">
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
        const prevBtn = card.querySelector('.prev');
        const nextBtn = card.querySelector('.next');
        let currentIndex = 0;

        const showSlide = (index) => {
            const slides = card.querySelectorAll('.slide');
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + media.length) % media.length;
            showSlide(currentIndex);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % media.length;
            showSlide(currentIndex);
        });
    }

    card.addEventListener('click', () => {
        if (isVideo) {
            const currentIndex = Array.from(card.querySelectorAll('.slide')).findIndex(slide => slide.classList.contains('active'));
            window.open(project.videos[currentIndex], '_blank');
        } else {
            openProjectModal(project);
        }
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
    const modalMediaContainer = modal.querySelector('.modal-video'); // Reusing this container

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.fullDescription;

    if (project.images && project.images.length > 0) {
        let currentIndex = 0;
        const media = project.images;

        const updateMedia = () => {
            modalMediaContainer.innerHTML = `
                <div class="modal-slideshow">
                    <img src="${media[currentIndex]}" alt="${project.title}">
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
            modalMediaContainer.addEventListener('click', (e) => {
                if (e.target.closest('.next')) {
                    currentIndex = (currentIndex + 1) % media.length;
                    updateMedia();
                }
                if (e.target.closest('.prev')) {
                    currentIndex = (currentIndex - 1 + media.length) % media.length;
                    updateMedia();
                }
            });
        }
    } else {
        modalMediaContainer.innerHTML = '';
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
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        iframe.src = '';
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

    // Check for elements to decide which page is loaded
    if (document.getElementById('projectsGrid')) {
        loadProjects();
    }

    if (document.getElementById('skills-grid')) {
        generateTechStack('skills-grid');
    }

    const showVideosBtn = document.getElementById('show-video-projects-btn');
    const videoProjectsSection = document.getElementById('video-projects');

    if (showVideosBtn && videoProjectsSection) {
        showVideosBtn.addEventListener('click', () => {
            videoProjectsSection.style.display = 'block';
            loadVideoProjects();
            showVideosBtn.style.display = 'none';
        });
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
