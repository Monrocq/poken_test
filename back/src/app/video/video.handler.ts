import { Comment } from "../comments/comments.model";

export let views: Map<string, number> = new Map;
export let likes: Map<string, string[]> = new Map;
export let dislikes: Map<string, string[]> = new Map;
export let comments: Map<string, Comment[]> = new Map;

export const handleCookies = (id: string) => {
  let view: number = views.get(id) ?? 0
  views.set(id, ++view);
  const like: string[] = likes.get(id) ?? []
  const dislike: string[] = dislikes.get(id) ?? []
  return {
    views: view, 
    likes: like.length, 
    dislikes: dislike.length
  }
}

export const like = (id: string, user: string): number => {
  let like: string[] = likes.get(id) ?? []
  if (!like.includes(user)) likes.set(id, [...like, user])
  return ++like.length
}

export const cancelLike = (id: string, user: string): number => {
  let like: string[] = likes.get(id) ?? []
  likes.set(id, like.filter(like => like !== user))
  return --like.length
}

export const dislike = (id: string, user: string): number => {
  let dislike: string[] = dislikes.get(id) ?? []
  if (!dislike.includes(user)) dislikes.set(id, [...dislike, user])
  return ++dislike.length
}

export const cancelDislike = (id: string, user: string): number => {
  let dislike: string[] = dislikes.get(id) ?? []
  dislikes.set(id, dislike.filter(dislike => dislike !== user))
  return --dislike.length
}

export const checkLike = (id: string, user: string): boolean => {
  let like: string[] = likes.get(id) ?? []
  if (like.includes(user)) return true
  return false
}

export const checkDislike = (id: string, user: string): boolean => {
  let dislike: string[] = dislikes.get(id) ?? []
  if (dislike.includes(user)) return true
  return false
}

export const comment = (id: string, user: string, text: string): Comment[] => {
  let comment: Comment[] = comments.get(id) ?? []
  comments.set(id, [...comment, {
    user,
    text,
    date: Date.now().toString()
  }]);
  return comments.get(id) || []
}