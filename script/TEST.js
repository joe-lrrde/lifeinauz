
// Create particle effect
const particlesContainer = document.getElementById('particles-container');
const particleCount = 80;

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size (small)
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Initial position
    resetParticle(particle);

    particlesContainer.appendChild(particle);

    // Animate
    animateParticle(particle);
}

function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';

    return {
        x: posX,
        y: posY
    };
}

function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);

    // Random animation properties
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    // Animate with GSAP-like timing
    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        // Move in a slight direction
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30; // Move upwards

        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;

        // Reset after animation completes
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

// Mouse interaction
document.addEventListener('mousemove', (e) => {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Random size
  const size = Math.random() * 6 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Position at cursor (px!)
  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;

  particlesContainer.appendChild(particle);

  // Animate outward (next frame so transition applies)
  requestAnimationFrame(() => {
    const offsetX = Math.random() * 40 - 20;
    const offsetY = Math.random() * 40 - 20;
    particle.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.5)`;
    particle.style.opacity = '0';
  });

  // Remove after animation
  setTimeout(() => {
    particle.remove();
  }, 2000);
});

