import { useEffect, useState } from "react";

type FetchResult<T> = {
  data: T | null;
  error: any | null;
  loading: boolean;
};

export function useFetch<T>(apiPath: string, fetcher: (apiPath: string) => Promise<T>): FetchResult<T> {
  const [result, setResult] = useState<FetchResult<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    setResult(() => ({
      data: null,
      error: null,
      loading: true,
    }));

    const promise = fetcher(apiPath);

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data,
        loading: false,
      }));
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        loading: false,
      }));
    });
  }, [apiPath, fetcher]);

  return result;
}
