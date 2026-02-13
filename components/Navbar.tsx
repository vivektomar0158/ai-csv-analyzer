'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Clock, Activity, Github } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/reports', label: 'Reports', icon: Clock },
        { href: '/status', label: 'System Health', icon: Activity },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-2xl shadow-xl shadow-gray-200/50 z-50 flex items-center gap-8">
            {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors
              ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="hidden sm:inline">{link.label}</span>
                    </Link>
                );
            })}
            <div className="w-px h-4 bg-gray-200 mx-2 hidden sm:block" />
            <a
                href="https://github.com/vivektomar0158"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
            >
                <Github className="w-5 h-5" />
            </a>
        </nav>
    );
}
