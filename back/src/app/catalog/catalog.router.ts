import { Request, Response, Router } from 'express';
import { CATALOG_ENDPOINT, CONTENT_ENDPOINT } from '../../constants/endpoint';
import { Catalog } from './catalog.model';

export const router: Router = Router();

router.get(CATALOG_ENDPOINT+'/', (req: Request, res: Response) => {
  let videos: object[] = [];
  const {from, to} = req.query;
  if (parseInt(to as string) >= 50) return res.status(200).json([])
  for(let i = parseInt(from as string || '1'); i <= parseInt(to as string || '6'); i++) {
    videos.push({
      title: `Vidéo${i}`,
      thumbnail: `${CONTENT_ENDPOINT}/thumbnail`,
      extract: `${CONTENT_ENDPOINT}/extract`,
      video: `${CONTENT_ENDPOINT}/video`
    });
  }
  res.status(200).json(videos);
})