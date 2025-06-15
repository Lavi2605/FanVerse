import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import CommunitySection from '../components/CommunitySection';
import MarketplaceSection from '../components/MarketplaceSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Particle_Home from '../components/Particle_Home';
import { useNavigate } from 'react-router-dom';

const sections = [
  { id: 'hero', component: HeroSection },
  { id: 'about', component: AboutSection },
  { id: 'features', component: FeaturesSection },
  { id: 'community', component: CommunitySection },
  { id: 'marketplace', component: MarketplaceSection },
  { id: 'cta', component: CallToAction },
  { id: 'footer', component: Footer },
];

function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollAccumulator = useRef(0);
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSection = useCallback(
    (index: number) => {
      if (index >= 0 && index < sections.length && !isTransitioning) {
        setIsTransitioning(true);
        setCurrentSection(index);
        setTimeout(() => setIsTransitioning(false), 1400);
      }
    },
    [isTransitioning]
  );

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      const now = Date.now();
      const timeDiff = now - lastScrollTime.current;
      if (timeDiff > 200) scrollAccumulator.current = 0;
      scrollAccumulator.current += Math.abs(e.deltaY);
      lastScrollTime.current = now;

      if (scrollAccumulator.current > 120) {
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
          goToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
        scrollAccumulator.current = 0;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        goToSection(currentSection - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 100) {
        if (diff > 0 && currentSection < sections.length - 1) {
          goToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isTransitioning, isMobile, goToSection]);

  const getTransitionStyle = (index: number) => {
    const isActive = index === currentSection;
    const isPrev = index < currentSection;

    if (isActive) {
      return {
        opacity: 1,
        transform: 'translateX(0) translateY(0) scale(1)',
        filter: 'blur(0) brightness(1)',
        zIndex: 30,
        transition: 'all 1.2s ease-in-out',
        willChange: 'transform, opacity, filter',
      };
    } else if (isPrev) {
      return {
        opacity: 0,
        transform: 'translateX(-100px) translateY(-150px) scale(0.6)',
        filter: 'blur(10px) brightness(0.3)',
        zIndex: 10,
        transition: 'all 0.8s ease-in-out',
      };
    } else {
      return {
        opacity: 0,
        transform: 'translateX(100px) translateY(150px) scale(0.6)',
        filter: 'blur(10px) brightness(0.3)',
        zIndex: 10,
        transition: 'all 0.8s ease-in-out',
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-gray-900 text-white relative ${
        isMobile ? 'overflow-y-auto' : 'overflow-hidden'
      }`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particle_Home />
      </div>

      {/* Navbar */}
      <div className="relative z-40">
        <Navbar
          currentSection={currentSection}
          onSectionClick={goToSection}
          onAuthClick={() => setShowAuth(true)}
        />
      </div>

      {/* Sections */}
      <div className="relative h-screen">
        {sections.map((section, index) => {
          const Component = section.component;
          const transitionStyle = getTransitionStyle(index);
          return (
            <div
              key={section.id}
              className="absolute inset-0 transition-all duration-1000 ease-out transform-gpu"
              style={{
                ...transitionStyle,
                backfaceVisibility: 'hidden',
                transformOrigin: 'center',
              }}
            >
              <div className="w-full min-h-screen snap-start snap-always">
                <Component
                  visible={index === currentSection}
                  key={index === currentSection ? 'visible' : 'hidden'}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`relative w-4 h-4 rounded-full transition-all duration-700 transform ${
              index === currentSection
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-150 shadow-2xl shadow-purple-500/60'
                : 'bg-white/20 hover:bg-white/40 hover:scale-125'
            }`}
            aria-label={`Go to section ${index + 1}`}
          >
            {index === currentSection && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-75" />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Hint */}
      {currentSection < sections.length - 1 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex flex-col items-center text-white/60 hover:text-white transition duration-500 cursor-pointer animate-bounce hover:scale-110">
            <span className="text-sm mb-2 font-semibold tracking-wide">Scroll for more</span>
            <div className="relative">
              <ChevronDown className="w-6 h-6" />
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-pink-500/30 rounded-full blur-lg animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">Welcome to FanVerse</h2>
                <p className="text-white/60 text-sm">Join millions of creators worldwide</p>
              </div>
              <button
                onClick={() => setShowAuth(false)}
                className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAuth(false);
                    navigate('/signup');
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-sm"
                >
                  Sign Up Free
                </button>
                <button
                  onClick={() => {
                    setShowAuth(false);
                    navigate('/signin');
                  }}
                  className="flex-1 py-3 border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 text-sm"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center text-white/60 text-xs">
                <p>🚀 Start creating amazing content today</p>
                <p className="mt-1">✨ Connect with passionate fans worldwide</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
