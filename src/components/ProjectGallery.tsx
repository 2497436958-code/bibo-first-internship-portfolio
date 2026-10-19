import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { DraggableProjectFolder } from './DraggableProjectFolder';
import { ProjectViewer } from './ProjectViewer';
import './ProjectGallery.css';

export type Project = {
  id: string;
  title: string;
  description: string;
  colour: string;
  images: string[];
};

export const projects: Project[] = [
  {
    id: 'mes',
    title: 'MES Agent',
    description: 'Manufacturing execution workspace',
    colour: '#bb4b5b',
    images: [
      'image01_4ed058c2.png',
      'image02_890a5a23.png',
      'image03_097e0e20.png',
      'image04_10566486.png',
      'image05_12ea2fd6.png',
      'image06_fef00ca5.png',
      'image07_9d286365.png',
    ].map((name) => `/projects/mes/${name}`),
  },
  {
    id: 'pfmea',
    title: 'PFMEA',
    description: 'Process risk analysis agent',
    colour: '#c68a3f',
    images: ['/projects/pfmea/截屏2026-08-06 12.37.51.png'],
  },
  {
    id: 'meeting',
    title: 'Meeting Agent',
    description: 'Meeting intelligence workspace',
    colour: '#547ac7',
    images: [
      '截屏2026-08-06 11.05.38.png',
      '截屏2026-08-06 11.05.48.png',
      '截屏2026-08-06 11.06.37.png',
      '截屏2026-08-06 11.11.18.png',
    ].map((name) => `/projects/meeting/${name}`),
  },
  {
    id: 'inspection',
    title: 'Equipment Inspection',
    description: 'Equipment inspection agent',
    colour: '#519579',
    images: [
      '截屏2026-08-06 11.41.01.png',
      '截屏2026-08-06 11.41.08.png',
    ].map((name) => `/projects/inspection/${name}`),
  },
  {
    id: 'high-tech',
    title: 'High-Tech Enterprise',
    description: 'High-tech application agent',
    colour: '#8c69ad',
    images: [
      '截屏2026-08-06 12.36.00.png',
      '截屏2026-08-06 12.36.10.png',
      '截屏2026-08-06 12.36.19.png',
      '截屏2026-08-06 12.36.23.png',
      '截屏2026-08-06 12.36.30.png',
      'high-tech-application-workflow.png',
    ].map((name) => `/projects/high-tech/${name}`),
  },
];

export type ProjectOpenRequest = { projectId: string; nonce: number };

export function ProjectGallery({ openRequest }: { openRequest?: ProjectOpenRequest | null }) {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;

  useEffect(() => {
    if (!openRequest) return;
    const project = projects.find((item) => item.id === openRequest.projectId);
    if (!project) return;
    setOpenProjectId(project.id);
    setSelectedProjectId(project.id);
    setSelectedImageIndex(0);
  }, [openRequest]);

  const toggleFolder = (id: string) => {
    setOpenProjectId((current) => (current === id ? null : id));
  };

  const closeViewer = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const navigateViewer = useCallback((step: -1 | 1) => {
    if (!selectedProject) return;

    setSelectedImageIndex(
      (current) => (current + step + selectedProject.images.length) % selectedProject.images.length,
    );
  }, [selectedProject]);

  const selectImage = useCallback((projectId: string, imageIndex: number) => {
    setSelectedProjectId(projectId);
    setSelectedImageIndex(imageIndex);
  }, []);

  return (
    <div className="folder-stack" aria-label="Agent project folders">
      {projects.map((project, index) => (
        <DraggableProjectFolder
          index={index}
          isOpen={openProjectId === project.id}
          key={project.id}
          onSelectImage={(imageIndex) => selectImage(project.id, imageIndex)}
          onToggle={() => toggleFolder(project.id)}
          project={project}
        />
      ))}
      <AnimatePresence>
        {selectedProject && (
          <ProjectViewer
            imageIndex={selectedImageIndex}
            key={selectedProject.id}
            onClose={closeViewer}
            onNavigate={navigateViewer}
            project={selectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
