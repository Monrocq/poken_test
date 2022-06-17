import {BACK_URL} from "./constants";

export async function getVideos(from = 1, to = 6) {
  const response = await fetch(`${BACK_URL}/catalog?from=${from}&to=${to}`)
  return response.json()
}

