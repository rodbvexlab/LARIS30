import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Tracks the OS "reduce motion" setting.
 *
 * `<MotionConfig reducedMotion="user">` already neutralises transform-based
 * animations, but three things sit outside its reach and need this hook:
 * scroll-linked parallax (the values come from useTransform, not a variant),
 * ambient loops, and the confetti burst, which should not mount at all.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = () => setReduced(media.matches);

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
