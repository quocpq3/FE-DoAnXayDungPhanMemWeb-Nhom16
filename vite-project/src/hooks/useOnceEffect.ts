import { useEffect, useRef } from "react";

// ngắn duplicate request
export function useOnceEffect(effect: () => void | (() => void), deps: any[] = []) {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;

        hasRun.current = true;
        return effect();
    }, deps);
}