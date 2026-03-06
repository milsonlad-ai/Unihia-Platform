import React from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Bell, Shield, User, ChevronRight, LogOut, Palette, Globe, Fingerprint, Scan, Grid3X3, Lock, ShieldCheck, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useSecurity } from '../context/SecurityContext';
import { AuthMethod } from '../types';

export const Settings: React.FC = () => {
  const { logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { accentColor, setAccentColor, theme, setTheme } = useTheme();
  const { settings, updateSettings, activities } = useSecurity();

  const sections = [
    { title: 'Conta', icon: User, items: ['Editar Perfil', 'Alterar Senha', 'Preferências'] },
    { title: 'Segurança Avançada', icon: Shield, items: ['Palavra-passe', 'Impressão Digital', 'Padrão de Desbloqueio', 'Reconhecimento Facial', 'Método Preferido', 'Histórico de Atividade'] },
    { title: 'Notificações', icon: Bell, items: ['Push', 'E-mail', 'Atividade da Rede'] },
    { title: 'Personalização', icon: Palette, items: ['Tema', 'Cor de Destaque', 'Layout da Home'] },
    { title: 'Idioma', icon: Globe, items: ['Português', 'English', 'Español', 'Français'] },
  ];

  const handleItemClick = (item: string) => {
    if (item === 'Português') setLanguage('pt');
    if (item === 'English') setLanguage('en');
    if (item === 'Español') setLanguage('es');
    if (item === 'Français') setLanguage('fr');
    
    if (item === 'Tema') setTheme(theme === 'dark' ? 'light' : 'dark');
    if (item === 'Cor de Destaque') {
      const colors = ['#FF6321', '#10b981', '#3b82f6', '#8b5cf6'];
      const nextColor = colors[(colors.indexOf(accentColor) + 1) % colors.length];
      setAccentColor(nextColor);
    }

    // Security
    if (item === 'Palavra-passe') updateSettings({ passwordEnabled: !settings.passwordEnabled });
    if (item === 'Impressão Digital') updateSettings({ fingerprintEnabled: !settings.fingerprintEnabled });
    if (item === 'Padrão de Desbloqueio') updateSettings({ patternEnabled: !settings.patternEnabled });
    if (item === 'Reconhecimento Facial') updateSettings({ faceEnabled: !settings.faceEnabled });
    
    if (item === 'Método Preferido') {
      const methods: AuthMethod[] = ['password', 'fingerprint', 'pattern', 'face'];
      const currentIdx = methods.indexOf(settings.preferredMethod);
      const nextMethod = methods[(currentIdx + 1) % methods.length];
      updateSettings({ preferredMethod: nextMethod });
    }
  };

  const getSecurityStatus = (item: string) => {
    if (item === 'Palavra-passe') return settings.passwordEnabled;
    if (item === 'Impressão Digital') return settings.fingerprintEnabled;
    if (item === 'Padrão de Desbloqueio') return settings.patternEnabled;
    if (item === 'Reconhecimento Facial') return settings.faceEnabled;
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pt-24 pb-32 space-y-10"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-serif italic font-bold text-white leading-none tracking-tight">Definições</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Personalize sua Orquestração</p>
        </div>
        <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10">
          <SettingsIcon className="text-unihia-accent" size={18} />
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <section.icon size={16} className="text-unihia-accent" />
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">{section.title}</h3>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden">
              {section.items.map((item, i) => {
                const isSelected = (item === 'Português' && language === 'pt') ||
                                   (item === 'English' && language === 'en') ||
                                   (item === 'Español' && language === 'es') ||
                                   (item === 'Français' && language === 'fr');

                const securityStatus = getSecurityStatus(item);
                
                if (item === 'Histórico de Atividade') {
                  return (
                    <div key={item} className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-300 text-sm font-medium">{item}</span>
                        <History size={16} className="text-zinc-800" />
                      </div>
                      <div className="space-y-3">
                        {activities.length > 0 ? activities.slice(0, 3).map((act) => (
                          <div key={act.id} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/[0.03]">
                            <div className="space-y-1">
                              <p className="text-[10px] text-white font-bold">{act.device}</p>
                              <p className="text-[8px] text-zinc-600 uppercase font-black">{act.location}</p>
                            </div>
                            <div className="text-right space-y-1">
                              <p className={`text-[8px] font-black uppercase ${act.status === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                                {act.status === 'success' ? 'Sucesso' : 'Falha'}
                              </p>
                              <p className="text-[8px] text-zinc-700">{new Date(act.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        )) : (
                          <p className="text-[10px] text-zinc-700 text-center py-2 italic">Nenhuma atividade recente</p>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <button 
                    key={item}
                    onClick={() => handleItemClick(item)}
                    className={`w-full p-5 text-left text-sm font-medium hover:bg-white/[0.04] transition-colors flex items-center justify-between ${i !== section.items.length - 1 ? 'border-b border-white/[0.03]' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isSelected ? 'text-unihia-accent font-bold' : 'text-zinc-300'}>{item}</span>
                      {item === 'Tema' && <span className="text-[10px] text-zinc-600 uppercase font-black">({theme})</span>}
                      {item === 'Cor de Destaque' && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />}
                      {item === 'Método Preferido' && <span className="text-[10px] text-unihia-accent uppercase font-black">({settings.preferredMethod})</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      {securityStatus !== null && (
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${securityStatus ? 'bg-unihia-accent/20' : 'bg-white/5'}`}>
                          <motion.div 
                            animate={{ x: securityStatus ? 20 : 0 }}
                            className={`absolute top-1 left-1 w-3 h-3 rounded-full ${securityStatus ? 'bg-unihia-accent' : 'bg-zinc-700'}`}
                          />
                        </div>
                      )}
                      <ChevronRight size={16} className="text-zinc-800" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button 
          onClick={logout}
          className="w-full p-6 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-red-500/20 transition-all"
        >
          <LogOut size={16} />
          Sair da Conta
        </button>
      </div>
    </motion.div>
  );
};
