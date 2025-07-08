'use client';

import { useEffect, useRef } from 'react';
import { Key, Shield, Lock, UserCheck } from 'lucide-react';

const AuthBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating security icons
    const securityIcons = [Shield, Lock, Key, UserCheck];
    const createSecurityParticle = (index: number) => {
      const particle = document.createElement('div');
      particle.className = 'absolute opacity-8 dark:opacity-5 pointer-events-none z-1';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (30 + Math.random() * 20) + 's';
      particle.style.animation = 'float 40s ease-in-out infinite';
      
      const rotation = Math.random() * 360;
      particle.style.transform = `rotate(${rotation}deg)`;
      
      container.appendChild(particle);
      return particle;
    };

    // Create particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 4; i++) {
      particles.push(createSecurityParticle(i));
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
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/10 via-transparent to-secondary-50/10 dark:from-primary-900/5 dark:via-transparent dark:to-secondary-900/5" />
      
      {/* Animated container */}
      <div ref={containerRef} className="relative w-full h-full">
        {/* Security-themed floating elements */}
        <div className="absolute top-1/5 left-1/6 animate-float-slow opacity-6 dark:opacity-3 z-1">
          <Shield className="w-5 h-5 text-primary-500 transform rotate-12" />
        </div>
        
        <div className="absolute top-2/3 right-1/5 animate-float-medium opacity-5 dark:opacity-3 z-1">
          <Lock className="w-4 h-4 text-secondary-500 transform -rotate-20" />
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 animate-float-fast opacity-7 dark:opacity-4 z-1">
          <Key className="w-5 h-5 text-primary-600 transform rotate-30" />
        </div>
        
        <div className="absolute top-1/3 right-1/3 animate-float-slow opacity-4 dark:opacity-2 z-1">
          <UserCheck className="w-6 h-6 text-secondary-600 transform -rotate-15" />
        </div>

        {/* Subtle geometric elements */}
        <div className="absolute top-1/4 right-1/6 animate-spin-slow opacity-3 dark:opacity-2 z-1">
          <div className="w-8 h-8 border border-primary-300/50 dark:border-primary-700/30 rounded-lg transform rotate-45" />
        </div>
        
        <div className="absolute bottom-1/3 left-1/8 animate-pulse-slow opacity-4 dark:opacity-2 z-1">
          <div className="w-6 h-6 bg-gradient-to-br from-secondary-200/30 to-secondary-300/30 dark:from-secondary-800/20 dark:to-secondary-900/20 rounded-full" />
        </div>

        {/* Minimal connection lines */}
        <div className="absolute top-1/3 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-primary-300/20 to-transparent dark:via-primary-700/10 animate-pulse-slow transform rotate-45 z-1" />
        <div className="absolute bottom-1/2 right-1/4 w-12 h-px bg-gradient-to-r from-transparent via-secondary-300/20 to-transparent dark:via-secondary-700/10 animate-pulse-slow transform -rotate-30 z-1" />
      </div>
    </div>
  );
};

export default AuthBackground;
