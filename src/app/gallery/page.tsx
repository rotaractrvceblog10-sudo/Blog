import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GalleryGrid } from '@/components/GalleryGrid';
import { reader } from '@/lib/keystatic';

export default async function GalleryPage() {
    const galleryItems = await reader.collections.gallery.all();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <Breadcrumbs />
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Photo <span className="text-[#c42964]">Gallery</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Capturing moments and memories from our events and activities.
                    </p>
                </div>

                <GalleryGrid items={galleryItems} />
            </main>

            <Footer />
        </div>
    );
}
