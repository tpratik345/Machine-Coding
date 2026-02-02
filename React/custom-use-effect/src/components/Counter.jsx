import React, { useEffect, useState } from 'react'
import useCustomEffect from '../hooks/useCustomEffect';

function Counter() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    useCustomEffect(() => {
        console.log('useEffect triggered', count1);

        return () => {
            console.log('clean up');
        }
    },[count1])

    console.log('rendered');

    return (
        <>
            <div>Counter: {count1}</div>
            <button onClick={() => setCount1((prev) => prev+1)}>Increment</button>
            <button onClick={() => setCount1((prev) => prev-1)}>Decrement</button>
        </>

    )
}

export default Counter