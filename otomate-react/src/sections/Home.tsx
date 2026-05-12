import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

interface HomeProps {
    isActive: boolean;
    onNavigate: (sectionId: string) => void;
}

export const Home = ({ isActive, onNavigate }: HomeProps) => {
    return (
        <section id="section-home" className={`page-section ${isActive ? 'active' : ''}`}>
            <div className="section-bg" style={{ backgroundImage: "url('/bg_homepage_book.png')" }}></div>
            <div className="bg-overlay"></div>
            
            <GlassCard className="welcome-card">
                <motion.span 
                    className="tag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    AI真人沉浸式互动影游
                </motion.span>
                
                <motion.h1 
                    className="main-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    百灵卷宗
                </motion.h1>
                
                <motion.p 
                    className="sub-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    轮回之契
                </motion.p>
                
                <motion.div 
                    className="desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p>“不信天命只信自己。”</p>
                    <p>跨越两界，连接三国志怪世界的试炼。你将作为渡灵一族最后的血脉，解开千年的宿命阴谋。</p>
                </motion.div>
                
                <motion.button 
                    className="btn-primary" 
                    id="go-to-story"
                    onClick={() => onNavigate('story')}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    开启试炼
                </motion.button>
            </GlassCard>
        </section>
    );
};
