import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './GamificationContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

// Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Projects } from './pages/Projects';
import { Investors } from './pages/Investors';
import { Chat } from './pages/Chat';
import { AIFeed } from './pages/AIFeed';
import { Tools } from './pages/Tools';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { ProjectDetails } from './pages/ProjectDetails';
import { IdeaDetails } from './pages/IdeaDetails';

function App() {
  return (
    <NotificationProvider>
      <GamificationProvider>
        <AuthProvider>
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
              <Route path="/explore" element={<Explore />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/ai-feed" element={<AIFeed />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Dynamic Routes */}
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/idea/:id" element={<IdeaDetails />} />
              
              {/* AI Specific Routes */}
              <Route path="/ai/create-idea" element={<AIFeed />} />
              <Route path="/ai/build-startup" element={<AIFeed />} />
              <Route path="/ai/generate-code" element={<AIFeed />} />
              <Route path="/ai/analyze-market" element={<AIFeed />} />
              
              {/* Fallback for authenticated users */}
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Route>

            {/* Global Fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AuthProvider>
      </GamificationProvider>
    </NotificationProvider>
  );
}

export default App;
