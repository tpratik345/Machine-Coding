import { useCallback, useState } from "react"
import Toast from "../components/Toast";
import type { PositionType } from "../types/toast.types";

type ToastProps = React.ComponentProps<typeof Toast>

type ToastList = ToastProps & {
  id: number
};

function useToast(position: PositionType = 'top-right') {
  const [toastList, setToastList] = useState<ToastList[]>([]);

  const triggerToast = useCallback((toast: ToastProps) => {
    const id = Date.now();
    const newToast = {...toast, id}
    setToastList((prev) => [...prev, newToast])
  }, [])

  const closeToast = useCallback((id: number) => {
    setToastList((prev) => prev?.filter(toast => toast.id !== id));
  }, [])

  const RenderToast = toastList.length ? (
    <div className={`toast-container ${position}`}>
      { toastList?.map((toast) => {
        return <Toast key={toast.id} {...toast} onClose={() => closeToast(toast.id)} />
      })}
    </div>
  ) : <></>

  return { RenderToast, triggerToast }

}

export default useToast;