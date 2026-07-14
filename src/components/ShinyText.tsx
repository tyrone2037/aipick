"use client";

import { CSSProperties } from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
  spread?: number;
  direction?: 'left' | 'right';
  className?: string;
  style?: CSSProperties;
}

const ShinyText = ({
  text,
  color = '#ffffff',
  shineColor = '#a78bfa',
  speed = 3,
  delay = 1,
  spread = 120,
  direction = 'left',
  className = '',
  style,
}: ShinyTextProps) => {
  const duration = speed;
  const gap = delay;

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `shine-${direction === 'left' ? 'left' : 'right'} ${duration}s ease-in-out ${gap}s infinite`,
  };

  return (
    <span className={`shiny-text ${className}`} style={{ ...gradientStyle, ...style }}>
      {text}
    </span>
  );
};

export default ShinyText;