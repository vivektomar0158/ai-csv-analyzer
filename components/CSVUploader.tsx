'use client';

import React, { useCallback, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import Papa from 'papaparse';
import type { CsvRow } from '@/lib/types';

interface CSVUploaderProps {
    onDataLoaded: (data: CsvRow[], filename: string) => void;
}

export default function CSVUploader({ onDataLoaded }: CSVUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = useCallback((file: File) => {
        if (!file.name.endsWith('.csv')) {
            setError('Please upload a valid CSV file.');
            return;
        }

        setError(null);
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                onDataLoaded(results.data as CsvRow[], file.name);
            },
            error: (err) => {
                setError(`Error parsing CSV: ${err.message}`);
            },
        });
    }, [onDataLoaded]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'}`}
            >
                <input
                    type="file"
                    accept=".csv"
                    onChange={onFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Upload CSV File
                </h3>
                <p className="text-gray-500 text-center mb-4">
                    Drag and drop your CSV file here, or click to browse
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>Supports standard CSV formats</span>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2">
                    <X className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                </div>
            )}
        </div>
    );
}
