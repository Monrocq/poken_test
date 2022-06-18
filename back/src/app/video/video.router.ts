import { Request, Response, Router } from 'express';
import { CONTENT_ENDPOINT, VIDEO_ENDPOINT } from '../../constants/endpoint';
import { Video } from './video.model';
import { LoremIpsum } from 'lorem-ipsum'

export const router: Router = Router();

router.get(VIDEO_ENDPOINT+'/', (req: Request, res: Response) => {
  const {id} = req.query;
  const video: Video = {
    id: parseInt(id as string),
    title: `Vidéo${id}`,
    thumbnail: `${CONTENT_ENDPOINT}/thumbnail`,
    extract: `${CONTENT_ENDPOINT}/extract`,
    video: `${CONTENT_ENDPOINT}/video`,
    description: (new LoremIpsum()).generateSentences(5)
  }
  res.status(200).json(video);
})