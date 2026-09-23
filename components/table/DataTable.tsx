"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export type TableRowContext<TData> = { index: number; original: TData };

export type ColumnDef<TData> = {
  id?: string;
  accessorKey?: keyof TData;
  header: ReactNode | (() => ReactNode);
  cell?: (context: { row: TableRowContext<TData> }) => ReactNode;
};

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

const PAGE_SIZE = 10;

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const rows = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount - 1));
  }, [pageCount]);

  return (
    <div className="data-table">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-dark-200 text-light-200">
            <tr className="border-b border-dark-400">
              {columns.map((column, index) => (
                <th key={column.id ?? String(column.accessorKey ?? index)} className="h-12 px-4 font-medium">
                  {typeof column.header === "function" ? column.header() : column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((record, rowIndex) => {
              const absoluteIndex = page * PAGE_SIZE + rowIndex;
              const row = { index: absoluteIndex, original: record };
              return (
                <tr key={absoluteIndex} className="border-b border-dark-400 text-light-200">
                  {columns.map((column, columnIndex) => (
                    <td key={column.id ?? String(column.accessorKey ?? columnIndex)} className="p-4">
                      {column.cell ? column.cell({ row }) : column.accessorKey ? String(record[column.accessorKey] ?? "") : null}
                    </td>
                  ))}
                </tr>
              );
            }) : (
              <tr><td colSpan={columns.length} className="h-24 text-center">No results.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-actions">
        <Button variant="outline" size="sm" onClick={() => setPage((value) => value - 1)} disabled={page === 0} className="shad-gray-btn">
          <Image src="/assets/icons/arrow.svg" width={24} height={24} alt="Previous page" />
        </Button>
        <span className="text-sm text-dark-700">Page {page + 1} of {pageCount}</span>
        <Button variant="outline" size="sm" onClick={() => setPage((value) => value + 1)} disabled={page + 1 >= pageCount} className="shad-gray-btn">
          <Image src="/assets/icons/arrow.svg" width={24} height={24} alt="Next page" className="rotate-180" />
        </Button>
      </div>
    </div>
  );
}
