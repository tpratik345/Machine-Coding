import React, { act, useEffect, useState } from 'react'
import { fetchQuotes } from '../services/apiService';
import useVirtualScroll from '../hooks/useVirtualScroll';

function VirtualScroll({ data, containerHeight, itemHeight, renderItem, overscan = 5 }) {
    const [scrollTop, setScrollTop] = useState(0);

    const { startIndex, visibleItems, totalHeight } = useVirtualScroll({
        items: data,
        itemHeight,
        containerHeight,
        scrollTop,
        overscan
    })

    const handleScroll = (e) => {
        // console.log(e.target.scrollTop)
        setScrollTop(e.target.scrollTop);
    };

    return (
        <div
            onScroll={handleScroll}
            style={{
                height: containerHeight,
                overflowY: 'auto',
                border: "1px solid #ddd",
                position: "relative",
            }}
        >
            <div 
                style={{
                    height: totalHeight,
                    position: 'relative'
                }}
            >
                {
                    visibleItems?.map((item, index) => {
                        const actualIndex = startIndex + index;

                        return (
                            <div
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    top: actualIndex * itemHeight,
                                    left: 0,
                                    right: 0,
                                    height: itemHeight
                                }}
                            >
                                {renderItem(item, actualIndex)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default VirtualScroll