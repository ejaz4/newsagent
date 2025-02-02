import { useEffect, useState } from "react";
// import "../../../envConfig";

export const useSearch = (query?: string) => {
  const [searchResults, setSearchResults] = useState<
    | {
        title: string;
        description: string;
        url: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    if (!query) return;

    fetch(`${process.env.API_HOST}/api/search?query=${query}`).then((res) => {
      if (!res.ok) {
        return;
      }

      res.json().then((data) => {
        setSearchResults(data);
      });
    });
  }, [query]);

  return searchResults;
};
