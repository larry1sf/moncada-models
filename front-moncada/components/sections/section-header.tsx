import BadgePremium from "@/components/badge-premium";
import React from "react";

interface SectionHeaderProps {
    badgeContent?: React.ReactNode;
    title: string;
    description?: string;
    showBadge?: boolean;
    className?: string;
}

export default function SectionHeader({
    badgeContent,
    title,
    description,
    showBadge = true,
    className = ""
}: SectionHeaderProps) {
    return (
        <div className={`text-center space-y-4 ${className}`}>
            {showBadge && badgeContent && (
                <BadgePremium color="dark">
                    <>{badgeContent}</>
                </BadgePremium>
            )}
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-black text-text-dark tracking-tighter leading-none animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {title}
            </h2>
            {description && (
                <p
                    className="text-xl text-text-dark max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up"
                    style={{ animationDelay: '0.2s' }}>
                    {description}
                </p>
            )}
        </div>
    );
}
