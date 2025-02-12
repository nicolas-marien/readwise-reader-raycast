import { Article } from "../utils/article";
import { useDefaultHeaders } from "./headers";
import fetch from "node-fetch";

type ApiResponse = {
  count: number;
  nextPageCursor: string;
  results: Article[];
};

export async function list(location: Article["location"] = "new") {
  const readerAPI = `https://readwise.io/api/v3/list?location=${location}&category=article`;

  const headers = useDefaultHeaders();

  const response = await fetch(readerAPI, {
    method: "GET",
    headers: headers,
  });

  return (await response.json()) as ApiResponse;
}
