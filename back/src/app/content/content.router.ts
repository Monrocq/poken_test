import { Request, Response, Router } from 'express';
import path from 'path'
import { CONTENT_ENDPOINT } from '../../constants/endpoints';

export const router: Router = Router();

router.get(CONTENT_ENDPOINT+'/thumbnail', (req: Request, res: Response) => {
  res.sendFile(path.resolve('src/public/thumbnail.png'))
})

router.get(CONTENT_ENDPOINT+'/extract', (req: Request, res: Response) => {
  res.sendFile(path.resolve('src/public/extract.gif'))
})

router.get(CONTENT_ENDPOINT+'/video', (req: Request, res: Response) => {
  res.sendFile(path.resolve('src/public/video.mp4'))
})