'use client';

import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface Event {
    slug: string;
    entry: {
        title: string;
        date: string | null;
        time: string | null;
        location: string | null;
        description: string;
        status: 'Upcoming' | 'Completed';
    };
}

interface EventsPageClientProps {
    events: Event[];
}

export function EventsPageClient({ events }: EventsPageClientProps) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <Breadcrumbs />
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Our <span className="text-[#c42964]">Events</span>
                    </h1>
                    <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                        Join us for impactful community service events and engaging activities.
                    </p>
                </motion.div>

                {/* Events Grid */}
                {events.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {events.map((event) => (
                            <motion.div
                                key={event.slug}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <Link
                                    href={`/events/${event.slug}`}
                                    className="group relative h-full overflow-hidden rounded-2xl border bg-card shadow-premium hover-lift block"
                                >
                                    {/* Gradient accent */}
                                    <div
                                        className={`absolute left-0 top-0 h-full w-1 ${event.entry.status === 'Upcoming'
                                            ? 'bg-gradient-to-b from-[#D41367] to-[#7c3aed]'
                                            : 'bg-gradient-to-b from-muted to-muted-foreground'
                                            }`}
                                    />

                                    <div className="p-6 pl-8">
                                        {/* Date Circle */}
                                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                                            <div className="text-center">
                                                <div className="text-xs font-medium text-muted-foreground">
                                                    {event.entry.date ? new Date(event.entry.date).toLocaleDateString('en-US', { month: 'short' }) : 'TBD'}
                                                </div>
                                                <div className="text-lg font-bold text-primary">
                                                    {event.entry.date ? new Date(event.entry.date).getDate() : '?'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="mb-3">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${event.entry.status === 'Upcoming'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                                    }`}
                                            >
                                                {event.entry.status}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="mb-3 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                            {event.entry.title}
                                        </h3>

                                        {/* Description (truncated) */}
                                        <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                            {event.entry.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            {event.entry.time && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-primary" />
                                                    <span>{event.entry.time}</span>
                                                </div>
                                            )}
                                            {event.entry.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                    <span>{event.entry.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="mb-4 text-6xl">📅</div>
                        <h3 className="mb-2 text-2xl font-bold">No events found</h3>
                        <p className="text-muted-foreground mb-6">
                            No events yet. Create your first event in the admin panel!
                        </p>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
}
