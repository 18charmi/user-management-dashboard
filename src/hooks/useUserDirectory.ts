import { useMemo, useState } from "react";
import { getUsers } from "../api/userApi";
import type { User } from "../types";
import { useAxios } from "./useAxios";
import { usePagination } from "./usePagination";


export function useUserDirectory(pageSize: number = 5) {
  const { data: users, loading, error } = useAxios<User[]>(getUsers);

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!query.trim()) return users;

    const lowerQuery = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerQuery) ||
        u.email.toLowerCase().includes(lowerQuery)
    );
  }, [users, query]);

  const { page, setPage, totalPages, paginatedData } = usePagination<User>(
    filteredUsers,
    pageSize
  );

  return {
    users: paginatedData,
    loading,
    error,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
    searching,
    setSearching
  };
}
