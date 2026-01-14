'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative mb-8 max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
                type="text"
                className="block w-full p-4 pl-10 text-sm border border-input rounded-full bg-background focus:ring-primary focus:border-primary shadow-sm"
                placeholder="Search posts..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
