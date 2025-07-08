'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, XCircle, RefreshCw, Home } from 'lucide-react';

const ErrorBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create minimal floating particles
    const createErrorParticle = (index: number) => {
      const particle = document.createElement('div');
      particle.className = 'absolute opacity-5 dark:opacity-3 pointer-events-none z-1';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 25 + 's';
      particle.style.animationDuration = (35 + Math.random() * 25) + 's';
      particle.style.animation = 'float 45s ease-in-out infinite';
      
      container.appendChild(particle);
      return particle;
    };

    // Create particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 3; i++) {
      particles.push(createErrorParticle(i));
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
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/5 via-transparent to-gray-50/5 dark:from-red-900/3 dark:via-transparent dark:to-gray-900/3" />
      
      {/* Minimal animated elements */}
      <div ref={containerRef} className="relative w-full h-full">
        {/* Very subtle error-themed elements */}
        <div className="absolute top-1/4 left-1/5 animate-float-slow opacity-4 dark:opacity-2 z-1">
          <AlertTriangle className="w-4 h-4 text-red-400 transform rotate-12" />
        </div>
        
        <div className="absolute bottom-1/3 right-1/4 animate-float-medium opacity-3 dark:opacity-2 z-1">
          <RefreshCw className="w-3 h-3 text-gray-500 transform -rotate-20" />
        </div>
        
        <div className="absolute top-2/3 left-1/3 animate-float-fast opacity-4 dark:opacity-2 z-1">
          <Home className="w-4 h-4 text-primary-500 transform rotate-15" />
        </div>

        {/* Minimal geometric shapes */}
        <div className="absolute top-1/3 right-1/6 animate-pulse-slow opacity-2 dark:opacity-1 z-1">
          <div className="w-6 h-6 border border-gray-300/30 dark:border-gray-700/20 rounded transform rotate-45" />
        </div>
        
        <div className="absolute bottom-1/4 left-1/6 animate-spin-slow opacity-3 dark:opacity-2 z-1">
          <div className="w-4 h-4 bg-red-200/20 dark:bg-red-800/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ErrorBackground;
