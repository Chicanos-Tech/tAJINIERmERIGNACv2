
import { useEffect, useRef } from 'react';

export default function ConfettiEffect() {
  // Remove TypeScript generic – works in plain JavaScript/JSX environments
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Guard against missing 2D context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to fill the viewport
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const confetti = [];

    // Moroccan‑inspired palette
    const colors = [
      '#8B1538',
      '#A62639',
      '#1B4D3E',
      '#2D5F4F',
      '#C9A227',
      '#D4AF37',
      '#E8C547',
    ];

    // Create confetti pieces
    for (let i = 0; i < 120; i++) {
      const shapes = ['square', 'star', 'circle'];
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    let animationId;

    const drawStar = (ctx, size) => {
      const spikes = 4;
      const outerRadius = size / 2;
      const innerRadius = size / 4;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((piece) => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;

        if (piece.shape === 'square') {
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        } else if (piece.shape === 'star') {
          drawStar(ctx, piece.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Update position & rotation
        piece.y += piece.speedY;
        piece.x += piece.speedX;
        piece.rotation += piece.rotationSpeed;

        // Re‑spawn when out of view
        if (piece.y > canvas.height) {
          piece.y = -10;
          piece.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
