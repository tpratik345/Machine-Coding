import React, { useEffect, useMemo, useState } from 'react'
import useCustomMemo from '../hooks/useCustomMemo';
// import useCustomMemo from '../hooks/useCustomMemo';

function Counter() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    // useCustomMemo(() => {
    //     console.log('useEffect triggered', count1);

    //     return () => {
    //         console.log('clean up');
    //     }
    // },[count1])

    function squaredCounter() {
        console.log('Expensive calculation');
        return count1 * count1;
    }

    // const memoizedFunction = useMemo(squaredCounter, [count1])
    const memoizedFunction = useCustomMemo(squaredCounter, [count1])

    console.log('rendered');

    return (
        <>
            <div>Counter 1: {count1}</div>
            <div>Squared Counter: {memoizedFunction}</div>
            <button onClick={() => setCount1((prev) => prev + 1)}>Increment</button>
            <button onClick={() => setCount1((prev) => prev - 1)}>Decrement</button>
            <div>
                -----------------------------------------------------------
            </div>
            <div>Counter 2: {count2}</div>
            {/* <div>Squared Counter: {squaredCounter()}</div> */}
            <button onClick={() => setCount2((prev) => prev + 1)}>Increment</button>
            <button onClick={() => setCount2((prev) => prev - 1)}>Decrement</button>
        </>

    )
}

export default Counter