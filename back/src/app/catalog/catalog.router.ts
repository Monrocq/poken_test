import { Request, Response, Router } from 'express';
import { CATALOG_ENDPOINT, CATALOG_LENGTH, CONTENT_ENDPOINT } from '../../constants/endpoints';
import { Catalog } from './catalog.model';

export const router: Router = Router();

router.get(CATALOG_ENDPOINT+'/', (req: Request, res: Response) => {
  let videos: Catalog[] = [];
  const {from, to} = req.query;
  if (parseInt(from as string) >= CATALOG_LENGTH) return res.status(200).json([])
  for(let i = parseInt(from as string || '1'); i <= parseInt(to as string || '6') && i <= CATALOG_LENGTH; i++) {
    videos.push({
      id: i,
      title: `Vidéo${i}`,
      thumbnail: `${CONTENT_ENDPOINT}/thumbnail`,
      extract: `${CONTENT_ENDPOINT}/extract`,
      video: `${CONTENT_ENDPOINT}/video`
    });
  }
  res.status(200).json(videos);
})

router.get(CATALOG_ENDPOINT+'/length', (req: Request, res: Response) => {
  res.status(200).json(CATALOG_LENGTH)
})

router.get(CATALOG_ENDPOINT+'/search', (req: Request, res: Response) => {
  const {keyword} = req.query
  const index = parseInt(keyword as string)
  if (!(index > 0) || index > 100) return res.status(200).json([]) 
  return res.status(200).json([{
    id: keyword,
    title: `Vidéo${keyword}`,
    thumbnail: `${CONTENT_ENDPOINT}/thumbnail`,
    extract: `${CONTENT_ENDPOINT}/extract`,
    video: `${CONTENT_ENDPOINT}/video`
  }])
})