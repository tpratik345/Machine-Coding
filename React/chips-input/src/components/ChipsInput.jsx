import { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import './ChipsInput.css'


function ChipsInput() {
    const [chips, setChips] = useState([]);
    const [inputText, setInputText] = useState('')


    function handleKeyUp(event) {
        if (event.key === 'Enter' && event.target.value) {
            let obj = {
                id: Date.now(),
                data: event.target.value
            };
            setChips((prev) => [...prev, obj]);
            setInputText('')
        }
    }

    function handleClose(id) {
        let newChips = chips.filter((chip) => chip.id !== id);
        setChips(newChips)
    }

    function clearAll() {
        setChips([]);
        setInputText('')
    }

    return (
        <div className='container'>
            <div className='input_container'>
                <input type='text' value={inputText} onKeyDown={handleKeyUp} onChange={(e) => setInputText(e.target.value)} />
                <button onClick={clearAll}>Clear All Chips</button>
            </div>
            <div className='chips_container'>
                {
                    chips.length === 0
                        ? null
                        : chips?.map((chip) => {
                            return <div className='chip'>
                                <span>{chip.data}</span>
                                <AiOutlineClose className='icon' onClick={() => handleClose(chip.id)} />
                            </div>
                        })
                }
            </div>
        </div>
    )
}

export default ChipsInput