import { useStore } from '@nanostores/preact';
import { toasts, removeToast } from '../../lib/toastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-preact';

export default function ToastContainer() {
  const $toasts = useStore(toasts);

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-xs pointer-events-none">
      {$toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto transform transition-all duration-300 ease-in-out animate-slide-in
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
            ${toast.type === 'success' ? 'bg-white border-green-200 text-green-800 dark:bg-gray-800 dark:border-green-900 dark:text-green-400' : ''}
            ${toast.type === 'error' ? 'bg-white border-red-200 text-red-800 dark:bg-gray-800 dark:border-red-900 dark:text-red-400' : ''}
            ${toast.type === 'info' ? 'bg-white border-blue-200 text-blue-800 dark:bg-gray-800 dark:border-blue-900 dark:text-blue-400' : ''}
          `}
        >
          {/* Icon sesuai tipe */}
          <div className="flex-shrink-0">
            {toast.type === 'success' && <CheckCircle size={20} />}
            {toast.type === 'error' && <AlertCircle size={20} />}
            {toast.type === 'info' && <Info size={20} />}
          </div>

          <p className="text-sm font-medium flex-grow">{toast.message}</p>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}