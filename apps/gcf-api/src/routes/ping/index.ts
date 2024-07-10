import { Router, Request, Response } from 'express';

const pingRouter = Router();

pingRouter.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

export default pingRouter;
