import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TrinityMessage, TrinityPreferences } from '../types';
import { GoogleGenAI } from "@google/genai";

interface TrinityContextType {
  messages: TrinityMessage[];
  isThinking: boolean;
  sendMessage: (content: string, multimodalData?: TrinityMessage['multimodalData']) => Promise<void>;
  preferences: TrinityPreferences;
  updatePreferences: (prefs: Partial<TrinityPreferences>) => void;
  clearHistory: () => void;
}

const DEFAULT_PREFS: TrinityPreferences = {
  personality: 'executive',
  fusionMode: 'balanced',
  autoInsights: true,
  voiceEnabled: false,
};

const TrinityContext = createContext<TrinityContextType | undefined>(undefined);

export const TrinityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<TrinityMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [preferences, setPreferences] = useState<TrinityPreferences>(DEFAULT_PREFS);

  const sendMessage = async (content: string, multimodalData?: TrinityMessage['multimodalData']) => {
    const userMsg: TrinityMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content,
      multimodalData,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `
        Você é a Trinity IA, o núcleo central da Unihia Platform.
        Sua personalidade é ${preferences.personality}.
        Seu modo de fusão é ${preferences.fusionMode} (GPT + Claude + Gemini).
        
        Objetivos:
        1. Transformar inspiração em execução real.
        2. Facilitar negócios e colaborações.
        3. Garantir segurança e privacidade.
        
        Contexto: Você tem acesso a feeds de inspiração, projetos e investidores.
        Responda de forma executiva, criativa ou analítica dependendo da necessidade.
      `;

      const parts = [{ text: content }];
      if (multimodalData) {
        multimodalData.forEach(data => {
          if (data.type === 'image' && data.url) {
            // In a real app, we'd fetch the image and convert to base64
            // For now, we'll just acknowledge the image in the prompt
            parts.push({ text: `[Imagem anexada: ${data.url}]` });
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts }],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const assistantMsg: TrinityMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: response.text || "Desculpe, tive um problema ao processar sua solicitação.",
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Trinity IA Error:', error);
      const errorMsg: TrinityMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: "Erro de conexão com o núcleo Trinity. Por favor, tente novamente.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const updatePreferences = (prefs: Partial<TrinityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <TrinityContext.Provider value={{
      messages,
      isThinking,
      sendMessage,
      preferences,
      updatePreferences,
      clearHistory
    }}>
      {children}
    </TrinityContext.Provider>
  );
};

export const useTrinity = () => {
  const context = useContext(TrinityContext);
  if (!context) {
    throw new Error('useTrinity must be used within a TrinityProvider');
  }
  return context;
};
