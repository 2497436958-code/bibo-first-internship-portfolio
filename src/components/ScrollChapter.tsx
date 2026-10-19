import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import './ScrollChapter.css';

type ScrollChapterIntensity = 'subtle' | 'standard' | 'dramatic';

type ScrollChapterProps = PropsWithChildren<{
  id: string;
  className?: string;
  intensity?: ScrollChapterIntensity;
}>;

const exitEffects: Record<ScrollChapterIntensity, { scale: number; travel: number }> = {
  subtle: { scale: 0.99, travel: -16 },
  standard: { scale: 0.97, travel: -28 },
  dramatic: { scale: 0.95, travel: -44 },
};

export function ScrollChapter({ children, className, id, intensity = 'standard' }: ScrollChapterProps) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: chapterRef, offset: ['start start', 'end end'] });
  const effect = exitEffects[intensity];
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.64]);
  const y = useTransform(scrollYProgress, [0, 1], [0, effect.travel]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, effect.scale]);

  return (
    <div
      className={`scroll-chapter scroll-chapter--${intensity}${reduceMotion ? ' scroll-chapter--reduced-motion' : ''}${className ? ` ${className}` : ''}`}
      data-testid={`scroll-chapter-${id}`}
      ref={chapterRef}
    >
      <motion.div className="scroll-chapter__surface" style={reduceMotion ? undefined : { opacity, scale, y }}>
        {children}
      </motion.div>
    </div>
  );
}
