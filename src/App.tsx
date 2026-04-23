import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import Sidebar from './components/Sidebar';
import { Project } from './constants';
import ProjectModal from './components/ProjectModal';
import ScrollToTop from './components/ScrollToTop';
import AuthModal from './components/AuthModal';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const GamePortal = lazy(() => import('./pages/GamePortal'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const TopicDetails = lazy(() => import('./pages/TopicDetails'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
    <div className="mt-8 font-mono text-[10px] font-bold tracking-[0.5em] text-primary uppercase animate-pulse">
      Loading System...
    </div>
  </div>
);

function AnimatedRoutes({
  favorites,
  toggleFavorite,
  setViewingProject
}: any) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/portfolio"
            element={
              <Portfolio
                favorites={favorites}
                recentlyPlayed={[]}
                toggleFavorite={toggleFavorite}
                setViewingProject={setViewingProject}
                handleDownload={() => { }}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pages" element={<Services />} />
          <Route path="/vault" element={<GamePortal />} />
          <Route path="/document/:topicId" element={<TopicDetails />} />
          <Route path="/document/:topicId/:moduleId" element={<TopicDetails />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('portfolio-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    return () => lenis.destroy();
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isFav = prev.includes(id);
      const next = isFav ? prev.filter(fid => fid !== id) : [...prev, id];
      localStorage.setItem('portfolio-favorites', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthProvider>
      <Router>
        <AuthModal />
        <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
          <Toaster position="top-center" expand={false} richColors />
          <ScrollToTop />
          
          <Sidebar />

          <main className="flex-1 lg:pl-[280px] w-full min-h-screen">
            <AnimatedRoutes
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              setViewingProject={setViewingProject}
            />
            {viewingProject && (
              <ProjectModal
                project={viewingProject}
                onClose={() => setViewingProject(null)}
              />
            )}
          </main>
        </div>
      </Router>
    </AuthProvider >
  );
}
