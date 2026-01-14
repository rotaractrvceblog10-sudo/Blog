import { reader } from '@/lib/keystatic';
import { AboutPageClient } from './AboutPageClient';

export default async function AboutPage() {
    const teamMembers = await reader.collections.team.all();

    return <AboutPageClient teamMembers={teamMembers} />;
}
