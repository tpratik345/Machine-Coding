import React, { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineLeftCircle, AiOutlineRight, AiOutlineRightCircle } from "react-icons/ai";

function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 2000 }) {
    const [curr, setCurr] = useState(0)

    function handleLeft() {
        setCurr((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }

    function handleRight() {
        setCurr((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }

    useEffect(() => {
        if (!autoSlide) return;

        const interval = setInterval(handleRight, autoSlideInterval);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='overflow-hidden relative'>
            <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>{slides}</div>
            <div className='absolute inset-0 flex items-center justify-between p-4'>
                <button onClick={handleLeft} className='shadow rounded-full bg-white/80 text-gray-800 hover:bg-white p-2'>
                    <AiOutlineLeft size={30} />
                    {/* <AiOutlineLeftCircle size={40} /> */}
                </button>
                <button onClick={handleRight} className='shadow rounded-full bg-white/80 text-gray-800 hover:bg-white p-2'>
                    <AiOutlineRight size={30} />
                    {/* <AiOutlineRightCircle size={40} /> */}
                </button>
            </div>
            <div className='absolute bottom-4 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {
                        slides.map((_, i) => (
                            <div
                                onClick={() => setCurr(i)}
                                className={
                                    `transition-all ease-out w-3 h-3 bg-white rounded-full ${curr === i ? 'p-2 opacity-90' : 'opacity-60 '}`}>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Carousel