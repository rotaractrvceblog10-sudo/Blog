'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryItem {
    slug: string;
    entry: {
        title: string;
        image: string | null;
        date: string | null;
        event: string | null;
    };
}

interface GalleryGridProps {
    items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((item, index) => (
                <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-card shadow-premium hover-lift"
                >
                    {item.entry.image && (
                        <div className="relative w-full">
                            <Image
                                src={item.entry.image}
                                alt={item.entry.title}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-lg">{item.entry.title}</h3>
                                <p className="text-white/80 text-sm">{item.entry.event} • {item.entry.date}</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
