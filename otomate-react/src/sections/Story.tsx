import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

interface StoryProps {
    isActive: boolean;
    onNavigate: (sectionId: string) => void;
}

export const Story = ({ isActive, onNavigate }: StoryProps) => {
    return (
        <section id="section-story" className={`page-section ${isActive ? 'active' : ''}`}>
            <div className="section-bg" style={{ backgroundImage: "url('/gallery_rain_umbrella.png')" }}></div>
            <div className="bg-overlay"></div>
            
            <GlassCard className="story-card">
                <motion.span 
                    className="tag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    世界观
                </motion.span>
                
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    幽明之契
                </motion.h2>
                
                <motion.div 
                    className="scroll-box"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <p>你叫渡弦，是东方渡灵一族最后的血脉。天生拥有“玄瞳”与“通幽”之能，世代承担着引渡幽魂、化解执念的职责。</p>
                    <p>全族被灭后，你隐居市井，以古董修复师的身份苟活。直到20岁这年，家族遗留的《百灵卷宗》意外觉醒，将你卷入「百灵试炼」。</p>
                    <p>你需要穿越每个副本，归正作乱的煞、化解未竟的执念，同时揭开渡灵一族世代守护的「幽明之契」秘密——你的族人被灭，并非意外，而是一场跨越千年的宿命阴谋。</p>
                </motion.div>
                
                <motion.button 
                    className="btn-secondary" 
                    id="back-to-home"
                    onClick={() => onNavigate('characters')}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    结识男主
                </motion.button>
            </GlassCard>
        </section>
    );
};
