import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

interface FeaturesProps {
    isActive: boolean;
}

export const Features = ({ isActive }: FeaturesProps) => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        { icon: '01', title: '分支抉择', desc: '执念之门，由你开启。每一次选择都将改变两界命运。' },
        { icon: '02', title: 'Live互动', desc: '触碰真实，倾听心跳。AI真人视频带来极致沉浸感。' },
        { icon: '03', title: '古董修复', desc: '洗尽铅华，还原宿命。在历史碎片中寻找爱的线索。' },
    ];

    return (
        <section id="section-features" className={`page-section ${isActive ? 'active' : ''}`}>
            <div className="section-bg" style={{ backgroundImage: "url('bg_homepage_book.png')", opacity: 0.5 }}></div>
            <div className="bg-overlay"></div>
            
            <div className="features-container">
                <div className="features-header">
                    <motion.span 
                        className="tag"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        互动体验
                    </motion.span>
                    <motion.h2 
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        多元特色玩法
                    </motion.h2>
                    <motion.p 
                        className="section-subtitle" 
                        style={{ color: '#c5c6c7' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        打破次元壁，与他真实互动
                    </motion.p>
                </div>
                
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-item-new"
                            style={{ flex: 1 }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        >
                            <GlassCard 
                                className={`feature-card-new ${activeFeature === index ? 'active' : ''}`}
                                style={{ maxWidth: 'none' }}
                                onClick={() => setActiveFeature(index)}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
