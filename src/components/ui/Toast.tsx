import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icons = {
            info: <Info className="h-5 w-5 text-blue-400" />,
            success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
            warning: <AlertCircle className="h-5 w-5 text-amber-400" />,
            error: <AlertCircle className="h-5 w-5 text-red-400" />,
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={cn(
                'relative flex items-start space-x-3 rounded-xl border border-zinc-800 bg-[#18181B] p-4 shadow-2xl backdrop-blur-xl'
              )}
            >
              <div className="shrink-0 mt-0.5">{icons[toast.type || 'info']}</div>
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
                {toast.description && (
                  <p className="mt-1 text-xs text-zinc-400">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="absolute right-2 top-2 p-1 text-zinc-500 hover:text-white rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
