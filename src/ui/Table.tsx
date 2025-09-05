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

      <table className="table-fixed w-full border border-gray-200 rounded-lg text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">

          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`w-1/3 p-3 text-left  ${col.className || ""}`}>
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
                className="p-4 text-center text-gray-500 "
              >
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"

            >
              {columns.map((col, i) => {
                const cell =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as React.ReactNode);

                return (
                  <td key={i}
                    className="p-4 text-left truncate whitespace-nowrap overflow-hidden">
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