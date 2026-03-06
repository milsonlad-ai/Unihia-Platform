import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Trophy, Star, TrendingUp } from 'lucide-react';

export type NotificationType = 'points' | 'badge' | 'level' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
}

interface NotificationContextType {
  addNotification: (type: NotificationType, title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, title, message }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-80 pointer-events-none">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="pointer-events-auto"
            >
              <div className={`
                relative overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl
                ${notification.type === 'points' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : ''}
                ${notification.type === 'badge' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : ''}
                ${notification.type === 'level' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : ''}
                ${notification.type === 'info' ? 'bg-white/5 border-white/10 text-white' : ''}
              `}>
                <div className="flex gap-3">
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                    ${notification.type === 'points' ? 'bg-emerald-500/20' : ''}
                    ${notification.type === 'badge' ? 'bg-indigo-500/20' : ''}
                    ${notification.type === 'level' ? 'bg-amber-500/20' : ''}
                    ${notification.type === 'info' ? 'bg-white/10' : ''}
                  `}>
                    {notification.type === 'points' && <TrendingUp className="w-5 h-5" />}
                    {notification.type === 'badge' && <Trophy className="w-5 h-5" />}
                    {notification.type === 'level' && <Star className="w-5 h-5" />}
                    {notification.type === 'info' && <Bell className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold tracking-tight">{notification.title}</h4>
                    <p className="text-xs opacity-70 mt-0.5 line-clamp-2">{notification.message}</p>
                  </div>
                  <button 
                    onClick={() => removeNotification(notification.id)}
                    className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Progress bar for auto-dismiss */}
                <motion.div 
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className={`
                    absolute bottom-0 left-0 h-0.5
                    ${notification.type === 'points' ? 'bg-emerald-500/50' : ''}
                    ${notification.type === 'badge' ? 'bg-indigo-500/50' : ''}
                    ${notification.type === 'level' ? 'bg-amber-500/50' : ''}
                    ${notification.type === 'info' ? 'bg-white/20' : ''}
                  `}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
