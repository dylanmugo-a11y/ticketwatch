'use client';

import { motion } from 'framer-motion';
import FloatingParticles from './animations/FloatingParticles';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden noise-overlay">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-orange-50" />

      {/* Aurora gradient layers */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[600px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.3), transparent 70%)',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[700px] h-[500px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.3), transparent 70%)',
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-green-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-yellow-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow" />
      <div className="absolute bottom-[-10%] left-[20%] w-72 h-72 bg-orange-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slower" />

      {/* Morphing blob */}
      <motion.div
        className="absolute top-[40%] left-[45%] w-96 h-96 opacity-10"
        style={{
          background: 'linear-gradient(135deg, #22c55e, #eab308, #f97316)',
          filter: 'blur(60px)',
        }}
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '50% 60% 30% 60% / 30% 40% 70% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      <FloatingParticles count={15} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
