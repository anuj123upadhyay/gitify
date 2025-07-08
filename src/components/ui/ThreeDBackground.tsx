'use client';

import { useEffect, useRef, useState } from 'react';
import { GitBranch, GitCommit, GitPullRequest, Star, Code, Users, Database, Zap } from 'lucide-react';

const ThreeDBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mouseTrail, setMouseTrail] = useState<Array<{x: number, y: number, id: number}>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse tracking for light trail effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const newPosition = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      setMousePosition(newPosition);
      setIsMouseMoving(true);
      
      // Add to trail with smoother intervals
      setMouseTrail(prev => {
        const timeSinceLastPoint = prev.length > 0 ? Date.now() - prev[0].id : 100;
        if (timeSinceLastPoint > 50) { // Only add point every 50ms for smoother trail
          const newTrail = [
            { x: newPosition.x, y: newPosition.y, id: Date.now() },
            ...prev.slice(0, 5) // Keep only last 5 positions for elegance
          ];
          return newTrail;
        }
        return prev;
      });
      
      // Clear existing timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      
      // Set timeout to hide trail after mouse stops
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
        // Gradually fade out trail
        setTimeout(() => setMouseTrail([]), 800);
      }, 1200);
    };

    const handleMouseLeave = () => {
      setIsMouseMoving(false);
      // Fade out trail gradually when leaving
      setTimeout(() => setMouseTrail([]), 600);
    };

    const handleMouseEnter = () => {
      setIsMouseMoving(true);
    };

    // Add mouse event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    // Create floating code snippets
    const codeSnippets = ['{ }', '< />', '[ ]', '( )', '=> {', 'git', 'npm', 'yarn'];
    const createCodeParticle = (index: number) => {
      const particle = document.createElement('div');
      particle.className = 'absolute opacity-20 dark:opacity-12 pointer-events-none text-sm font-mono text-primary-500 dark:text-primary-400 z-5';
      particle.textContent = codeSnippets[index % codeSnippets.length];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (20 + Math.random() * 15) + 's';
      particle.style.animation = 'float 25s ease-in-out infinite';
      
      container.appendChild(particle);
      return particle;
    };

    // Create network particles
    const createNetworkNode = (index: number) => {
      const node = document.createElement('div');
      node.className = 'absolute w-2 h-2 bg-secondary-500 dark:bg-secondary-400 rounded-full opacity-30 dark:opacity-20 pointer-events-none z-5';
      node.style.left = Math.random() * 100 + '%';
      node.style.top = Math.random() * 100 + '%';
      node.style.animationDelay = Math.random() * 10 + 's';
      node.style.animation = 'pulse 8s ease-in-out infinite';
      
      container.appendChild(node);
      return node;
    };

    // Create particles
    const codeParticles: HTMLDivElement[] = [];
    const networkNodes: HTMLDivElement[] = [];
    
    // Balanced number of elements
    for (let i = 0; i < 8; i++) {
      codeParticles.push(createCodeParticle(i));
    }
    
    for (let i = 0; i < 12; i++) {
      networkNodes.push(createNetworkNode(i));
    }

    return () => {
      // Clean up event listeners
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
      
      // Clean up timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      
      // Clean up particles
      [...codeParticles, ...networkNodes].forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-0 elegant-background"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Mouse light trail effect - Elegant and refined */}
      <div
        className="absolute pointer-events-none transition-all duration-300 ease-out mouse-follower z-15"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          opacity: isMouseMoving ? 0.8 : 0.3,
        }}
      >
        {/* Soft outer glow */}
        <div className="absolute w-32 h-32 bg-gradient-radial from-primary-400/20 via-primary-300/10 to-transparent dark:from-primary-500/15 dark:via-primary-400/8 dark:to-transparent rounded-full blur-2xl" />
        
        {/* Main elegant glow */}
        <div className="absolute w-20 h-20 bg-gradient-radial from-secondary-400/35 via-secondary-300/18 to-transparent dark:from-secondary-500/25 dark:via-secondary-400/12 dark:to-transparent rounded-full blur-xl animate-pulse-slow" />
        
        {/* Core light - subtle */}
        <div className="absolute w-8 h-8 bg-gradient-radial from-white/40 via-primary-200/25 to-transparent dark:from-white/30 dark:via-primary-300/20 dark:to-transparent rounded-full blur-md" />
        
        {/* Elegant sparkles - minimal */}
        <div className="absolute w-1.5 h-1.5 bg-primary-400/70 dark:bg-primary-300/60 rounded-full animate-ping" style={{ top: '-6px', left: '4px', animationDuration: '2s' }} />
        <div className="absolute w-1 h-1 bg-secondary-400/60 dark:bg-secondary-300/50 rounded-full animate-ping" style={{ top: '6px', left: '-5px', animationDelay: '0.7s', animationDuration: '2.5s' }} />
        <div className="absolute w-1 h-1 bg-primary-300/50 dark:bg-primary-400/40 rounded-full animate-ping" style={{ top: '7px', left: '8px', animationDelay: '1.4s', animationDuration: '3s' }} />
      </div>

      {/* Elegant mouse trail points */}
      {mouseTrail.map((point, index) => (
        <div
          key={point.id}
          className="absolute pointer-events-none z-10 transition-all duration-500 ease-out"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: (1 - index * 0.2) * 0.4,
          }}
        >
          <div 
            className="w-3 h-3 bg-gradient-radial from-white/30 via-primary-300/20 to-transparent dark:from-white/25 dark:via-primary-400/15 dark:to-transparent rounded-full blur-sm"
            style={{
              animationDelay: `${index * 0.1}s`,
              transform: `scale(${1 - index * 0.15})`,
            }}
          />
        </div>
      ))}

      {/* Enhanced gradient overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white/10 to-secondary-50/30 dark:from-primary-900/20 dark:via-black/10 dark:to-secondary-900/20" />
      
      {/* Animated background container */}
      <div ref={containerRef} className="relative w-full h-full">
        
        {/* 1. Floating GitHub Elements - More visible */}
        <div className="absolute top-1/6 left-1/5 animate-float-slow opacity-25 dark:opacity-15 z-5">
          <GitCommit className="w-8 h-8 text-primary-500 transform rotate-12" />
        </div>
        
        <div className="absolute top-1/4 right-1/4 animate-float-medium opacity-20 dark:opacity-12 z-5">
          <GitBranch className="w-7 h-7 text-secondary-500 transform -rotate-30" />
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 animate-float-fast opacity-22 dark:opacity-14 z-5">
          <GitPullRequest className="w-9 h-9 text-primary-600 transform rotate-45" />
        </div>
        
        <div className="absolute top-2/3 right-1/6 animate-float-slow opacity-18 dark:opacity-10 z-5">
          <Star className="w-6 h-6 text-secondary-600 transform rotate-90" />
        </div>
        
        <div className="absolute bottom-1/6 right-1/3 animate-float-medium opacity-20 dark:opacity-12 z-5">
          <Code className="w-8 h-8 text-primary-400 transform -rotate-15" />
        </div>
        
        <div className="absolute top-1/3 left-1/6 animate-float-fast opacity-18 dark:opacity-11 z-5">
          <Users className="w-7 h-7 text-secondary-400 transform rotate-60" />
        </div>

        {/* 2. Geometric Shapes - More visible */}
        <div className="absolute top-1/5 right-1/5 animate-spin-slow opacity-15 dark:opacity-8 z-5">
          <div className="w-16 h-16 border-2 border-primary-400 dark:border-primary-600 rounded-lg transform rotate-45" />
        </div>
        
        <div className="absolute bottom-1/4 left-1/8 animate-spin-reverse opacity-12 dark:opacity-7 z-5">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-300/60 to-secondary-400/60 dark:from-secondary-700/40 dark:to-secondary-800/40 rounded-full" />
        </div>
        
        <div className="absolute top-1/2 right-1/8 animate-pulse-slow opacity-14 dark:opacity-9 z-5">
          <div className="w-14 h-14 border-2 border-dashed border-primary-500/70 dark:border-primary-600/50 rounded-lg transform rotate-12" />
        </div>

        {/* 3. Orbital Animation - More visible */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
          {/* Main orbit */}
          <div className="animate-spin-slow opacity-12 dark:opacity-6">
            <div className="w-80 h-80 border border-primary-300/70 dark:border-primary-800/50 rounded-full relative">
              {/* Orbiting repositories */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="animate-orbit-slow">
                  <Database className="w-5 h-5 text-primary-600 opacity-80" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary orbit */}
          <div className="animate-spin-reverse opacity-10 dark:opacity-5">
            <div className="w-60 h-60 border border-secondary-300/70 dark:border-secondary-800/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
              <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2">
                <div className="animate-orbit-slow">
                  <Zap className="w-4 h-4 text-secondary-600 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Data flow lines - More visible */}
        <div className="absolute top-1/4 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent dark:via-primary-600/30 animate-pulse-slow transform rotate-45 z-5" />
        <div className="absolute bottom-1/3 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-secondary-400/50 to-transparent dark:via-secondary-600/30 animate-pulse-slow transform -rotate-45 z-5" />
        <div className="absolute top-1/2 left-1/3 w-28 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent dark:via-primary-600/30 animate-pulse-slow transform rotate-90 z-5" />
      </div>
      
      {/* 5. Particle Network - More visible */}
      <div className="absolute inset-0 opacity-25 dark:opacity-15 z-5">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2732F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2D8CA8" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Network connections - More visible */}
          <line x1="15%" y1="25%" x2="85%" y2="75%" stroke="url(#connectionGradient)" strokeWidth="1" className="animate-dash" />
          <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="url(#connectionGradient)" strokeWidth="1" className="animate-dash-reverse" />
          <line x1="30%" y1="15%" x2="70%" y2="85%" stroke="url(#connectionGradient)" strokeWidth="1" className="animate-dash-slow" />
        </svg>
      </div>
    </div>
  );
};

export default ThreeDBackground;
