import { useEffect, useState, useCallback } from "react";
import { AxiosError, type AxiosResponse } from "axios";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useAxios<T = unknown>(
  apiFn: () => Promise<AxiosResponse<T>>
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const res = await apiFn();
      setState({ data: res.data, loading: false, error: null });
    } catch (err) {
      const axiosError = err as AxiosError;
      setState({
        data: null,
        loading: false,
        error:
          axiosError.response?.statusText ||
          axiosError.message ||
          "Error fetching data",
      });
    }
  }, [apiFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
