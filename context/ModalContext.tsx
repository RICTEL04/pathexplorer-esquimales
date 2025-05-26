// context/ExperienceModalContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

// types/experience.ts
export interface SkillWithLevel {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string | null;
  currentJob: boolean;
  description: string;
  skills: SkillWithLevel[];
}

// Tipo para formularios (sin id o con id opcional)
export type ExperienceFormData = Omit<Experience, 'id'> & {
  id?: string;
};

type ModalMode = 'view' | 'create' | 'edit';

type ExperienceModalContextType = {
  isOpen: boolean;
  mode: ModalMode;
  experienceData: Experience | ExperienceFormData;
  openModal: (mode: ModalMode, initialData?: Experience | ExperienceFormData) => void;
  closeModal: () => void;
  resetModal: () => void;
  setExperienceData: React.Dispatch<React.SetStateAction<Experience | ExperienceFormData>>;
};

const defaultExperience: ExperienceFormData = {
  position: '',
  company: '',
  startDate: '',
  endDate: null,
  currentJob: false,
  description: '',
  skills: [],
};

const ExperienceModalContext = createContext<ExperienceModalContextType | null>(null);

export function ExperienceModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>('create');
  const [experienceData, setExperienceData] = useState<Experience | ExperienceFormData>(defaultExperience);

  const openModal = (mode: ModalMode, initialData?: Experience | ExperienceFormData) => {
    setMode(mode);
    setExperienceData(initialData || defaultExperience);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetModal = () => {
    setExperienceData(defaultExperience);
    setMode('create');
  };

  return (
    <ExperienceModalContext.Provider
      value={{
        isOpen,
        mode,
        experienceData,
        openModal,
        closeModal,
        resetModal,
        setExperienceData,
      }}
    >
      {children}
    </ExperienceModalContext.Provider>
  );
}

export function useExperienceModal() {
  const context = useContext(ExperienceModalContext);
  if (!context) {
    throw new Error('useExperienceModal must be used within a ExperienceModalProvider');
  }
  return context;
}