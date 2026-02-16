import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';
import './Toast.css'
import type { ToastType, PositionType } from '../types/toast.types';


type ToastProps = {
  position?: PositionType
  type: ToastType,
  message: string
  duration?: number 
}

type ToastIconType = Record<ToastType, React.ReactNode>

function Toast({ position = 'top-right', type, message }: ToastProps) {
  const ToastIcon: ToastIconType = {
    success: <AiOutlineCheckCircle />,
    error: <AiOutlineCloseCircle />,
    info: <AiOutlineInfoCircle />,
    warning: <AiOutlineWarning />
  }

  return (
    <div className={`toast ${type} ${position}`}>
      <span className='message_container'>
        <span className='icon'>{ToastIcon[type]}</span>
        <span className='message'>{message}</span>
      </span>
      <span className='close_icon'>
        <AiOutlineClose />
      </span>
    </div>
  )
}

export default Toast