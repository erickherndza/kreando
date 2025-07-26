import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateSite from './pages/CreateSite';
import Editor from './pages/Editor';
import './App.css';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Componente para rutas públicas (solo para usuarios no autenticados)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Layout especial para el editor (sin header/footer)
const EditorLayout = ({ children }) => {
  return <div className="h-screen">{children}</div>;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas con layout completo */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route 
          path="/login" 
          element={
            <Layout>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Layout>
          } 
        />
        <Route 
          path="/register" 
          element={
            <Layout>
              <PublicRoute>
                <Register />
              </PublicRoute>
            </Layout>
          } 
        />

        {/* Rutas protegidas con layout completo */}
        <Route 
          path="/dashboard" 
          element={
            <Layout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Layout>
          } 
        />
        <Route 
          path="/create-site" 
          element={
            <Layout>
              <ProtectedRoute>
                <CreateSite />
              </ProtectedRoute>
            </Layout>
          } 
        />

        {/* Editor sin layout (pantalla completa) */}
        <Route 
          path="/editor/:siteId" 
          element={
            <EditorLayout>
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            </EditorLayout>
          } 
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
