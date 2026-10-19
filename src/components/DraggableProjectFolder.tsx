import { motion, useReducedMotion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import type { Project } from './ProjectGallery';

type DraggableProjectFolderProps = {
  index: number;
  isOpen: boolean;
  onSelectImage: (imageIndex: number) => void;
  onToggle: () => void;
  project: Project;
};

const stackPositions = [
  { left: '3%', top: '12%', rotate: -8 },
  { left: '29%', top: '4%', rotate: 5 },
  { left: '57%', top: '15%', rotate: -4 },
  { left: '14%', top: '48%', rotate: 6 },
  { left: '50%', top: '53%', rotate: -7 },
];

export function DraggableProjectFolder({
  index,
  isOpen,
  onSelectImage,
  onToggle,
  project,
}: DraggableProjectFolderProps) {
  const dragged = useRef(false);
  const folderRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [hasDragConstraints, setHasDragConstraints] = useState(false);
  const reduceMotion = useReducedMotion();
  const position = stackPositions[index] ?? stackPositions[0];
  const paperImages = project.images.slice(0, 3);
  const imageCountLabel = `${String(project.images.length).padStart(2, '0')} screenshot${project.images.length === 1 ? '' : 's'}`;

  useLayoutEffect(() => {
    stackRef.current = folderRef.current?.parentElement as HTMLDivElement | null;
    setHasDragConstraints(Boolean(stackRef.current));
  }, []);

  return (
    <motion.div
      animate={
        reduceMotion
          ? { rotate: 0, scale: 1 }
          : { rotate: isOpen ? 0 : position.rotate, scale: isOpen ? 1.04 : 1 }
      }
      className="project-folder"
      drag={!reduceMotion}
      dragConstraints={!reduceMotion && hasDragConstraints ? stackRef : false}
      dragElastic={0.12}
      dragMomentum={!reduceMotion}
      initial={false}
      onDragEnd={() => {
        window.setTimeout(() => {
          dragged.current = false;
        }, 0);
      }}
      onDragStart={() => {
        dragged.current = true;
      }}
      ref={folderRef}
      style={{ left: position.left, top: position.top, zIndex: isOpen ? 10 : index + 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 260, damping: 24 }
      }
    >
      <div className={`folder ${isOpen ? 'open' : ''}`}>
        <div className="folder__back">
          {paperImages.map((image, imageIndex) => (
            <button
              aria-label={`View ${project.title} screenshot ${imageIndex + 1}`}
              className={`paper paper-${imageIndex + 1}`}
              key={image}
              onClick={() => isOpen && onSelectImage(imageIndex)}
              type="button"
            >
              <img alt="" src={image} />
              <span>{String(imageIndex + 1).padStart(2, '0')}</span>
            </button>
          ))}
          <button
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'Close' : 'Open'} ${project.title} folder`}
            className="folder__front project-folder__front"
            onClick={() => {
              if (!dragged.current) onToggle();
            }}
            type="button"
          >
            <span className="project-folder__tab" style={{ backgroundColor: project.colour }} />
            <span className="project-folder__label">{project.title}</span>
            <span className="project-folder__count">{imageCountLabel}</span>
            <span className="project-folder__description">{project.description}</span>
          </button>
          <div className="folder__front right" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}
