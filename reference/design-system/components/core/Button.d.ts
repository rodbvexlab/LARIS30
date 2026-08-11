import React from 'react';
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. primary = coral fill, secondary = ink fill, ghost = outline only. */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onClick?: () => void;
}
