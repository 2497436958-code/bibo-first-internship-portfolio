import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AnimatedText({ text }: { text: string }) {
  const target = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start 0.8', 'end 0.2'] });

  return (
    <p className="about-copy" ref={target}>
      {text.split('').map((letter, index) => <Character key={`${letter}-${index}`} value={letter} progress={scrollYProgress} index={index} total={text.length} />)}
    </p>
  );
}

function Character({ value, progress, index, total }: { value: string; progress: ReturnType<typeof useScroll>['scrollYProgress']; index: number; total: number }) {
  const opacity = useTransform(progress, [Math.max(0, index / total - 0.18), Math.min(1, index / total + 0.32)], [0.2, 1]);
  return <motion.span style={{ opacity }}>{value}</motion.span>;
}
