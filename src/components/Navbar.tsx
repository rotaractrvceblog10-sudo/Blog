// ✅ FIXED Navbar with proper centering
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
        { href: '/events', label: 'Events' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/about', label: 'About' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
                ? 'bg-background/80 backdrop-blur-lg shadow-md'
                : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
                }`}
        >
            {/* 🔥 KEY FIX: max-w + mx-auto */}
            <div className="mx-auto max-w-7xl grid grid-cols-3 items-center h-16 px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/new logo-2.png"
                        alt="Rotaract RVCE Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="text-xl font-bold">Rotaract RVCE</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex justify-center gap-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={isActive(link.href) ? 'text-primary' : ''}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
