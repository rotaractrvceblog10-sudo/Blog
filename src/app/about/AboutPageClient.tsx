'use client';

import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface TeamMember {
    slug: string;
    entry: {
        name: string;
        role: string;
        image: string | null;
        bio: string;
        linkedin: string | null;
        instagram: string | null;
        department: string;
        alignment?: 'left' | 'center' | 'right' | 'top' | 'bottom';
        order?: number | null;
    };
}

interface AboutPageClientProps {
    teamMembers: TeamMember[];
}

export function AboutPageClient({ teamMembers }: AboutPageClientProps) {
    console.log('Team Members Data:', JSON.stringify(teamMembers, null, 2));

    // Sort members by order (ascending), using 99 as default
    const sortMembers = (a: TeamMember, b: TeamMember) => {
        const orderA = a.entry.order ?? 99;
        const orderB = b.entry.order ?? 99;
        return orderA - orderB;
    };

    const literaryTeam = teamMembers
        .filter(member => member.entry.department === 'Literary')
        .sort(sortMembers);

    const prWebTeam = teamMembers
        .filter(member => member.entry.department === 'PR & Web')
        .sort(sortMembers);

    const getObjectPosition = (alignment?: string) => {
        switch (alignment) {
            case 'left': return 'object-left';
            case 'right': return 'object-right';
            case 'top': return 'object-top';
            case 'bottom': return 'object-bottom';
            default: return 'object-center';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <Breadcrumbs />

                <div className="mb-16 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        About <span className="text-[#c42964]">Us</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We are the Rotaract Club of RVCE, a group of passionate individuals dedicated to community service,
                        professional development, and fellowship.
                    </p>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Meet Our Team</h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                        The dedicated individuals behind this platform.
                    </p>

                    {/* Literary Services Team */}
                    {literaryTeam.length > 0 && (
                        <div className="mb-16">
                            <div className="mb-8 text-center">
                                <h3 className="text-xl font-bold">Literary Services</h3>
                                <p className="text-muted-foreground">Creating compelling stories and engaging content</p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {literaryTeam.map((member) => (
                                    <div
                                        key={member.slug}
                                        className="group relative overflow-hidden rounded-2xl border bg-card shadow-premium hover-lift"
                                    >
                                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10">
                                            {member.entry.image && (
                                                <Image
                                                    src={member.entry.image}
                                                    alt={member.entry.name}
                                                    fill
                                                    className={`transition-transform duration-500 group-hover:scale-110 object-cover ${getObjectPosition(member.entry.alignment)}`}
                                                    style={{ objectPosition: member.entry.alignment || 'center' }}
                                                />
                                            )}
                                        </div>

                                        <div className="p-6 text-center">
                                            <h4 className="text-xl font-bold mb-1">{member.entry.name}</h4>
                                            <p className="text-sm text-muted-foreground">{member.entry.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PR and Web Team */}
                    {prWebTeam.length > 0 && (
                        <div>
                            <div className="mb-8 text-center">
                                <h3 className="text-xl font-bold">PR & Web</h3>
                                <p className="text-muted-foreground">Building our online presence and community connections</p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {prWebTeam.map((member) => (
                                    <div
                                        key={member.slug}
                                        className="group relative overflow-hidden rounded-2xl border bg-card shadow-premium hover-lift"
                                    >
                                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-blue-500/10 to-primary/10">
                                            {member.entry.image && (
                                                <Image
                                                    src={member.entry.image}
                                                    alt={member.entry.name}
                                                    fill
                                                    className={`transition-transform duration-500 group-hover:scale-110 object-cover ${getObjectPosition(member.entry.alignment)}`}
                                                    style={{ objectPosition: member.entry.alignment || 'center' }}
                                                />
                                            )}
                                        </div>

                                        <div className="p-6 text-center">
                                            <h4 className="text-xl font-bold mb-1">{member.entry.name}</h4>
                                            <p className="text-sm text-muted-foreground">{member.entry.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
