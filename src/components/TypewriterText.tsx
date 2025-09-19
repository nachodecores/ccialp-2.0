'use client';

import { useState, useEffect } from 'react';

export default function TypewriterText() {
  const words = [
    'uniendo',
    'apoyando', 
    'impulsando',
    'escuchando',
    'articulando',
    'proyectando',
    'informando',
    'vinculando',
    'acompañando',
    'defendiendo',
    'promoviendo',
    'potenciando',
    'asociando',
    'construyendo',
    'reuniendo',
    'inspirando',
    'transformando'
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isWaiting) {
      const waitTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2000); // Espera 2 segundos antes de empezar a borrar
      
      return () => clearTimeout(waitTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Terminó de escribir, espera
          setIsWaiting(true);
        }
      } else {
        // Borrando
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Terminó de borrar, pasa a la siguiente palabra
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150); // Velocidad de borrado más rápida que escritura

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, currentWordIndex, words]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
