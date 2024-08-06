'use client';
import { forwardRef } from 'react';

interface IImage {
  src: string | undefined;
  alt: string;
  className: string;
  fallBack: string | undefined;
}

const Image = forwardRef<HTMLImageElement, IImage>(
  ({ src, alt, className, fallBack: customFallBack = null, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={className}
        alt={alt}
        src={src || customFallBack || ''}
        {...props}
      />
    );
  }
);
export default Image;
