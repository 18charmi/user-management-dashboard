
export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => React.Key;
  emptyMessage?: string;
};

function Table<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No records found.",
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-4 py-2 text-left font-medium text-gray-700 ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="border-t hover:bg-gray-50"
            >
              {columns.map((col, i) => {
                const cell =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as React.ReactNode);

                return (
                  <td key={i} className="px-4 py-2 text-gray-800">
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;