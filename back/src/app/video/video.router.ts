import { Request, Response, Router } from 'express';
import path from 'path'
import { CONTENT_ENDPOINT, VIDEO_ENDPOINT } from '../../constants/endpoints';
import { Video } from './video.model';
import { LoremIpsum } from 'lorem-ipsum'
import {getVideoDurationInSeconds} from 'get-video-duration'
import { handleCookies } from './video.handler';

export const router: Router = Router();

router.get(VIDEO_ENDPOINT+'/', async (req: Request, res: Response) => {
  
  const {id} = req.query;
  const duration: number = await getVideoDurationInSeconds(path.resolve('src/public/video.mp4'));
  const {views, likes, dislikes} = handleCookies(id as string);
  const video: Video = {
    id: parseInt(id as string),
    title: `Vidéo${id}`,
    video: `${CONTENT_ENDPOINT}/video`,
    description: (new LoremIpsum()).generateSentences(5),
    tags: ["planet", "earth", "science", "space"],
    duration: duration.toString(),
    views,
    creator: "ThePlanetGuy",
    creator_at: Date.now().toString(),
    like: likes,
    dislike: dislikes,
    comments: [],
    thumbnail: `${CONTENT_ENDPOINT}/thumbnail`,
    extract: `${CONTENT_ENDPOINT}/extract`
  }
  res.status(200).json(video);
})