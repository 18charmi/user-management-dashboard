function Pagination({ page, setPage, totalPages }: { page: number, setPage: (v: number) => void, totalPages: number }) {

    if (totalPages === 0) return <></>

    return <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 cursor-pointer rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Prev
        </button>

        <span className="text-gray-700">
            Page {page} of {totalPages}
        </span>

        <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 cursor-pointer rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Next
        </button>
    </div>

}
export default Pagination;