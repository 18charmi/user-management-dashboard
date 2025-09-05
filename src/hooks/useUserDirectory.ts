import { useMemo, useState } from "react";
import { getUsers } from "../api/userApi";
import type { User } from "../types";
import { useAxios } from "./useAxios";


export function useUserDirectory(pageSize: number = 5) {
  const { data: users, loading, error } = useAxios<User[]>(getUsers);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

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

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  return {
    users: paginatedUsers,
    loading,
    error,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
  };
}
