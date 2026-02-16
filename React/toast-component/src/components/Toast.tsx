import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';
import './Toast.css'
import type { ToastType } from '../types/toast.types';
import { useEffect, useRef } from 'react';

type ToastProps = {
  type: ToastType
  message: string
  duration?: number
  onClose?: () => void
}

type ToastIconType = Record<ToastType, React.ReactNode>

function Toast({ type, message, duration, onClose }: ToastProps) {

  const ToastIcon: ToastIconType = {
    success: <AiOutlineCheckCircle />,
    error: <AiOutlineCloseCircle />,
    info: <AiOutlineInfoCircle />,
    warning: <AiOutlineWarning />
  }

  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`toast ${type}`}>
      <span className='message_container'>
        <span className='icon'>{ToastIcon[type]}</span>
        <span className='message'>{message}</span>
      </span>
      <span className='close_icon' onClick={onClose}>
        <AiOutlineClose />
      </span>
    </div>
  )
}

export default Toast