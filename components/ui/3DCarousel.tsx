'use client';

/**
 * 3D Carousel — lógica alineada a Sera UI (https://seraui.com/docs/3d-carousel).
 * Carrusel circular con perspectiva, rotación suave (framer-motion) y auto-rotate opcional.
 */

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type Carousel3DProps = {
  items: ReactNode[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  perspective?: number;
  className?: string;
  /** Radio del anillo 3D en px (translateZ). */
  radius?: number;
};

export function Carousel3D({
  items,
  autoRotate = true,
  rotationSpeed = 3000,
  perspective = 1000,
  className,
  radius = 340,
}: Carousel3DProps) {
  const count = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const angleStep = useMemo(() => (count > 0 ? 360 / count : 0), [count]);

  useEffect(() => {
    if (!autoRotate || count <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, rotationSpeed);
    return () => window.clearInterval(id);
  }, [autoRotate, rotationSpeed, count]);

  if (count === 0) return null;

  return (
    <div
      className={cn('relative mx-auto w-full max-w-5xl', className)}
      style={{ perspective: `${perspective}px` }}
    >
      <div className="relative h-[440px] w-full overflow-visible [touch-action:pan-y]">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: -activeIndex * angleStep }}
          transition={{ type: 'spring', stiffness: 95, damping: 20, mass: 0.8 }}
        >
          {items.map((node, i) => (
            <div
              key={i}
              className="pointer-events-auto absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-[260px] max-w-[72vw]">{node}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
