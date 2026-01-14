import { atom } from 'nanostores';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// State global untuk menampung daftar toast
export const toasts = atom<Toast[]>([]);

// Fungsi helper untuk memanggil toast dari mana saja
export const addToast = (message: string, type: ToastType = 'info') => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: Toast = { id, message, type };
  
  // Tambahkan ke list
  toasts.set([...toasts.get(), newToast]);

  // Otomatis hilang setelah 3 detik
  setTimeout(() => {
    removeToast(id);
  }, 3000);
};

export const removeToast = (id: string) => {
  toasts.set(toasts.get().filter((t) => t.id !== id));
};