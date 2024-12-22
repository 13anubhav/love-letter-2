
// Three.js Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

const starsVertices = [];
for(let i = 0; i < 10000; i++) {
    starsVertices.push(
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000
    );
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0002;
    renderer.render(scene, camera);
}
animate();

// Particle Effects
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.innerHTML = ['❤️', '✨', '💖', '💕'][Math.floor(Math.random() * 4)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 5000);
}

setInterval(createParticle, 200);

// 3D Tilt Effect
const container = document.querySelector('.container');
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
});

container.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
});

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Heart Pump Touch Effect
document.addEventListener('DOMContentLoaded', () => {
    // Handle both touch and click events
    ['click', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, (e) => {
            // Prevent default touch behavior
            if (eventType === 'touchstart') {
                e.preventDefault();
            }

            // Create heart element
            const heart = document.createElement('div');
            heart.className = 'heart-pump';
            heart.innerHTML = '❤️';

            // Position heart at click/touch point
            const x = eventType === 'click' ? e.clientX : e.touches[0].clientX;
            const y = eventType === 'click' ? e.clientY : e.touches[0].clientY;

            heart.style.left = `${x - 15}px`;
            heart.style.top = `${y - 15}px`;

            // Add to document
            document.body.appendChild(heart);

            // Random rotation
            const rotation = Math.random() * 30 - 15;
            heart.style.transform = `rotate(${rotation}deg)`;

            // Remove after animation
            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }, { passive: false });
    });

    // Prevent default touch behavior on mobile
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
});

// Music Control
document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // Add touch feedback
    musicBtn.addEventListener('touchstart', () => {
        musicBtn.style.transform = 'scale(0.95)';
    });

    musicBtn.addEventListener('touchend', () => {
        musicBtn.style.transform = 'scale(1)';
    });

    // Toggle music
    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
                isPlaying = true;
            }).catch(err => {
                console.log("Playback failed:", err);
            });
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            isPlaying = false;
        }
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            isPlaying = false;
        }
    });

    // Handle mobile interactions
    bgMusic.addEventListener('ended', () => {
        musicBtn.classList.remove('playing');
        isPlaying = false;
    });

    // Preload audio
    bgMusic.load();
});
