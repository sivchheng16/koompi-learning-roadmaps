import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import { LayoutProvider } from './context/LayoutContext';
import TopNav from './components/TopNav';
import { ProgressProvider } from './context/ProgressContext';

const TopicDetails = lazy(() => import('./pages/TopicDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CertVerification = lazy(() => import('./pages/CertVerification'));
const CreateCourse = lazy(() => import('./pages/CreateCourse'));
const MyCourses = lazy(() => import('./pages/MyCourses'));
const CourseViewer = lazy(() => import('./pages/CourseViewer'));
const Profile = lazy(() => import('./pages/Profile'));
const Admin = lazy(() => import('./pages/Admin'));

const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
    <p className="mt-4 text-sm font-sans text-muted-foreground">Loading…</p>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isLessonRoute =
    location.pathname.startsWith('/document/') ||
    location.pathname.startsWith('/auth/') ||
    location.pathname.startsWith('/cert/') ||
    location.pathname.startsWith('/c/');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" expand={false} richColors />
      <ScrollToTop />

      {!isLessonRoute && <TopNav />}

      <main className={!isLessonRoute ? "pt-16" : ""}>
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/document/:topicId" element={<TopicDetails />} />
              <Route path="/document/:topicId/:moduleId" element={<TopicDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/cert/:tokenId" element={<CertVerification />} />
              <Route path="/create" element={<CreateCourse />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/c/:slug" element={<CourseViewer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <LayoutProvider>
          <Router>
            <AppContent />
          </Router>
        </LayoutProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}
