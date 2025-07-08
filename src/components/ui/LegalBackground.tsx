'use client';

import { useEffect, useRef } from 'react';
import { FileText, Scale, Shield, Eye } from 'lucide-react';

const LegalBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create very subtle floating elements
    const createLegalParticle = (index: number) => {
      const particle = document.createElement('div');
      particle.className = 'absolute opacity-3 dark:opacity-2 pointer-events-none z-1';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 35 + 's';
      particle.style.animationDuration = (45 + Math.random() * 25) + 's';
      particle.style.animation = 'float 60s ease-in-out infinite';
      
      container.appendChild(particle);
      return particle;
    };

    // Create particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 3; i++) {
      particles.push(createLegalParticle(i));
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Very subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/8 via-transparent to-blue-50/8 dark:from-gray-900/4 dark:via-transparent dark:to-blue-900/4" />
      
      {/* Legal-themed subtle elements */}
      <div ref={containerRef} className="relative w-full h-full">
        <div className="absolute top-1/5 left-1/6 animate-float-slow opacity-4 dark:opacity-2 z-1">
          <FileText className="w-4 h-4 text-gray-500 transform rotate-12" />
        </div>
        
        <div className="absolute top-2/3 right-1/5 animate-float-medium opacity-3 dark:opacity-2 z-1">
          <Scale className="w-4 h-4 text-blue-500 transform -rotate-20" />
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 animate-float-fast opacity-4 dark:opacity-3 z-1">
          <Shield className="w-4 h-4 text-primary-500 transform rotate-30" />
        </div>
        
        <div className="absolute top-1/3 right-1/3 animate-float-slow opacity-3 dark:opacity-2 z-1">
          <Eye className="w-4 h-4 text-secondary-500 transform -rotate-15" />
        </div>

        {/* Minimal geometric elements */}
        <div className="absolute top-1/4 right-1/6 animate-spin-slow opacity-2 dark:opacity-1 z-1">
          <div className="w-6 h-6 border border-gray-300/30 dark:border-gray-700/20 rounded transform rotate-45" />
        </div>
        
        <div className="absolute bottom-1/3 left-1/8 animate-pulse-slow opacity-3 dark:opacity-2 z-1">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-200/20 to-blue-300/20 dark:from-blue-800/10 dark:to-blue-900/10 rounded-full" />
        </div>

        {/* Subtle connection lines */}
        <div className="absolute top-1/3 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-gray-300/20 to-transparent dark:via-gray-700/10 animate-pulse-slow transform rotate-45 z-1" />
        <div className="absolute bottom-1/2 right-1/4 w-12 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent dark:via-blue-700/10 animate-pulse-slow transform -rotate-30 z-1" />
      </div>
    </div>
  );
};

export default LegalBackground;
