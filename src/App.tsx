import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import GamePortal from './pages/GamePortal';
import About from './pages/About';
import Services from './pages/Services';
import TopicDetails from './pages/TopicDetails';
import { Project } from './constants';
import ProjectModal from './components/ProjectModal';
import ScrollToTop from './components/ScrollToTop';

// Helper to handle smooth scroll on route change
function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes({
  favorites,
  toggleFavorite,
  setViewingProject
}: any) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/portfolio"
          element={
            <Portfolio
              favorites={favorites}
              recentlyPlayed={[]} // Keeping for compatibility, not used in Portfolio
              toggleFavorite={toggleFavorite}
              setViewingProject={setViewingProject}
              handleDownload={() => { }} // Not used in Portfolio
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pages" element={<Services />} />
        <Route path="/vault" element={<GamePortal />} />
        <Route path="/document/:topicId" element={<TopicDetails />} />
      </Routes>
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
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
          <Toaster position="top-center" expand={false} richColors />
          <ScrollToTop />
          <ScrollManager />
          <Navbar />
          <main>
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
    </AuthProvider>
  );
}
