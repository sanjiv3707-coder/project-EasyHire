import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './components/Layout/AppLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import JobCreate from './pages/JobCreate';
import Candidates from './pages/Candidates';
import CandidateDetail from './pages/CandidateDetail';
import Pipeline from './pages/Pipeline';
import Assessments from './pages/Assessments';
import Interviews from './pages/Interviews';
import Communication from './pages/Communication';
import Settings from './pages/Settings';

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/new" element={<JobCreate />} />
            
            <Route path="candidates" element={<Candidates />} />
            <Route path="candidates/:id" element={<CandidateDetail />} />
            
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="communication" element={<Communication />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
