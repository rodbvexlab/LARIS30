import React from 'react';
export interface CardProps {
  kicker?: string;
  title?: string;
  children?: React.ReactNode;
  tone?: 'white' | 'cream' | 'pink';
}
