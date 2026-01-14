import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = await reader.collections.events.read(slug);

    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto max-w-4xl px-4 py-12">
                <Link
                    href="/events"
                    className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                >
                    ← Back to Events
                </Link>

                <article>
                    {/* Header */}
                    <div className="mb-8">
                        {/* Status Badge */}
                        <div className="mb-4">
                            <span
                                className={`inline-block rounded-full px-4 py-2 text-sm font-medium ${event.status === 'Upcoming'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                            >
                                {event.status}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {event.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 text-muted-foreground border-b pb-6">
                            {event.date && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <span className="font-medium">
                                        {new Date(event.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            )}
                            {event.time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{event.time}</span>
                                </div>
                            )}
                            {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{event.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed">{event.description}</p>
                    </div>

                    {/* Register Button for Upcoming Events */}
                    {event.status === 'Upcoming' && (
                        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-center">
                            <h3 className="text-2xl font-bold mb-4">Interested in joining?</h3>
                            <p className="text-muted-foreground mb-6">
                                Contact us to register your interest for this event!
                            </p>
                            <button className="rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
                                Register Interest
                            </button>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </div>
    );
}
