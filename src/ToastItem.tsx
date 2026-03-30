import { useCallback, useEffect, useState } from 'react';
import type { ToastData } from './toast';

const ICONS: Record<string, string> = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

const ToastItem = ({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: number) => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => onDismiss(toast.id), 300);
  }, [toast.id, onDismiss]);

  useEffect(() => {
    if (toast.duration === Infinity) return;
    const timer = setTimeout(dismiss, toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, dismiss]);

  return (
    <div
      className={`toast-item${visible ? ' visible' : ''}`}
      data-type={toast.type}
    >
      <div className="toast-icon">{ICONS[toast.type]}</div>
      <div style={{ flex: 1 }}>
        <div className="toast-label">{toast.type}</div>
        <div className="toast-message">{toast.message}</div>
      </div>
      <button className="toast-dismiss" onClick={dismiss}>
        ×
      </button>
    </div>
  );
};

export default ToastItem;
