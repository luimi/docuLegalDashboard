import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Documents from './pages/Documents';
import DocumentForm from './pages/DocumentForm';
import Categories from './pages/Categories';
import Parse from 'parse';



const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //const { user } = useAuth();
  return Parse.User.current() ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //const { user } = useAuth();
  return !Parse.User.current() ? <>{children}</> : <Navigate to="/dashboard/documents" replace />;
};

function App() {
  const {VITE_SERVER, VITE_APPID, VITE_JSKEY} = import.meta.env;
  Parse.initialize(VITE_APPID, VITE_JSKEY);
  Parse.serverURL = VITE_SERVER;  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/documents" replace />} />
          
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard/documents" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="documents" element={<Documents />} />
            <Route path="documents/new" element={<DocumentForm />} />
            <Route path="documents/edit/:id" element={<DocumentForm />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;