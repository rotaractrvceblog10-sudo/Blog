import { reader } from '@/lib/keystatic';
import { EventsPageClient } from './EventsPageClient';

export default async function EventsPage() {
    const events = await reader.collections.events.all();

    // Transform events to remove the content function (not serializable)
    const serializedEvents = events.map(event => ({
        slug: event.slug,
        entry: {
            title: event.entry.title,
            date: event.entry.date,
            time: event.entry.time,
            location: event.entry.location,
            description: event.entry.description,
            status: event.entry.status,
        }
    }));

    return <EventsPageClient events={serializedEvents} />;
}
