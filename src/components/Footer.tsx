import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-secondary/30 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D41367] to-[#7c3aed] flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="text-lg font-bold">Rotaract RVCE</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Empowering young leaders to create positive change in the community through service and fellowship.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Quick Links</h3>
                        <nav className="flex flex-col gap-2 text-sm">
                            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                Home
                            </Link>
                            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                                Blog
                            </Link>
                            <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">
                                Events
                            </Link>
                            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                About Us
                            </Link>
                        </nav>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Categories</h3>
                        <nav className="flex flex-col gap-2 text-sm">
                            <Link href="/blog?category=Articles" className="text-muted-foreground hover:text-primary transition-colors">
                                Articles
                            </Link>
                            <Link href="/blog?category=Poems" className="text-muted-foreground hover:text-primary transition-colors">
                                Poems
                            </Link>
                            <Link href="/blog?category=Reviews" className="text-muted-foreground hover:text-primary transition-colors">
                                Reviews
                            </Link>
                            <Link href="/blog?category=Events" className="text-muted-foreground hover:text-primary transition-colors">
                                Club Events
                            </Link>
                        </nav>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Connect With Us</h3>
                        <div className="flex gap-3">
                            <a
                                href="https://www.instagram.com/rotaractrvce"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://in.linkedin.com/company/rotaract-club-of-r-v-c-e"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://x.com/rotaractrv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs text-muted-foreground">Join our newsletter</p>
                            <div className="mt-2 flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>&copy; {currentYear} Rotaract Club of RVCE. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
