import { useEffect, useRef } from 'react';

/**
 * ParticleCanvas — Floating romantic particles
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Creates ambient floating particles with a warm romantic glow
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animFrame;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -Math.random() * 0.4 - 0.1;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;

        // Warm romantic colors
        const colors = [
          '201, 169, 110',  // gold
          '183, 110, 121',  // rose gold
          '232, 180, 184',  // pink soft
          '245, 230, 211',  // cream
          '139, 42, 58',    // burgundy light
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeDirection * this.fadeSpeed;

        if (this.opacity <= 0.05 || this.opacity >= 0.5) {
          this.fadeDirection *= -1;
        }

        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity * 0.15})`;
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animFrame = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{ opacity: 0.7 }}
    />
  );
}
