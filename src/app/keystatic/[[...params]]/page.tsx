'use client';

import { useState, useEffect, FormEvent } from 'react';
import { makePage } from '@keystatic/next/ui/app';
import config from '../../../../keystatic.config';
import { Lock } from 'lucide-react';

const KeystaticPage = makePage(config);

// Simple password - in production, you should use environment variables and proper auth
const ADMIN_PASSWORD = '123'; // Change this to your desired password

export default function ProtectedKeystatic() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Check session storage on mount
    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('keystatic-auth');
        if (sessionAuth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
            // Store in session storage so they don't have to login again during the session
            sessionStorage.setItem('keystatic-auth', 'true');
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    // Show loading state briefly while checking session
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#D41367] via-[#7c3aed] to-[#3b82f6] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#D41367] via-[#7c3aed] to-[#3b82f6] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#D41367] to-[#7c3aed] flex items-center justify-center">
                                <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">Admin Access Only</h1>
                            <p className="text-muted-foreground">
                                Please enter the password to access the admin panel
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter admin password"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-400">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Access Admin Panel
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <a
                                href="/"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                ← Back to Website
                            </a>
                        </div>

                        <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                            <p className="text-xs text-amber-800 dark:text-amber-400">
                                <strong>For Admins:</strong> The current password is <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">123</code>.
                                You can change this in the page.tsx file (line 11).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <KeystaticPage />;
}
