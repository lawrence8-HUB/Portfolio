

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const projectsBtn = document.getElementById('projects-btn');
if (projectsBtn) {
    projectsBtn.addEventListener('click', function() {
        const projectsSection = document.getElementById('projects');
        projectsSection.style.display = 'block';
        projectsSection.scrollIntoView({ behavior: 'smooth' });
        
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.add('show');
            }, index * 200);
        });
    });
}


const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodes = [];
const numNodes = 50;

for (let i = 0; i < numNodes; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';

    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        nodes.forEach(otherNode => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.stroke();
            }
        });
    });
}

function update() {
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    });
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const profileImg = document.querySelector('.hero-photo img');
const loader = document.querySelector('.hero-photo .loader');
function hideProfileLoader() {
    if (loader) loader.style.display = 'none';
    if (profileImg) profileImg.classList.add('loaded');
}
if (profileImg) {
    if (profileImg.complete && profileImg.naturalWidth !== 0) {
        hideProfileLoader();
    } else {
        profileImg.addEventListener('load', hideProfileLoader);
        profileImg.addEventListener('error', () => {
            if (loader) loader.style.display = 'none';
            console.warn('Erreur de chargement de l\'image de profil');
        });
    }
}
