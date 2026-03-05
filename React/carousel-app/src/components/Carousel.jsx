import React from 'react'

function Carousel({ children : slides }) {
    console.log(slides)
    return (
        <div className='overflow-hidden'>
            <div className='flex'>{slides}</div>
        </div>
    )
}

export default Carousel