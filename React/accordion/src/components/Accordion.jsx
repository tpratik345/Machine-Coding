import { useState } from 'react'
import { data } from './data';
import './Accordion.css'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


function Accordion() {
    const [openedIndex, setOpenedIndex] = useState(null);

    function handleClick(index) {
        setOpenedIndex(openedIndex === index ? null : index)
    }

    return (
        data.length === 0
            ? <div>No Data to dsiplay</div>
            : <div className='accordion-container'>
                {data.map((accordion, index) => {
                    return (<div key={index} className='accordion'>
                        <button className='accordion-header' onClick={() => handleClick(index)}>
                            {accordion.name}
                            {openedIndex === index ? <FaAngleDown /> : <FaAngleUp />}
                        </button>
                        {openedIndex === index && <div className='accordion-description'>{accordion.description}</div>}
                    </div>)
                })}
            </div>
    )
}

export default Accordion