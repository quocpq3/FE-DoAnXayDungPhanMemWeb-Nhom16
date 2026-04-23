import { useEffect, useRef } from "react";

export const useOnceEffect = (effect: () => void, deps?: any[]) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    effect();
  }, deps);
};