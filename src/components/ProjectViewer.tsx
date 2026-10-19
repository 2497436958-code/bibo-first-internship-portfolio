import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from './ProjectGallery';

type ProjectViewerProps = {
  imageIndex: number;
  onClose: () => void;
  onNavigate: (step: -1 | 1) => void;
  project: Project;
};

export function ProjectViewer({
  imageIndex,
  onClose,
  onNavigate,
  project,
}: ProjectViewerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const titleId = `${project.id}-viewer-title`;
  const hasMultipleImages = project.images.length > 1;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft' && hasMultipleImages) {
        onNavigate(-1);
      }

      if (event.key === 'ArrowRight' && hasMultipleImages) {
        onNavigate(1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasMultipleImages, onClose, onNavigate]);

  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      aria-labelledby={titleId}
      aria-modal="true"
      className="project-viewer-backdrop"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
    >
      <div className="project-viewer">
        <header className="project-viewer__header">
          <div>
            <p className="project-viewer__eyebrow">PROJECT ARCHIVE</p>
            <h3 id={titleId}>{project.title} screenshots</h3>
          </div>
          <div className="project-viewer__meta" aria-live="polite">
            {String(imageIndex + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
          </div>
          <button
            aria-label="Close screenshot viewer"
            className="project-viewer__icon-button project-viewer__close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" size={22} strokeWidth={1.8} />
          </button>
        </header>

        <div className="project-viewer__stage">
          <button
            aria-label="Previous screenshot"
            className="project-viewer__icon-button project-viewer__nav project-viewer__nav--previous"
            disabled={!hasMultipleImages}
            onClick={() => onNavigate(-1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={30} strokeWidth={1.6} />
          </button>

          <div className="project-viewer__image-frame">
            <AnimatePresence initial mode="popLayout">
              <motion.img
                alt={`${project.title} screenshot ${imageIndex + 1}`}
                animate={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
                className="project-viewer__image"
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotateY: -24, scale: 0.76, y: -32 }
                }
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotateY: 74, scale: 0.62, y: 68 }
                }
                key={`${project.id}-${imageIndex}`}
                src={project.images[imageIndex]}
                transition={
                  reduceMotion
                    ? { duration: 0.12 }
                    : { type: 'spring', stiffness: 210, damping: 25, mass: 0.9 }
                }
              />
            </AnimatePresence>
          </div>

          <button
            aria-label="Next screenshot"
            className="project-viewer__icon-button project-viewer__nav project-viewer__nav--next"
            disabled={!hasMultipleImages}
            onClick={() => onNavigate(1)}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={30} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
