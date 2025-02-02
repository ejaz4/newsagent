import { parse } from "node-html-parser";
import { ResultType } from "../type";

export const searchWithDuckDuckGo = async (query: string) => {
  const response = await fetch(
    `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
  );

  const html = await response.text();
  const root = parse(html);

  let results: ResultType[] = [];

  const elems = root.querySelectorAll(".result");

  for (const result of elems) {
    const title = result.querySelector("a.result__a");

    const description = result.querySelector(".result__snippet");
    let url = new URL(
      `https:${title?.getAttribute("href")}` || ""
    ).searchParams.get("uddg") as string;

    url = decodeURIComponent(url);

    results.push({
      title: title?.text || "",
      description: description?.text || "",
      url: url,
    });
  }

  return results;
};
