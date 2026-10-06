import { useState } from 'react';

interface ZenImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill';
  style?: React.CSSProperties;
  onClick?: () => void;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

export function ZenImage({
  src,
  alt,
  className = '',
  aspectRatio,
  fallbackSrc = DEFAULT_FALLBACK,
  loading = 'lazy',
  objectFit = 'cover',
  style,
  onClick
}: ZenImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0f1f2e',
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style
  };

  const imageSrc = error ? fallbackSrc : src;

  return (
    <div
      className={`zen-image-container ${className} ${loaded ? 'is-loaded' : 'is-loading'}`}
      style={containerStyle}
      onClick={onClick}
    >
      {!loaded && (
        <div
          className="zen-image-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
            backgroundSize: '200% 100%',
            animation: 'zenShimmer 1.8s infinite linear',
            zIndex: 1
          }}
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) {
            setError(true);
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(1.03)',
          transition: 'opacity 0.4s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          zIndex: 2
        }}
      />
    </div>
  );
}
