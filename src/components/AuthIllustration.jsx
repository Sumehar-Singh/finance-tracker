import React from 'react';

export default function AuthIllustration() {
    return (
        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-12">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.05 }} />
                </linearGradient>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.2" />
                </filter>
            </defs>

            {/* Background Elements */}
            <circle cx="400" cy="300" r="250" fill="url(#grad1)" />
            <circle cx="600" cy="150" r="50" fill="white" fillOpacity="0.1" />
            <circle cx="100" cy="450" r="30" fill="white" fillOpacity="0.1" />

            {/* Phone/Dashboard Outline */}
            <rect x="250" y="150" width="300" height="400" rx="30" fill="white" fillOpacity="0.95" stroke="white" strokeWidth="2" filter="url(#shadow)" />

            {/* Header placeholder */}
            <rect x="280" y="180" width="100" height="10" rx="5" fill="#10b981" fillOpacity="0.2" />
            <circle cx="510" cy="185" r="15" fill="#10b981" fillOpacity="0.2" />

            {/* Chart Area */}
            <path d="M280 350 Q 330 300 380 320 T 480 250" stroke="#10b981" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M280 350 L 280 450 L 480 450 L 480 250" fill="#10b981" fillOpacity="0.1" />

            {/* Bar Chart Bars */}
            <rect x="300" y="400" width="20" height="50" rx="4" fill="#34d399" />
            <rect x="340" y="370" width="20" height="80" rx="4" fill="#10b981" />
            <rect x="380" y="320" width="20" height="130" rx="4" fill="#059669" />
            <rect x="420" y="280" width="20" height="170" rx="4" fill="#047857" />

            {/* Floating Coins/Elements */}
            <g filter="url(#shadow)">
                <circle cx="520" cy="220" r="28" fill="#fbbf24" stroke="white" strokeWidth="3" />
                <text x="512" y="228" fill="white" fontSize="24" fontWeight="bold">₹</text>
            </g>

            <g filter="url(#shadow)">
                <circle cx="240" cy="380" r="35" fill="#14b8a6" stroke="white" strokeWidth="3" />
                {/* Checkmark in circle */}
                <path d="M228 380 L 236 388 L 252 372" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Bottom Text Lines */}
            <rect x="280" y="480" width="240" height="8" rx="4" fill="#f3f4f6" />
            <rect x="280" y="500" width="180" height="8" rx="4" fill="#f3f4f6" />

            {/* Secure Shield Mini */}
            <path d="M550 450 L 550 470 Q 550 490 530 500 Q 510 490 510 470 L 510 450 L 530 440 Z" fill="#10b981" stroke="white" strokeWidth="2" />


        </svg>
    );
}
