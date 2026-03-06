import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthMethod, SecuritySettings, LoginActivity } from '../types';
import { secureStorage } from '../utils/security';

interface SecurityContextType {
  settings: SecuritySettings;
  updateSettings: (newSettings: Partial<SecuritySettings>) => void;
  failedAttempts: number;
  isLocked: boolean;
  lockUntil: Date | null;
  incrementFailedAttempts: () => void;
  resetFailedAttempts: () => void;
  activities: LoginActivity[];
  addActivity: (activity: Omit<LoginActivity, 'id' | 'date'>) => void;
}

const DEFAULT_SETTINGS: SecuritySettings = {
  passwordEnabled: true,
  fingerprintEnabled: false,
  patternEnabled: false,
  faceEnabled: false,
  preferredMethod: 'password',
  failedAttempts: 0,
  isLocked: false,
};

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SecuritySettings>(() => {
    const saved = secureStorage.getItem('security_settings');
    return saved || DEFAULT_SETTINGS;
  });

  const [activities, setActivities] = useState<LoginActivity[]>(() => {
    const saved = secureStorage.getItem('login_activities');
    return saved || [];
  });

  const [lockUntil, setLockUntil] = useState<Date | null>(null);

  useEffect(() => {
    secureStorage.setItem('security_settings', settings);
  }, [settings]);

  useEffect(() => {
    secureStorage.setItem('login_activities', activities);
  }, [activities]);

  const updateSettings = (newSettings: Partial<SecuritySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const incrementFailedAttempts = () => {
    const newAttempts = settings.failedAttempts + 1;
    let isLocked = false;
    let lockUntilDate: Date | null = null;

    if (newAttempts >= 5) {
      isLocked = true;
      lockUntilDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      setLockUntil(lockUntilDate);
    }

    updateSettings({ 
      failedAttempts: newAttempts, 
      isLocked, 
      lastFailedAttempt: new Date().toISOString(),
      lockUntil: lockUntilDate?.toISOString()
    });
  };

  const resetFailedAttempts = () => {
    updateSettings({ failedAttempts: 0, isLocked: false, lockUntil: undefined });
    setLockUntil(null);
  };

  const addActivity = (activity: Omit<LoginActivity, 'id' | 'date'>) => {
    const newActivity: LoginActivity = {
      ...activity,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep last 50
  };

  // Check for lock expiration
  useEffect(() => {
    if (settings.isLocked && settings.lockUntil) {
      const until = new Date(settings.lockUntil);
      if (until <= new Date()) {
        resetFailedAttempts();
      } else {
        setLockUntil(until);
        const timer = setTimeout(() => {
          resetFailedAttempts();
        }, until.getTime() - Date.now());
        return () => clearTimeout(timer);
      }
    }
  }, [settings.isLocked, settings.lockUntil]);

  return (
    <SecurityContext.Provider value={{ 
      settings, 
      updateSettings, 
      failedAttempts: settings.failedAttempts,
      isLocked: settings.isLocked,
      lockUntil,
      incrementFailedAttempts,
      resetFailedAttempts,
      activities,
      addActivity
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
