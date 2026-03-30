import { useCallback, useEffect, useState } from 'react';
import ToastItem from './ToastItem';
import emitter from './eventEmitter';
import type { ToastData } from './toast';

const MAX_VISIBLE = 3;

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler = (data: ToastData) => {
      setToasts((prev) => [...prev, data].slice(-MAX_VISIBLE));
    };

    emitter.on('TOAST_ADD', handler);

    return () => {
      emitter.off('TOAST_ADD', handler);
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
};

export default ToastContainer;
