import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    'home': 'Início',
    'inspiration': 'Inspiração',
    'ai_feed': 'AI Feed',
    'marketplace': 'Marketplace',
    'messages': 'Mensagens',
    'profile': 'Perfil',
    'projects': 'Projetos',
    'investors': 'Investidores',
    'saved': 'Guardados',
    'notifications': 'Notificações',
    'settings': 'Configurações',
    'create_idea': 'Criar Ideia',
    'transform_to_project': 'Transformar em Projeto',
    'ai_orchestration': 'Orquestração de IA',
    'visual_intel': 'Inteligência Visual',
    'creative_intel': 'Inteligência Criativa',
    'logical_intel': 'Inteligência Lógica',
  },
  en: {
    'home': 'Home',
    'inspiration': 'Inspiration',
    'ai_feed': 'AI Feed',
    'marketplace': 'Marketplace',
    'messages': 'Messages',
    'profile': 'Profile',
    'projects': 'Projects',
    'investors': 'Investors',
    'saved': 'Saved',
    'notifications': 'Notifications',
    'settings': 'Settings',
    'create_idea': 'Create Idea',
    'transform_to_project': 'Transform Idea Into Project',
    'ai_orchestration': 'AI Orchestration',
    'visual_intel': 'Visual Intelligence',
    'creative_intel': 'Creative Intelligence',
    'logical_intel': 'Logical Intelligence',
  },
  es: {
    'home': 'Inicio',
    'inspiration': 'Inspiración',
    'ai_feed': 'AI Feed',
    'marketplace': 'Marketplace',
    'messages': 'Mensajes',
    'profile': 'Perfil',
    'projects': 'Proyectos',
    'investors': 'Inversores',
    'saved': 'Guardado',
    'notifications': 'Notificaciones',
    'settings': 'Configuración',
    'create_idea': 'Crear Idea',
    'transform_to_project': 'Transformar en Proyecto',
    'ai_orchestration': 'Orquestración de IA',
    'visual_intel': 'Inteligencia Visual',
    'creative_intel': 'Inteligencia Creativa',
    'logical_intel': 'Inteligencia Lógica',
  },
  fr: {
    'home': 'Accueil',
    'inspiration': 'Inspiration',
    'ai_feed': 'AI Feed',
    'marketplace': 'Marketplace',
    'messages': 'Messages',
    'profile': 'Profil',
    'projects': 'Projets',
    'investors': 'Investisseurs',
    'saved': 'Enregistré',
    'notifications': 'Notifications',
    'settings': 'Paramètres',
    'create_idea': 'Créer une Idée',
    'transform_to_project': 'Transformer en Projet',
    'ai_orchestration': 'Orchestration IA',
    'visual_intel': 'Intelligence Visuelle',
    'creative_intel': 'Intelligence Créative',
    'logical_intel': 'Intelligence Logique',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
