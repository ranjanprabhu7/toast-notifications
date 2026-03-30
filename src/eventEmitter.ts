type Listener = (data: any) => void;

const listeners: Record<string, Listener[]> = {};

const emitter = {
  emit: (event: string, data: unknown) => {
    (listeners[event] || []).forEach((fn) => fn(data));
  },

  on: (event: string, fn: Listener) => {
    listeners[event] = [...(listeners[event] || []), fn];
  },

  off: (event: string, fn: Listener) => {
    listeners[event] = (listeners[event] || []).filter((l) => l !== fn);
  },
};

export default emitter;
