import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

function SearchBar({ debounceTimeout = 500, onSearch }: {
    debounceTimeout?: number
    onSearch: (value: string) => void
}) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, debounceTimeout);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }
    return (
        <input placeholder="Search here..."
            type={'search'}
            value={query}
            onChange={handleChange}
        //TODO: add search icon
        />
    )
}

export default SearchBar;
