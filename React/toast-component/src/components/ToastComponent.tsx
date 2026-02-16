import { useState } from 'react'
import Toast from './Toast'
import type { PositionType, ToastType } from '../types/toast.types'
import './ToastComponent.css'
import useToast from '../hooks/useToast'

function ToastComponent() {
    const [type, setType] = useState<ToastType>('success')
    const [position, setPosition] = useState<PositionType>('top-right')
    const { triggerToast, RenderToast } = useToast(position);

    function handleClick(value: ToastType) {
        setType(value)
        triggerToast({
            type:value,
            position,
            message:'This is a sample toast.',
            duration: 3000
        })
    }

    function handleOption(event: React.ChangeEvent<HTMLSelectElement>) {
        setPosition(event.target.value as PositionType)
    }

    return (
        <div className='container'>
            {/* <Toast type={type} position={position} message='This is a sample toast.' /> */}
            {RenderToast}
            <div className='options-container'>
                <select value={position} onChange={handleOption}>
                    <option value='top-left'>top-left</option>
                    <option value='top-right'>top-right</option>
                    <option value='bottom-left'>bottom-left</option>
                    <option value='bottom-right'>bottom-right</option>
                </select>
            </div>
            <div className='button-container'>
                <div>
                    <button onClick={() => handleClick('success')}>Show Success Toast</button>
                    <button onClick={() => handleClick('info')}>Show Info Toast</button>
                </div>
                <div>
                    <button onClick={() => handleClick('warning')}>Show Warning Toast</button>
                    <button onClick={() => handleClick('error')}>Show Error Toast</button>
                </div>
            </div>
        </div>
    )
}

export default ToastComponent