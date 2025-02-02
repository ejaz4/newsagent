"use client";
import { useSearchParams } from "next/navigation";
import { useSearch } from "../libs/useSearch";
import { SearchBar } from "./searchbar";
import React, { useEffect, useState } from "react";
import { SearchResult } from "./_components/result";

const SearchPage = () => {
  const query = useSearchParams().get("query");
  const searchResults = useSearch(query || undefined);

  return (
    <div className="content topPadding">
      <SearchBar query={query || undefined} />
      {searchResults ? (
        searchResults.map((result) => (
          <SearchResult
            key={result.url}
            title={result.title}
            description={result.description}
            url={result.url}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SearchPage;
