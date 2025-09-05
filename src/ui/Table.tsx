import LinearLoader from "../components/Loader";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

type TableProps<T> = {
  loading: boolean;
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => React.Key;
  emptyMessage?: string;
};

function Table<T>({
  loading,
  data,
  columns,
  keyExtractor,
  emptyMessage = "No records found.",
}: TableProps<T>) {

  return (
    <div className="overflow-x-auto rounded-lg shadow ">

      <div className="h-1 bg-gray-100">
        <LinearLoader loading={loading} />
      </div>

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
          {/* 🔹 Empty State */}
          {data.length === 0 && !loading && (
            <tr>
              <td
                colSpan={3}
                className="p-4 text-center text-gray-500 border"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
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