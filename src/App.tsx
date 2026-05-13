import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './sections/Home';
import { Story } from './sections/Story';
import { Characters } from './sections/Characters';
import { Features } from './sections/Features';
import { Gallery } from './sections/Gallery';
import './index.css';

const sections = ['home', 'story', 'characters', 'features', 'gallery'];

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolling, setIsScrolling] = useState(false);
    const touchStartY = useRef(0);

    const activeIndex = sections.indexOf(activeSection);

    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId);
    };

    // 滚轮事件处理 (防抖/节流)
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            const currentIndex = sections.indexOf(activeSection);
            const nextIndex = currentIndex + direction;

            if (nextIndex >= 0 && nextIndex < sections.length) {
                setIsScrolling(true);
                setActiveSection(sections[nextIndex]);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [activeSection, isScrolling]);

    // 触摸事件处理 (移动端手势)
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY.current - touchEndY;

            if (Math.abs(deltaY) > 50) { // 阈值 50px
                const direction = deltaY > 0 ? 1 : -1;
                const currentIndex = sections.indexOf(activeSection);
                const nextIndex = currentIndex + direction;

                if (nextIndex >= 0 && nextIndex < sections.length) {
                    setIsScrolling(true);
                    setActiveSection(sections[nextIndex]);
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [activeSection, isScrolling]);

    return (
        <div className="app-container" style={{ overflow: 'hidden', height: '100vh', width: '100vw', position: 'relative' }}>
            <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
            
            <motion.main 
                className="content-container"
                animate={{ translateY: `-${activeIndex * 100}vh` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                onAnimationComplete={() => setIsScrolling(false)}
                style={{ height: `${sections.length * 100}vh` }}
            >
                <Home isActive={activeSection === 'home'} onNavigate={handleSectionChange} />
                <Story isActive={activeSection === 'story'} onNavigate={handleSectionChange} />
                <Characters isActive={activeSection === 'characters'} />
                <Features isActive={activeSection === 'features'} />
                <Gallery isActive={activeSection === 'gallery'} />
            </motion.main>
        </div>
    );
}

export default App;
