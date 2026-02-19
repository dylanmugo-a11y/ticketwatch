'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'dark';
  tilt?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  tilt = true,
  glow = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base = 'rounded-2xl shadow-xl';
  const variants = {
    default: 'glass',
    strong: 'glass-strong',
    dark: 'glass-dark',
  };

  return (
    <motion.div
      ref={ref}
      className={`${base} ${variants[variant]} ${glow ? 'glow-border' : ''} relative overflow-hidden group ${className}`}
      style={tilt ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer-overlay rounded-2xl" />

      <div style={tilt ? { transform: 'translateZ(20px)' } : undefined}>
        {children}
      </div>
    </motion.div>
  );
}
