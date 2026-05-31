import React, { useMemo } from 'react'

function useVirtualScroll({ items, itemHeight, containerHeight, scrollTop, overscan = 5, }) {

    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight - overscan)
    )

    const visibleCount = Math.ceil((containerHeight / itemHeight) + overscan * 2);

    const endIndex = Math.min(
        items.length,
        startIndex + visibleCount
    );

    const visibleItems = useMemo(() => {
        return items?.slice(startIndex, endIndex);
    }, [startIndex, endIndex, items])

    console.log('visibleCount', visibleCount)
    console.log('startIndex', startIndex)
    console.log('endIndex', endIndex)
    console.log('scrollTop', scrollTop)
    console.log('containerHeight', containerHeight)
    console.log('itemHeight', itemHeight)

    return {
        startIndex,
        endIndex,
        visibleItems,
        totalHeight: items.length * itemHeight
    }
}

export default useVirtualScroll