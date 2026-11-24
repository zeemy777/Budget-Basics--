import { useEffect, useRef, useState } from 'react';

export function useCountUp(target, duration = 650) {
  const end = Number(target) || 0;
  const [value, setValue] = useState(end);
  const valueRef = useRef(end);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const from = valueRef.current;
    const to = Number(target) || 0;
    if (from === to) return undefined;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      const frame = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(frame);
    }

    const startedAt = performance.now();
    let frame = 0;

    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
