export interface Video {
  id: number;
  title: string;
  description: string;
  video: string;
  tags: string[];
  duration: string;
  views: number;
  creator: string;
  creator_at: string;
  like: number;
  dislike: number;
  comments: object[];
  thumbnail: string;
  extract: string;
}