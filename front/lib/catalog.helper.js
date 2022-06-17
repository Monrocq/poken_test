import {BACK_URL} from "./constants";

export async function getVideos() {
  const response = await fetch(`${BACK_URL}/catalog`)
  return response.json()
}

