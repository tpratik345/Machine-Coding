import { useEffect, useRef, useState } from 'react';
import './OtpInput.css';

function OtpInput({ size = 6 }) {
    const [inputArray, setInputArray] = useState(new Array(size).fill(''))
    const refArr = useRef([]);
    const [disabled, setDisabled] = useState(true)

    function handleSubmit() {
        console.log(inputArray)
    }

    function handleOnChange(value, index) {
        const newArr = [...inputArray];
        newArr[index] = value;
        setInputArray(newArr)

        value && refArr?.current[index + 1]?.focus();
    }

    useEffect(() => {
        if (refArr && refArr?.current)
            refArr?.current[0]?.focus();
    }, [])

    useEffect(() => {
        // let flag = true;
        // for(const i in inputArray) {
        //     const input = inputArray[i];
        //     // console.log(input)
        //     if(input.trim() === '') {
        //         flag = false;
        //         break;
        //     }
        // }        
        let flag = inputArray.some((value) => value==='')
        setDisabled(flag)
    }, [inputArray])

    function handleOnKeyDown(e, index) {
        if (!e.target.value && e.key === 'Backspace') {
            refArr.current[index - 1]?.focus();
        }
    }

    function handlePaste(e, index) {
        e.preventDefault();

        const pastedData = e.clipboardData.getData('text').trim();
        const values = pastedData.replace(/\D/g, '').split('');

        if (!values.length) return;

        const temp = [...inputs];

        let i = index;
        let j = 0;

        while (i < size && j < values.length) {
        temp[i] = values[j];
        i++;
        j++;
        }

        setInputs(temp);

        const nextIndex = Math.min(index + values.length, size - 1);
        inputRefs.current[nextIndex]?.focus();
    }

    return (
        <div className='container'>
            <div>OTP Login:</div>
            <div className='input-container'>
                {
                    inputArray.map((inputValue, index) => {
                        return (
                            <input
                                id={`input-${index}`}
                                key={index}
                                value={inputArray[index]}
                                ref={(input) => { refArr.current[index] = input }}
                                type='number'
                                maxLength={1}
                                onChange={(e) => handleOnChange(e.target.value, index)}
                                onInput={(e) => e.target.value = e.target.value.slice(0, 1)}
                                onKeyDown={(e) => handleOnKeyDown(e, index)}
                                onPaste={(e) => handlePaste(e, index)}
                            />
                        )
                    })
                }
            </div>
            <button disabled={disabled} onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default OtpInput