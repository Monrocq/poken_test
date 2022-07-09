import { getCookie, hasCookie, setCookie } from 'cookies-next'


export const handleCookies = (id: string) => {
  const views: number = handleViews(id);
  const likes: number = parseInt(getCookie(`${id}-likes`) as string);
  const dislikes: number = parseInt(getCookie(`${id}-dislikes`) as string)
  return {views, likes, dislikes}
}

const handleViews = (id: string) => {
  const key: string = `${id}-views`;
  let views: number;
  if (hasCookie(key)) {
    views = parseInt(getCookie(key) as string);
    setCookie(key, views + 1)
  } else {
    views = 0
    setCookie(key, "1")
  }
  return views;
}