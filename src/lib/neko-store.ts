import { useSyncExternalStore } from "react";

type Listener = () => void;

let isPlaying = false;
const listeners = new Set<Listener>();

export const nekoStore = {
  getSnapshot: () => isPlaying,
  getServerSnapshot: () => false,
  setPlaying: (val: boolean) => {
    if (isPlaying !== val) {
      isPlaying = val;
      listeners.forEach((l) => l());
    }
  },
  toggle: () => {
    isPlaying = !isPlaying;
    listeners.forEach((l) => l());
    return isPlaying;
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useNeko() {
  const playing = useSyncExternalStore(
    nekoStore.subscribe,
    nekoStore.getSnapshot,
    nekoStore.getServerSnapshot
  );

  return {
    isPlaying: playing,
    toggle: nekoStore.toggle,
    setPlaying: nekoStore.setPlaying,
  };
}
