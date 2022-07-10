import {BACK_URL} from "./constants";

export async function getVideos(from = 1, to = 6) {
  const response = await fetch(`${BACK_URL}/catalog?from=${from}&to=${to}`)
  return response.json()
}

export async function getVideo(id) {
  const response = await fetch(`${BACK_URL}/video?id=${id}`)
  return response.json()
}

export async function getVideosLength() {
  const response = await fetch(`${BACK_URL}/catalog/length`)
  return response.json()
}

export async function searchVideos(keyword) {
  const response = await fetch(`${BACK_URL}/catalog/search?keyword=${keyword}`)
  return response.json()
}