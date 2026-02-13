'use client';

import { useEffect, useState } from 'react';
import {
    CheckCircle2,
    XCircle,
    Loader2,
    Database,
    Server,
    Sparkles,
    ArrowLeft
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface HealthStatus {
    backend: boolean;
    database: boolean;
    ai: boolean;
    databaseError?: string;
    aiError?: string;
}

export default function StatusPage() {
    const [status, setStatus] = useState<HealthStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch('/api/health');
                const data = await res.json();
                setStatus(data);
            } catch {
                setStatus({ backend: true, database: false, ai: false });
            } finally {
                setLoading(false);
            }
        };
        checkHealth();
    }, []);

    const StatusItem = ({
        name,
        isActive,
        icon: Icon,
        details,
    }: {
        name: string;
        isActive: boolean;
        icon: LucideIcon;
        details?: string;
    }) => (
        <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-500">
                        {isActive ? 'All systems operational' : 'Experiencing issues'}
                    </p>
                    {!isActive && details ? (
                        <p className="text-xs text-red-500 mt-1 break-words">{details}</p>
                    ) : null}
                </div>
            </div>
            {isActive ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
                <XCircle className="w-6 h-6 text-red-500" />
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
            <div className="w-full max-w-2xl">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/" className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200 group">
                        <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900">System Health</h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 text-gray-400">
                        <Loader2 className="w-12 h-12 animate-spin mb-4" />
                        <p>Performing diagnostic check...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <StatusItem name="Backend Server" isActive={status?.backend ?? false} icon={Server} />
                        <StatusItem
                            name="Database (PostgreSQL)"
                            isActive={status?.database ?? false}
                            icon={Database}
                            details={status?.databaseError}
                        />
                        <StatusItem
                            name="OpenRouter API"
                            isActive={status?.ai ?? false}
                            icon={Sparkles}
                            details={status?.aiError}
                        />

                        {(status?.backend && status?.database && status?.ai) ? (
                            <div className="mt-12 p-8 bg-blue-600 rounded-3xl text-white">
                                <h2 className="text-xl font-bold mb-2">Everything looks good!</h2>
                                <p className="text-blue-100 text-sm">
                                    The CSV Insights Dashboard is fully operational. All core systems are communicating without any detected latency or errors.
                                </p>
                            </div>
                        ) : (
                            <div className="mt-12 p-8 bg-amber-50 rounded-3xl text-amber-900 border border-amber-100">
                                <h2 className="text-xl font-bold mb-2">Some systems need attention</h2>
                                <p className="text-amber-700 text-sm">
                                    If you&apos;re running locally, make sure your `.env` has `DATABASE_URL` and `OPENROUTER_API_KEY`, then restart the dev server.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
