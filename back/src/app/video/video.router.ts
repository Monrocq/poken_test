import { Request, Response, Router } from 'express';
import path from 'path'
import { CONTENT_ENDPOINT, VIDEO_ENDPOINT } from '../../constants/endpoints';
import { Video } from './video.model';
import { LoremIpsum } from 'lorem-ipsum'
import {getVideoDurationInSeconds} from 'get-video-duration'
import { cancelDislike, cancelLike, checkDislike, checkLike, dislike, handleCookies, like } from './video.handler';

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

router.get(VIDEO_ENDPOINT+'/like/add', async (req: Request, res: Response) => {
  const {id, user} = req.query
  return res.status(200).json(like(id as string, user as string))
})

router.get(VIDEO_ENDPOINT+'/like/remove', async (req: Request, res: Response) => {
  const {id, user} = req.query
  return res.status(200).json(cancelLike(id as string, user as string))
})

router.get(VIDEO_ENDPOINT+'/dislike/add', async (req: Request, res: Response) => {
  const {id, user} = req.query
  return res.status(200).json(dislike(id as string, user as string))
})

router.get(VIDEO_ENDPOINT+'/dislike/remove', async (req: Request, res: Response) => {
  const {id, user} = req.query
  return res.status(200).json(cancelDislike(id as string, user as string))
})

router.get(VIDEO_ENDPOINT+'/like/check', async (req: Request, res: Response) => {
  const {id, user} = req.query
  return res.status(200).json(checkLike(id as string, user as string))
})

router.get(VIDEO_ENDPOINT+'/dislike/check', async (req: Request, res: Response)=> {
  const {id, user} = req.query
  return res.status(200).json(checkDislike(id as string, user as string))
})