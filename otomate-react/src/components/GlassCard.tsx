import type { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

export const GlassCard = ({ children, className = '', style, onClick }: GlassCardProps) => {
    return (
        <div className={`glass-card ${className}`} style={style} onClick={onClick}>
            {children}
        </div>
    );
};
