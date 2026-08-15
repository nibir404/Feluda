import clsx from "clsx";

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  className?: string;
}

export function DataTable<T>({ columns, rows, rowKey, className }: DataTableProps<T>) {
  return (
    <div className={clsx("rounded-lg hairline overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-surface hairline-b">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={clsx(
                    "text-left px-5 py-3.5 font-mono text-[10px] tracking-[0.18em] text-ink-tertiary uppercase whitespace-nowrap",
                    col.width && `w-[${col.width}]`
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={rowKey(row)}
                className={clsx(
                  "hover:bg-bg-surface/50 transition-colors",
                  i < rows.length - 1 && "hairline-b"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-5 py-4 align-top text-ink-secondary"
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}