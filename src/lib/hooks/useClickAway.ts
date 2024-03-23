import { useEffect, useLayoutEffect, useRef } from 'react';

type ClickAwayCallback<T extends any> = (e: T) => void;

export function useClickAway<T extends any>(cb: ClickAwayCallback<T>) {
  const ref = useRef<any>(null);
  const refCb = useRef(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    const handler = (e: any) => {
      const element = ref.current;

      if (element && !element.contains(e.target)) {
        refCb.current(e);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return ref;
}
