import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './GamificationContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { Loader2 } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy loaded pages
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const Onboarding = lazy(() => import('./pages/Onboarding').then(m => ({ default: m.Onboarding })));
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Inspiration = lazy(() => import('./pages/Inspiration').then(m => ({ default: m.Inspiration })));
const Explore = lazy(() => import('./pages/Explore').then(m => ({ default: m.Explore })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const Investors = lazy(() => import('./pages/Investors').then(m => ({ default: m.Investors })));
const Chat = lazy(() => import('./pages/Chat').then(m => ({ default: m.Chat })));
const AIFeed = lazy(() => import('./pages/AIFeed').then(m => ({ default: m.AIFeed })));
const Tools = lazy(() => import('./pages/Tools').then(m => ({ default: m.Tools })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails').then(m => ({ default: m.ProjectDetails })));
const IdeaDetails = lazy(() => import('./pages/IdeaDetails').then(m => ({ default: m.IdeaDetails })));
const Saved = lazy(() => import('./pages/Saved').then(m => ({ default: m.Saved })));
const Notifications = lazy(() => import('./pages/Notifications').then(m => ({ default: m.Notifications })));
const Messages = lazy(() => import('./pages/Messages').then(m => ({ default: m.Messages })));
const VideoCall = lazy(() => import('./pages/VideoCall').then(m => ({ default: m.VideoCall })));
const Marketplace = lazy(() => import('./pages/Marketplace').then(m => ({ default: m.Marketplace })));
const CreateIdea = lazy(() => import('./pages/CreateIdea').then(m => ({ default: m.CreateIdea })));

const LoadingFallback = () => (
  <div className="min-h-screen bg-unihia-dark flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="text-unihia-accent animate-spin" size={40} />
      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">Orquestrando...</p>
    </div>
  </div>
);

import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { SecurityProvider } from './context/SecurityContext';
import { TrinityProvider } from './context/TrinityContext';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <LanguageProvider>
          <SecurityProvider>
            <TrinityProvider>
              <NotificationProvider>
                <GamificationProvider>
                  <AuthProvider>
                    <Suspense fallback={<LoadingFallback />}>
                      <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Onboarding Route (Requires Auth but not Onboarding) */}
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute requireOnboarding={false}>
                      <Onboarding />
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Routes with Layout */}
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/inspiration" element={<Inspiration />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/investors" element={<Investors />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/messages/:id" element={<Messages />} />
                  <Route path="/video-call" element={<VideoCall />} />
                  <Route path="/ai-feed" element={<AIFeed />} />
                  <Route path="/create-idea" element={<CreateIdea />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/saved" element={<Saved />} />
                  <Route path="/notifications" element={<Notifications />} />
                  
                  {/* Dynamic Routes */}
                  <Route path="/project/:id" element={<ProjectDetails />} />
                  <Route path="/idea/:id" element={<IdeaDetails />} />
                  
                  {/* AI Specific Routes */}
                  <Route path="/ai/create-idea" element={<CreateIdea />} />
                  <Route path="/ai/build-startup" element={<AIFeed />} />
                  <Route path="/ai/generate-code" element={<AIFeed />} />
                  <Route path="/ai/analyze-market" element={<AIFeed />} />
                  
                  {/* Fallback for authenticated users */}
                  <Route path="/" element={<Navigate to="/home" replace />} />
                </Route>

                {/* Global Fallback */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </GamificationProvider>
      </NotificationProvider>
    </TrinityProvider>
  </SecurityProvider>
  </LanguageProvider>
</ThemeProvider>
<SpeedInsights />
</ErrorBoundary>
  );
}

export default App;
