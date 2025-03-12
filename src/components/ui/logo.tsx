
import React from 'react';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

export function Logo({ className, size = 'md', iconOnly = false }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const logoIconClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={cn('flex items-center gap-2 font-semibold', sizeClasses[size], className)}>
      <BookOpen className={cn('text-primary', logoIconClasses[size])} />
      {!iconOnly && <span className="animate-fade-in">Campus Resource Hub</span>}
    </div>
  );
}
