'use client';
import { useState, forwardRef } from 'react';
import styles from './image.module.scss';

function Image(
  { src, alt, className, fallBack: customFallBack = null, ...props },
  ref
) {
  return (
    <img
      ref={ref}
      className={className}
      alt={alt}
      src={customFallBack || src}
      {...props}
    />
  );
}

export default forwardRef(Image);
