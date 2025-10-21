// ===== PARTICLES.JS CUSTOM CONFIGURATION =====
// This file is for custom particle effects that complement the main particles.js library

// Custom particle animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    // If particlesJS is not loaded from CDN, we'll create a simple fallback
    if (typeof particlesJS === 'undefined') {
        console.warn('particlesJS not loaded from CDN, using fallback animation');
        
        // Create fallback particle animation
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;
        
        // Create canvas for fallback animation
        const canvas = document.createElement('canvas');
        canvas.id = 'fallback-particles';
        particlesContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(0, 243, 255, ${Math.random() * 0.5 + 0.1})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles
        const particles = [];
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Draw connections between nearby particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = particlesContainer.offsetWidth;
            canvas.height = particlesContainer.offsetHeight;
        });
        
        // Start animation
        animate();
    }
});