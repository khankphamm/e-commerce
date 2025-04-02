
import React, { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'zoom-out' 
  | 'slide-up' 
  | 'slide-down'
  | 'none';

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: React.ElementType;
}

export const AnimateInView = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
  as: Component = 'div',
}: AnimateInViewProps) => {
  const [ref, isInView] = useInView({ threshold, triggerOnce: once });

  // Animation classes
  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-down': 'opacity-0 -translate-y-8',
    'fade-left': 'opacity-0 translate-x-8',
    'fade-right': 'opacity-0 -translate-x-8',
    'zoom-in': 'opacity-0 scale-95',
    'zoom-out': 'opacity-0 scale-105',
    'slide-up': 'translate-y-16',
    'slide-down': 'translate-y-4',
    'none': '',
  };

  const style = {
    transitionProperty: 'transform, opacity',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <Component
      ref={ref}
      className={cn(
        'transition-all',
        animation !== 'none' && !isInView && animationClasses[animation],
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
};

export default AnimateInView;
