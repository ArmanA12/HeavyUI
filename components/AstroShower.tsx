import React, { useEffect, useRef } from 'react';

const AsteroidShower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Aapke preferred orange shades
    const ORANGE_PALETTE = ['#f59e09', '#ed8d02', '#e57d00', '#dc6c00', '#d35b00'];
    const getRandomColor = () => ORANGE_PALETTE[Math.floor(Math.random() * ORANGE_PALETTE.length)];

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    window.addEventListener('resize', resize);
    resize();

    const GRAVITY = 0.25;
    const DRAG = 0.96;

    class Asteroid {
      x: number;
      y: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = -100 - Math.random() * 500;
        this.vy = Math.random() * 5 + 8;
        this.size = Math.random() * 1.5 + 1;
        this.color = getRandomColor(); // Har asteroid ka apna color
      }

      update() {
        this.vy += 0.05;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        const trailLength = this.vy * 4;
        
        ctx.globalAlpha = 0.3;
        ctx.fillRect(this.x, this.y - trailLength, this.size, trailLength);
        
        ctx.globalAlpha = 1.0;
        ctx.fillRect(this.x, this.y, this.size, Math.max(this.size, this.vy));
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = (Math.random() * Math.PI) + Math.PI;
        const force = Math.random() * 8 + 4;
        this.vx = (Math.random() - 0.5) * force * 1.5;
        this.vy = (Math.random() * -1) * force * 0.8;
        this.life = 1.0;
        this.size = Math.random() * 2 + 1;
        this.color = getRandomColor();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += GRAVITY;
        this.vx *= DRAG;
        this.vy *= DRAG;
        this.life -= 0.02;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1.0;
      }
    }

    class Shockwave {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.opacity = 0.6;
        this.color = getRandomColor();
      }

      update() {
        this.radius += 3;
        this.opacity -= 0.04;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    }

    let asteroids: Asteroid[] = [];
    let particles: Particle[] = [];
    let shockwaves: Shockwave[] = [];
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (Math.random() < 0.04) {
        asteroids.push(new Asteroid());
      }

      for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.update();
        a.draw(ctx);

        if (a.y >= height) {
          const debrisCount = Math.floor(Math.random() * 6) + 4;
          for (let j = 0; j < debrisCount; j++) {
            particles.push(new Particle(a.x, height));
          }
          shockwaves.push(new Shockwave(a.x, height));
          asteroids.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(i, 1);
      }

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const s = shockwaves[i];
        s.update();
        s.draw(ctx);
        if (s.opacity <= 0) shockwaves.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default AsteroidShower;