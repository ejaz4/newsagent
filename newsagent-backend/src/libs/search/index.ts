import { searchWithDuckDuckGo } from "./providers/duckduckgo";
import { ResultType } from "./type";

const providers = [searchWithDuckDuckGo];

export const useSearch = async (query: string) => {
  let results: ResultType[] = [];

  for (const provider of providers) {
    const res = await provider(query);

    results = [...results, ...res];
  }

  return results;
};
