import { useState } from 'react';

interface NavbarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

export const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: '首页' },
        { id: 'story', label: '故事背景' },
        { id: 'characters', label: '角色介绍' },
        { id: 'features', label: '特色玩法' },
        { id: 'gallery', label: '视听中心' },
    ];

    const handleNavClick = (sectionId: string) => {
        onSectionChange(sectionId);
        setIsMenuOpen(false); // 点击后关闭移动端菜单
    };

    return (
        <nav className="navbar">
            <div className="logo">百灵卷宗</div>
            
            {/* 汉堡菜单按钮 */}
            <div 
                className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* 导航链接 */}
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`}
                            className={activeSection === item.id ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.id);
                            }}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="action-btn">立即预约</div>
        </nav>
    );
};
