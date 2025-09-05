function Pagination({ page, setPage, totalPages }: { page: number, setPage: (v: number) => void, totalPages: number }) {

    if(totalPages === 0) return <></> 
    return <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
        </button>
        <span>
            Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
        </button>
    </div>
}
export default Pagination;