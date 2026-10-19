import { type PropsWithChildren, useRef, useState } from 'react';

export function Magnet({ children, className }: PropsWithChildren<{ className?: string }>) {
  const element = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');

  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = element.current?.getBoundingClientRect();
    if (!bounds) return;
    const distance = 150;
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    if (Math.abs(x) < bounds.width / 2 + distance && Math.abs(y) < bounds.height / 2 + distance) {
      setTransform(`translate3d(${x / 3}px, ${y / 3}px, 0)`);
    }
  };

  return (
    <div
      ref={element}
      className={className}
      onMouseMove={move}
      onMouseLeave={() => setTransform('translate3d(0, 0, 0)')}
      style={{ transform, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
