'use client';

import { useEffect, useRef } from 'react';
import { Activity, BarChart3, TrendingUp, Zap } from 'lucide-react';

const DashboardBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create very subtle floating elements
    const createDashboardParticle = (index: number) => {
      const particle = document.createElement('div');
      particle.className = 'absolute opacity-3 dark:opacity-2 pointer-events-none z-1';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 30 + 's';
      particle.style.animationDuration = (40 + Math.random() * 30) + 's';
      particle.style.animation = 'float 50s ease-in-out infinite';
      
      container.appendChild(particle);
      return particle;
    };

    // Create minimal particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 4; i++) {
      particles.push(createDashboardParticle(i));
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
      {/* Extremely subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/8 via-transparent to-secondary-50/8 dark:from-primary-900/3 dark:via-transparent dark:to-secondary-900/3" />
      
      {/* Very minimal animated elements */}
      <div ref={containerRef} className="relative w-full h-full">
        {/* Dashboard-themed subtle elements */}
        <div className="absolute top-1/6 left-1/5 animate-float-slow opacity-3 dark:opacity-2 z-1">
          <Activity className="w-4 h-4 text-primary-500 transform rotate-12" />
        </div>
        
        <div className="absolute top-2/3 right-1/4 animate-float-medium opacity-2 dark:opacity-1 z-1">
          <BarChart3 className="w-4 h-4 text-secondary-500 transform -rotate-20" />
        </div>
        
        <div className="absolute bottom-1/4 left-1/3 animate-float-fast opacity-3 dark:opacity-2 z-1">
          <TrendingUp className="w-4 h-4 text-primary-600 transform rotate-30" />
        </div>
        
        <div className="absolute top-1/3 right-1/6 animate-float-slow opacity-2 dark:opacity-1 z-1">
          <Zap className="w-3 h-3 text-secondary-600 transform -rotate-15" />
        </div>

        {/* Minimal geometric elements */}
        <div className="absolute top-1/4 right-1/3 animate-spin-slow opacity-2 dark:opacity-1 z-1">
          <div className="w-6 h-6 border border-primary-300/20 dark:border-primary-700/10 rounded transform rotate-45" />
        </div>
        
        <div className="absolute bottom-1/3 left-1/8 animate-pulse-slow opacity-2 dark:opacity-1 z-1">
          <div className="w-4 h-4 bg-gradient-to-br from-secondary-200/20 to-secondary-300/20 dark:from-secondary-800/10 dark:to-secondary-900/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardBackground;
