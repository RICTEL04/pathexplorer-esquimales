import { useState } from 'react';
import Meta from "@/lib/metas-empleados/metasDefinitions";
import MetaCard from './MetaCard';

export default function MetaCards({ metas, tituloTipo, onEdit, onDelete }: { metas: Meta[], tituloTipo: string, onEdit?: (meta: Meta) => void, onDelete?: (meta: Meta) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleDots = 5;

  const nextCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === metas.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? metas.length - 1 : prevIndex - 1
    );
  };

  const visibleMetas = metas.slice(currentIndex, currentIndex + 1);

  const renderDotIndicators = () => {
    if (metas.length <= maxVisibleDots) {
      return metas.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'}`}
          aria-label={`Ir a meta ${index + 1}`}
        />
      ));
    }

    const half = Math.floor(maxVisibleDots / 2);
    let start = currentIndex - half;
    let end = currentIndex + half;

    if (start < 0) {
      start = 0;
      end = maxVisibleDots - 1;
    } else if (end >= metas.length) {
      end = metas.length - 1;
      start = end - maxVisibleDots + 1;
    }

    const dots = [];
    
    if (start > 0) {
      dots.push(
        <button
          key={0}
          onClick={() => setCurrentIndex(0)}
          className={`w-2 h-2 rounded-full ${0 === currentIndex ? 'bg-purple-500' : 'bg-gray-300'}`}
          aria-label="Ir a meta 1"
        />
      );
      if (start > 1) {
        dots.push(<span key="start-ellipsis" className="px-1 text-xs">...</span>);
      }
    }

    for (let i = start; i <= end; i++) {
      dots.push(
        <button
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-purple-500' : 'bg-gray-300'}`}
          aria-label={`Ir a meta ${i + 1}`}
        />
      );
    }

    if (end < metas.length - 1) {
      if (end < metas.length - 2) {
        dots.push(<span key="end-ellipsis" className="px-1 text-xs">...</span>);
      }
      dots.push(
        <button
          key={metas.length - 1}
          onClick={() => setCurrentIndex(metas.length - 1)}
          className={`w-2 h-2 rounded-full ${metas.length - 1 === currentIndex ? 'bg-purple-500' : 'bg-gray-300'}`}
          aria-label={`Ir a meta ${metas.length}`}
        />
      );
    }

    return dots;
  };

  if (metas.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-48 flex flex-col items-center justify-center">
        <p className="text-gray-600 text-center px-4 text-sm">No hay metas de {tituloTipo.toLowerCase()}</p>
        <p className="text-xs text-gray-500 mt-2 text-center px-4">Crea una nueva meta para comenzar</p>
      </div>
    );
  }
  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden h-full">
        <div className="flex transition-transform duration-300 ease-in-out h-full">
          {visibleMetas.map((meta) => (
            <div key={meta.ID_meta} className="w-full flex-shrink-0 h-full">
              <MetaCard 
                meta={meta} 
                onEdit={onEdit ? () => onEdit(meta) : undefined} 
                onDelete={onDelete ? () => onDelete(meta) : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {metas.length > 1 && (
        <>
          <button 
            onClick={prevCard}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple/10 p-1 rounded-full shadow-md hover:bg-purple-300 z-10 border border-gray-200"
            aria-label="Meta anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextCard}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple/10 p-1 rounded-full shadow-md hover:bg-purple-300 z-10 border border-gray-200"
            aria-label="Meta siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {metas.length > 1 && (
        <div className="flex justify-center mt-1 space-x-1 items-center">
          {renderDotIndicators()}
        </div>
      )}
    </div>
  );
}