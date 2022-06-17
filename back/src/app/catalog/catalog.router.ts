import { Request, Response, Router } from 'express';
import { CATALOG_ENDPOINT, CONTENT_ENDPOINT } from '../../constants/endpoint';

export const router: Router = Router();

router.get(CATALOG_ENDPOINT+'/', (req: Request, res: Response) => {
  let videos: Object[] = [];
  for(let i = 0; i < 50; i++) {
    videos.push({
      title: `Vidéo${i}`,
      thumbnail: `${CONTENT_ENDPOINT}/thumbnail`,
      extract: `${CONTENT_ENDPOINT}/extract`,
      video: `${CONTENT_ENDPOINT}/video`
    });
  }
  res.status(200).json(videos);
})