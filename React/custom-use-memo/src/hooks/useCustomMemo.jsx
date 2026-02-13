import { useEffect, useRef } from "react"

function useCustomMemo(effect, deps) {
    // variable -> state / cached value
    const memoziedRef = useRef(null);

    // Change in deps
    function areEqual(prevDeps, nextDeps) {
        if (prevDeps === null) return false;
        if (prevDeps?.length !== nextDeps?.length) return false;

        for (let i = 0; i < prevDeps.length; i++) {
            if (prevDeps[i] !== nextDeps[i]) {
                return false;
            }
        }

        return true;
    }

    if (!memoziedRef.current || !areEqual(memoziedRef.current.deps, deps)) {
        memoziedRef.current = {
            value: effect(),
            deps
        }
    }

    // Cleanup logic
    useEffect(() => {
        return () => {
            memoziedRef.current = null;
        }
    }, [])

    // return memoized value
    return memoziedRef.current.value
}

export default useCustomMemo