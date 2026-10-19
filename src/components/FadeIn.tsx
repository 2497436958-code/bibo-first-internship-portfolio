import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type FadeInProps = PropsWithChildren<{
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}>;

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className }: FadeInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
