import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GamificationStats, Badge } from './types';
import { useNotifications } from './context/NotificationContext';

interface GamificationContextType {
  stats: GamificationStats;
  awardPoints: (points: number, action: string) => void;
  unlockBadge: (badgeId: string) => void;
}

const ALL_BADGES: Badge[] = [
  { id: 'first_idea', name: 'Mente Brilhante', description: 'Criou sua primeira ideia na plataforma', icon: 'Lightbulb' },
  { id: 'team_founder', name: 'Fundador de Equipe', description: 'Formou sua primeira equipe de projeto', icon: 'Users' },
  { id: 'first_investment', name: 'Primeiro Investimento', description: 'Recebeu seu primeiro investimento anjo', icon: 'TrendingUp' },
  { id: 'project_completed', name: 'Executor Master', description: 'Concluiu seu primeiro projeto com sucesso', icon: 'CheckCircle' },
  { id: 'ai_collaborator', name: 'Sinergia Digital', description: 'Utilizou a Trinity AI para transformar uma ideia', icon: 'Bot' },
];

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addNotification } = useNotifications();
  const [stats, setStats] = useState<GamificationStats>(() => {
    const saved = localStorage.getItem('unihia_gamification');
    if (saved) return JSON.parse(saved);
    return {
      points: 0,
      level: 1,
      badges: [],
      nextLevelThreshold: 100,
      recentActions: []
    };
  });

  useEffect(() => {
    localStorage.setItem('unihia_gamification', JSON.stringify(stats));
  }, [stats]);

  const awardPoints = (points: number, action: string) => {
    addNotification('points', `+${points} XP`, action);
    
    setStats(prev => {
      const newPoints = prev.points + points;
      let newLevel = prev.level;
      let newThreshold = prev.nextLevelThreshold;

      // Simple level up logic: level 1 = 100, level 2 = 250, level 3 = 500, etc.
      if (newPoints >= prev.nextLevelThreshold) {
        newLevel += 1;
        newThreshold = Math.floor(prev.nextLevelThreshold * 1.5 + 100);
        addNotification('level', 'Nível Subiu!', `Você agora é Nível ${newLevel}`);
      }

      const newAction = {
        id: Math.random().toString(36).substr(2, 9),
        action,
        points,
        timestamp: new Date().toISOString()
      };

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        nextLevelThreshold: newThreshold,
        recentActions: [newAction, ...prev.recentActions].slice(0, 10)
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setStats(prev => {
      if (prev.badges.find(b => b.id === badgeId)) return prev;
      
      const badge = ALL_BADGES.find(b => b.id === badgeId);
      if (!badge) return prev;

      addNotification('badge', 'Novo Distintivo!', badge.name);
      const unlockedBadge = { ...badge, unlockedAt: new Date().toISOString() };
      
      return {
        ...prev,
        badges: [...prev.badges, unlockedBadge]
      };
    });
  };

  return (
    <GamificationContext.Provider value={{ stats, awardPoints, unlockBadge }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
