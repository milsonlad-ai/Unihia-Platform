import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Award, Zap, ChevronRight, TrendingUp, CheckCircle, Lightbulb, Users, Bot } from 'lucide-react';
import { useGamification } from '../GamificationContext';

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-4 h-4" />,
  Star: <Star className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  CheckCircle: <CheckCircle className="w-4 h-4" />,
  Lightbulb: <Lightbulb className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
};

export const GamificationWidget: React.FC = () => {
  const { stats } = useGamification();
  const progress = (stats.points / stats.nextLevelThreshold) * 100;

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white font-bold text-xl">
            {stats.level}
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-black/40">Nível Atual</h3>
            <p className="font-bold text-lg">Explorador Unihia</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-black">{stats.points}</span>
          <span className="text-xs font-bold text-black/40 ml-1 uppercase">XP</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
          <span className="text-black/40">Progresso para Nível {stats.level + 1}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-black/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-black/30">
          <span>{stats.points} XP</span>
          <span>{stats.nextLevelThreshold} XP</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-widest text-black/40">Distintivos Recentes</h4>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
            Ver Todos <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        
        <div className="flex gap-2">
          {stats.badges.length > 0 ? (
            stats.badges.slice(-4).map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center text-black group relative cursor-help"
              >
                {iconMap[badge.icon] || <Award className="w-4 h-4" />}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <p className="font-bold">{badge.name}</p>
                  <p className="opacity-60">{badge.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="w-full py-4 border-2 border-dashed border-black/5 rounded-xl flex flex-col items-center justify-center text-black/20">
              <Award className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold uppercase">Nenhum conquistado</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-black/5">
        <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Atividades Recentes</h4>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {stats.recentActions.slice(0, 3).map((action) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span className="text-[11px] font-medium text-black/70">{action.action}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">+{action.points} XP</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
