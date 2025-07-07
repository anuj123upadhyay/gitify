'use client';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Loader({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = {
    sm: 'gitify-loader-sm',
    md: 'gitify-loader-md',
    lg: 'gitify-loader-lg',
    xl: 'gitify-loader-xl'
  };

  return (
    <div className={`gitify-loader ${sizeClasses[size]} ${className}`}></div>
  );
}

interface LoadingMessageProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fullPage?: boolean;
}

export function LoadingMessage({ 
  message = 'Loading...', 
  size = 'md',
  className = '',
  fullPage = false
}: LoadingMessageProps) {
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const containerClass = fullPage 
    ? 'fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-50'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={`${containerClass} space-y-4 ${className}`}>
      <Loader size={size} />
      <p className={`${textSizeClasses[size]} text-secondary-600 font-medium animate-pulse`}>
        {message}
      </p>
    </div>
  );
}
