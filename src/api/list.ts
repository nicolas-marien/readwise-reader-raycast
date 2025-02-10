import { useDefaultHeaders } from "./headers";
import fetch from "node-fetch";

export async function list(location = "shortlist") {
  const readerAPI = `https://readwise.io/api/v3/list?location=${location}`;

  const headers = useDefaultHeaders();

  const response = await fetch(readerAPI, {
    method: "GET",
    headers: headers,
  });

  console.log(response.status);
  return await response.json();
}
