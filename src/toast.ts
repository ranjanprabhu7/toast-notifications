import emitter from './eventEmitter';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
}

let idCounter = 0;

const defaults: Record<ToastType, number> = {
  success: 3000,
  error: 4000,
  warning: 3500,
  info: 3000,
};

const create = (type: ToastType, message: string, duration?: number) => {
  const data: ToastData = {
    id: ++idCounter,
    type,
    message,
    duration: duration ?? defaults[type],
  };
  emitter.emit('TOAST_ADD', data);
};

const toast = {
  success: (msg: string, duration?: number) => create('success', msg, duration),
  error: (msg: string, duration?: number) => create('error', msg, duration),
  warning: (msg: string, duration?: number) => create('warning', msg, duration),
  info: (msg: string, duration?: number) => create('info', msg, duration),
};

export default toast;
