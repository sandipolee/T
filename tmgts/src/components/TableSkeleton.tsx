import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";

const TableSkeleton = ({ columns, rows }: { columns: number, rows: number }) => {
  return (
    <>
      {Array(rows).fill(0).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array(columns).fill(0).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
