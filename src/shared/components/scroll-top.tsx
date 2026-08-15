'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={cn(
        'fixed right-6 bottom-6 z-50 rounded-full p-3 shadow-lg transition-all duration-300',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90',
        'transform-gpu',
        isVisible ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0',
        'sm:bottom-8',
        'md:p-4',
        'lg:bottom-10'
      )}
    >
      <ArrowUp className="h-3 w-3 shadow-lg sm:h-3 sm:w-3 sm:shadow-lg" />
    </button>
  );
};
