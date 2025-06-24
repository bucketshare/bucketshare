'use client';

import Link from 'next/link';
import { Home, User, Settings, ClipboardList } from 'lucide-react';
import { usePathname } from 'next/navigation';

function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/home', icon: <Home />, label: 'Explore' },
        { href: '/bucketlists', icon: <ClipboardList />, label: 'Bucketlists' },
        { href: '/profile', icon: <User />, label: 'Profile' },
        { href: '/settings', icon: <Settings />, label: 'Settings' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e8ebf2] shadow-md md:hidden">
            <div className="flex justify-around items-center py-2">
                {navItems.map(({ href, icon, label }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                            <div className="mb-1">{icon}</div>
                            {label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default BottomNav;
