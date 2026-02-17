
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Lighten a hex colour by a given percentage.
 * @param {string} color - Hex colour (e.g. "#ff0000").
 * @param {number} percent - Amount to lighten (0‑100).
 * @returns {string} Lightened hex colour.
 */
function lightenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  const toHex = (c) => {
    const hex = Math.max(0, Math.min(255, c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
}

/**
 * WheelCanvas component – renders a spin‑wheel on a canvas.
 *
 * @param {Object} props
 * @param {Array<{label:string, probability:number, color:string}>} props.prizes
 * @param {function(string):void} props.onSpinComplete
 * @param {boolean} props.isSpinning
 * @param {function(boolean):void} props.setIsSpinning
 */
export default function WheelCanvas({
  prizes,
  onSpinComplete,
  isSpinning,
  setIsSpinning,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rotationRef = useRef(0);
  const animationRef = useRef();
  const [canvasSize, setCanvasSize] = useState(280);

  // -------------------------------------------------------------------------
  // Resize handling – keep the wheel fitting inside its container
  // -------------------------------------------------------------------------
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newSize = Math.min(containerWidth - 20, 280);
        setCanvasSize(newSize);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // -------------------------------------------------------------------------
  // Canvas drawing logic
  // -------------------------------------------------------------------------
  const drawWheel = (ctx, rotation) => {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 12;
    const fontSize = canvasSize < 260 ? 9 : 10;
    const anglePerSegment = (2 * Math.PI) / prizes.length;

    ctx.clearRect(0, 0, width, height);

    // ---- Wheel shadow ----
    ctx.save();
    ctx.shadowColor = 'rgba(139, 21, 56, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFCF8';
    ctx.fill();
    ctx.restore();

    // ---- Outer gold border ----
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.strokeStyle = '#C9A227';
    ctx.lineWidth = 3;
    ctx.stroke();

    // ---- Segments ----
    prizes.forEach((prize, index) => {
      const startAngle = rotation + index * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;

      // Segment shape
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, lightenColor(prize.color, 20));
      gradient.addColorStop(1, prize.color);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Segment border
      ctx.strokeStyle = '#C9A227';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 4;
      ctx.fillText(prize.label, radius * 0.62, 4);
      ctx.restore();
    });

    // ---- Central decorative circle ----
    const centerRadius = 22;

    // Outer gold ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#C9A227';
    ctx.fill();

    // Main centre
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    const centerGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      centerRadius
    );
    centerGradient.addColorStop(0, '#FFFCF8');
    centerGradient.addColorStop(1, '#F5EDE3');
    ctx.fillStyle = centerGradient;
    ctx.fill();

    // Star pattern
    ctx.save();
    ctx.translate(centerX, centerY);
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(0, -centerRadius + 8);
      ctx.lineTo(3, -centerRadius + 14);
      ctx.lineTo(-3, -centerRadius + 14);
      ctx.closePath();
      ctx.fillStyle = '#8B1538';
      ctx.fill();
    }
    ctx.restore();

    // Central dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#8B1538';
    ctx.fill();

    // ---- Indicator arrow (Maroccan style) ----
    ctx.save();
    ctx.translate(centerX, 8);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(-14, -14);
    ctx.lineTo(0, -8);
    ctx.lineTo(14, -14);
    ctx.closePath();
    ctx.fillStyle = '#8B1538';
    ctx.fill();
    ctx.strokeStyle = '#C9A227';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  };

  // -------------------------------------------------------------------------
  // Initial draw & cleanup
  // -------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawWheel(ctx, rotationRef.current);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prizes, canvasSize]);

  // -------------------------------------------------------------------------
  // Spin animation
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!isSpinning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ---- Choose prize based on probability ----
    const random = Math.random();
    let cumulative = 0;
    let selectedIndex = 0;

    for (let i = 0; i < prizes.length; i++) {
      cumulative += prizes[i].probability;
      if (random <= cumulative) {
        selectedIndex = i;
        break;
      }
    }

    const anglePerSegment = (2 * Math.PI) / prizes.length;
    const targetAngle = selectedIndex * anglePerSegment + anglePerSegment / 2;
    const topPosition = -Math.PI / 2; // Arrow points upward
    const spins = 6;
    const finalRotation = topPosition - targetAngle;
    const totalRotation = spins * 2 * Math.PI + finalRotation - rotationRef.current;

    const duration = 5500; // ms
    const startTime = performance.now();
    const startRotation = rotationRef.current;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut quartic
      const eased = 1 - Math.pow(1 - progress, 4);

      rotationRef.current = startRotation + totalRotation * eased;
      drawWheel(ctx, rotationRef.current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        onSpinComplete(prizes[selectedIndex].label);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, prizes, onSpinComplete, setIsSpinning, canvasSize]);

  return (
    <div ref={containerRef} className="flex justify-center items-center py-2 w-full">
      <div className="relative">
        {/* Decorative animated border */}
        <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#C9A227]/30 animate-[spin_20s_linear_infinite]"></div>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="relative z-10"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PropTypes – provide runtime validation and clearer documentation
// ---------------------------------------------------------------------------
WheelCanvas.propTypes = {
  prizes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      probability: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSpinComplete: PropTypes.func.isRequired,
  isSpinning: PropTypes.bool.isRequired,
  setIsSpinning: PropTypes.func.isRequired,
};
