import React, { useRef } from 'react'

function useCustomEffect(callBack, deps) {

    const isFirstRender = useRef(true);
    const prevDeps = useRef([]);

    // First Render
    if (isFirstRender.current) {
        isFirstRender.current = false;
        const cleanup = callBack();

        return () => {
            if (cleanup && typeof cleanup === 'function') {
                cleanup();
            }
        };
    }

    // Dependency change
    const depsChanges = deps
        ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
        : true;

    if (depsChanges) {
        // Cleanups
        const cleanup = callBack();
        if (cleanup && typeof cleanup === 'function' && deps) {
            cleanup();
        }
    }

    prevDeps.current = deps || [];
}

export default useCustomEffect