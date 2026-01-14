'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
    slug: string;
    entry: {
        title: string;
        date: string | null;
        status: 'Upcoming' | 'Completed';
    };
}

export function EventCalendar({ events }: { events: Event[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            if (!event.entry.date) return false;
            const eventDate = new Date(event.entry.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear();
        });
    };

    return (
        <div className="bg-card rounded-2xl border shadow-premium p-6 mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-secondary rounded-full transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-secondary rounded-full transition-colors">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-sm font-medium text-muted-foreground py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const hasEvents = dayEvents.length > 0;
                    const isToday = new Date().getDate() === day &&
                        new Date().getMonth() === currentDate.getMonth() &&
                        new Date().getFullYear() === currentDate.getFullYear();

                    return (
                        <div
                            key={day}
                            className={`
                                min-h-[80px] p-2 rounded-xl border transition-colors relative group
                                ${isToday ? 'bg-primary/5 border-primary/20' : 'hover:bg-secondary/50'}
                                ${hasEvents ? 'cursor-pointer' : ''}
                            `}
                        >
                            <span className={`
                                text-sm font-medium inline-block w-6 h-6 text-center leading-6 rounded-full
                                ${isToday ? 'bg-primary text-white' : 'text-muted-foreground'}
                            `}>
                                {day}
                            </span>
                            {hasEvents && (
                                <div className="mt-1 space-y-1">
                                    {dayEvents.map(event => (
                                        <motion.div
                                            key={event.slug}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-[10px] truncate px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium"
                                            title={event.entry.title}
                                        >
                                            {event.entry.title}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
