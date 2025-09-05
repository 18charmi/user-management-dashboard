import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Search } from "lucide-react";

function SearchBar({ debounceTimeout = 500, onSearch, setSearching }: {
    debounceTimeout?: number
    onSearch: (value: string) => void
    setSearching: (value: boolean) => void
}) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, debounceTimeout);

    useEffect(() => {
        onSearch(debouncedQuery);
        setSearching(false)
    }, [debouncedQuery]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearching(true)
        setQuery(e.target.value);
    }
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
                type="search"
                placeholder="Search by name or email..."
                value={query}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    )
}

export default SearchBar;
