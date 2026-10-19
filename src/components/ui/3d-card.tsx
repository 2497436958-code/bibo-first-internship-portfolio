import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ElementType, MouseEvent, ReactNode } from 'react';

const MouseEnterContext = createContext(false);

export function CardContainer({ children, className = '' }: { children?: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) / 25;
    const y = (event.clientY - bounds.top - bounds.height / 2) / 25;
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  return <MouseEnterContext.Provider value={entered}>
    <div className="three-d-card-container">
      <div ref={ref} className={`three-d-card-tilt ${className}`} onMouseEnter={() => setEntered(true)} onMouseMove={onMove} onMouseLeave={() => { setEntered(false); if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg)'; }}>
        {children}
      </div>
    </div>
  </MouseEnterContext.Provider>;
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`three-d-card-body ${className}`}>{children}</div>;
}

export function CardItem({ as: Tag = 'div', children, className = '', translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...rest }: { as?: ElementType; children?: ReactNode; className?: string; translateX?: number | string; translateY?: number | string; translateZ?: number | string; rotateX?: number | string; rotateY?: number | string; rotateZ?: number | string; [key: string]: unknown }) {
  const ref = useRef<HTMLElement>(null);
  const entered = useContext(MouseEnterContext);
  useEffect(() => {
    if (ref.current) ref.current.style.transform = entered ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)` : 'translateZ(0)';
  }, [entered, rotateX, rotateY, rotateZ, translateX, translateY, translateZ]);
  return <Tag ref={ref} className={`three-d-card-item ${className}`} {...rest}>{children}</Tag>;
}
