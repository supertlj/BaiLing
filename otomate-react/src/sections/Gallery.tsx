import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

interface GalleryProps {
    isActive: boolean;
}

export const Gallery = ({ isActive }: GalleryProps) => {
    const [activeBg, setActiveBg] = useState('gallery_rain_umbrella.png');

    const galleryItems = [
        { bg: 'gallery_rain_umbrella.png', label: '雨夜誓言' },
        { bg: 'character_suiyan_wide.png', label: '岁衍特写' },
        { bg: 'character_xielvheng_wide.png', label: '律令之界' },
        { bg: 'character_yexiao_wide.png', label: '狂傲一瞬' },
    ];

    return (
        <section id="section-gallery" className={`page-section ${isActive ? 'active' : ''}`}>
            {/* 背景切换带淡入淡出 */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeBg}
                    className="section-bg" 
                    style={{ backgroundImage: `url('${activeBg}')` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>
            <div className="bg-overlay"></div>
            
            <GlassCard className="gallery-card">
                <motion.span 
                    className="tag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    千面光影
                </motion.span>
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    视听中心
                </motion.h2>
                <motion.div 
                    className="desc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <p>定格宿命瞬间，预览唯美互动剧照。</p>
                </motion.div>
                
                <div className="gallery-grid">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="gallery-item"
                            onClick={() => setActiveBg(item.bg)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        >
                            <div className="gallery-thumb" style={{ backgroundImage: `url('${item.bg}')` }}></div>
                            <p className="gallery-label">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>
        </section>
    );
};
