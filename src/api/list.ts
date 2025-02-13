import { Document } from "../utils/document";
import { useDefaultHeaders } from "./headers";
import fetch from "node-fetch";

type ApiResponse = {
  count: number;
  nextPageCursor?: string;
  results: Document[];
};

export async function list(location: Document["location"], cursor?: string) {
  const readerAPI = `https://readwise.io/api/v3/list?${new URLSearchParams({
    location,
    ...(cursor ? { pageCursor: cursor } : {}),
  }).toString()}`;

  const headers = useDefaultHeaders();

  const response = await fetch(readerAPI, {
    method: "GET",
    headers: headers,
  });

  return (await response.json()) as ApiResponse;
}
