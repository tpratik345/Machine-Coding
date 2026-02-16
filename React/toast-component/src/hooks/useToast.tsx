import { useCallback, useState } from "react"
import Toast from "../components/Toast";
import type { PositionType } from "../types/toast.types";

type ToastProps = React.ComponentProps<typeof Toast>

// type ToastList = ToastProps & {
//   id: number
// }[]

function useToast(position: PositionType = 'top-right') {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);
  let timer: number;

  const triggerToast = useCallback((toast: ToastProps) => {
    clearTimeout(timer)
    setToastProps(toast)
    timer = setTimeout(() => {
      setToastProps(null);
    }, toast.duration ?? 500)
  }, [])

  const RenderToast = toastProps ? (
    <div>
      <Toast {...toastProps} />
    </div>
  ) : <></>

  return { RenderToast, triggerToast }

}

export default useToast;