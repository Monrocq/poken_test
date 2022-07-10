export let views = 0;
export let likes = 0;
export let dislikes = 0;

export const handleCookies = (id: string) => {
  views += 1;
  return {views, likes, dislikes}
}