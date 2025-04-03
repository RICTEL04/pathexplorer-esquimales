import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'shadow' | 'scale' | 'none';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  border?: boolean;
  bgColor?: string;
}

const Card = ({
  children,
  className = '',
  hoverEffect = 'shadow',
  rounded = 'md',
  shadow = 'md',
  border = true,
  bgColor = 'bg-white dark:bg-gray-800'
}: CardProps) => {
  // Mapeo de props a clases de Tailwind
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: ''
  };

  const hoverEffects = {
    shadow: 'hover:shadow-lg',
    scale: 'hover:scale-[1.02] transform transition-transform',
    none: ''
  };

  return (
    <div
      className={`
        ${bgColor}
        ${roundedClasses[rounded]}
        ${shadowClasses[shadow]}
        ${hoverEffects[hoverEffect]}
        ${border ? 'border border-gray-200 dark:border-gray-700' : ''}
        transition-all duration-200 ease-in-out
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;