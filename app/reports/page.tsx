'use client';

import { useEffect, useState } from 'react';
import {
    FileText,
    Clock,
    ChevronRight,
    Download,
    Copy,
    Calendar,
    Search,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Report {
    id: number;
    filename: string;
    insights: string;
    timestamp: string;
}

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    useEffect(() => {
        fetch('/api/reports')
            .then(res => res.json())
            .then(data => {
                setReports(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load reports', err);
                setLoading(false);
            });
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Report copied to clipboard!');
    };

    const downloadReport = (report: Report) => {
        const element = document.createElement("a");
        const file = new Blob([report.insights], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = `report-${report.filename}-${new Date().toLocaleDateString()}.md`;
        document.body.appendChild(element);
        element.click();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200 group">
                        <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Historical Reports</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* List Section */}
                    <div className="lg:col-span-4 space-y-4">
                        {reports.length === 0 ? (
                            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-400">
                                <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>No reports generated yet</p>
                                <Link href="/" className="text-blue-600 text-sm mt-2 block hover:underline">
                                    Go generate one →
                                </Link>
                            </div>
                        ) : (
                            reports.map((report) => (
                                <button
                                    key={report.id}
                                    onClick={() => setSelectedReport(report)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                    ${selectedReport?.id === report.id
                                            ? 'bg-blue-50 border-blue-200 shadow-sm shadow-blue-100/50'
                                            : 'bg-white border-gray-100 hover:border-blue-100 hover:shadow-md hover:shadow-gray-200/50'}`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="p-2 bg-gray-50 rounded-lg">
                                            <FileText className={`w-5 h-5 ${selectedReport?.id === report.id ? 'text-blue-500' : 'text-gray-400'}`} />
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 truncate mb-1">{report.filename}</h3>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(report.timestamp).toLocaleString()}</span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="lg:col-span-8">
                        {selectedReport ? (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedReport.filename}</h2>
                                        <p className="text-xs text-gray-400 mt-1">
                                            ID: {selectedReport.id} • {new Date(selectedReport.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copyToClipboard(selectedReport.insights)}
                                            className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-500 hover:text-blue-600"
                                            title="Copy to Clipboard"
                                        >
                                            <Copy className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => downloadReport(selectedReport)}
                                            className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-500 hover:text-green-600"
                                            title="Download as Markdown"
                                        >
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 overflow-y-auto prose prose-blue max-w-none">
                                    {/* Note: In a real app we'd use ReactMarkdown here too */}
                                    <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                                        {selectedReport.insights}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[500px] flex flex-col items-center justify-center text-gray-400 bg-gray-100/50 border-2 border-dashed border-gray-200 rounded-3xl">
                                <Search className="w-16 h-16 opacity-10 mb-4" />
                                <p>Select a report to view insights</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
