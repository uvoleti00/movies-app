import { getData } from "../api";
import { useState, useEffect, useCallback } from "react";

type UseFetchDataReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
};

export const useFetchData = <T>(
  endpoint: string,
  onClickEvent: boolean,
): UseFetchDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getData<T>(endpoint);
      setData(result);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (!onClickEvent) fetchData();
  }, [fetchData, onClickEvent]);

  return { data, loading, error, fetchData };
};
