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

export async function likeVideo(id, user) {
  const response = await fetch(`${BACK_URL}/video/like/add?id=${id}&user=${user}`)
  return response.json();
}

export async function cancelLike(id, user) {
  const response = await fetch(`${BACK_URL}/video/like/remove?id=${id}&user=${user}`)
  return response.json();
}

export async function dislikeVideo(id, user) {
  const response = await fetch(`${BACK_URL}/video/dislike/add?id=${id}&user=${user}`)
  return response.json();
}

export async function cancelDislike(id, user) {
  const response = await fetch(`${BACK_URL}/video/dislike/remove?id=${id}&user=${user}`)
  return response.json();
}

export async function checkLike(id, user) {
  const response = await fetch(`${BACK_URL}/video/like/check?id=${id}&user=${user}`)
  return response.json();
}

export async function checkDislike(id, user) {
  const response = await fetch(`${BACK_URL}/video/dislike/check?id=${id}&user=${user}`)
  return response.json();
}

export async function commentVideo(id, user, comment) {
  const response = await fetch(`${BACK_URL}/video/comment?id=${id}&user=${user}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: comment})
  })
  return response.json()
}