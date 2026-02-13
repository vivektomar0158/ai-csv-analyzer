'use client';

import React from 'react';
import type { CsvRow } from '@/lib/types';

interface DataTableProps {
    data: CsvRow[];
}

export default function DataTable({ data }: DataTableProps) {
    if (!data || data.length === 0) return null;

    const headers = Object.keys(data[0]);

    return (
        <div className="w-full overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-6 py-4 font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, 10).map((row, i) => (
                        <tr
                            key={i}
                            className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            {headers.map((header) => (
                                <td key={`${i}-${header}`} className="px-6 py-4 whitespace-nowrap">
                                    {String(row[header] ?? '')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length > 10 && (
                <div className="p-4 bg-gray-50 text-center text-gray-400 text-xs italic">
                    Showing first 10 rows of {data.length} total rows
                </div>
            )}
        </div>
    );
}
