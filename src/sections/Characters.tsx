import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CharactersProps {
    isActive: boolean;
}

const characterData = {
    suiyan: {
        name: '岁衍',
        tag: '上古九尾狐',
        cv: 'CV: 特邀声优',
        quote: '“待人疏离却唯独对你格外纵容。”',
        desc: '温润魅惑的古董店老板，慵懒外表下是掌控妖界秩序的强者。默默守护你千年。',
        bg: 'character_suiyan_wide.png',
        subTags: ['#千年守护', '#温润魅惑', '#妖界族长']
    },
    xielvheng: {
        name: '谢律衡',
        tag: '幽府执律使',
        cv: 'CV: 特邀声优',
        quote: '“为了你，破例一次又何妨。”',
        desc: '清冷禁欲的幽府执律使。恪守法则从不破例，却屡次为你打破规则。',
        bg: 'character_xielvheng_wide.png',
        subTags: ['#清冷禁欲', '#幽府破例', '#克制与越界']
    },
    yexiao: {
        name: '夜骁',
        tag: '大天狗',
        cv: 'CV: 特邀声优',
        quote: '“看什么看？再看把你抓回妖界。”',
        desc: '桀骜不驯的妖界掌权者，战力天花板。初期视你为敌，后被你打动。',
        bg: 'character_yexiao_wide.png',
        subTags: ['#傲娇毒舌', '#欢喜冤家', '#战斗力天花板']
    }
};

export const Characters = ({ isActive }: CharactersProps) => {
    const [activeChar, setActiveChar] = useState<keyof typeof characterData>('suiyan');
    const data = characterData[activeChar];

    return (
        <section id="section-characters" className={`page-section char-profile-section ${isActive ? 'active' : ''}`}>
            {/* 背景切换带淡入淡出 */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeChar}
                    className="section-bg" 
                    style={{ backgroundImage: `url('${data.bg}')` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>
            <div className="bg-overlay"></div>
            
            <div className="char-profile-container">
                {/* 内容切换带动画 */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeChar}
                        className="char-details"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="tag">{data.tag}</span>
                        <h1 className="char-name">{data.name}</h1>
                        <p className="char-cv">{data.cv}</p>
                        <div className="char-quote">{data.quote}</div>
                        <div className="char-desc">
                            <p>{data.desc}</p>
                        </div>
                        <div className="char-tags">
                            {data.subTags.map((tag, index) => (
                                <span key={index}>{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
                
                <div className="interaction-buttons">
                    <button className="btn-primary" onClick={() => alert(`正在播放【${data.name}】的心声语音片段...`)}>倾听心声</button>
                    <button className="btn-secondary">查看档案</button>
                </div>

                <div className="char-switcher">
                    {Object.entries(characterData).map(([key, char]) => (
                        <div 
                            key={key}
                            className={`thumb ${activeChar === key ? 'active' : ''}`} 
                            style={{ backgroundImage: `url('${char.bg}')` }}
                            onClick={() => setActiveChar(key as keyof typeof characterData)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
