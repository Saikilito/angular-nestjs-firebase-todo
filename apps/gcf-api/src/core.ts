import cors from 'cors';
import helmet from 'helmet';
import express, { Application, Router } from 'express';
import { handleErrorTypeMiddleware } from './middlewares';

export const makeExpressApp = (routes: Router): Application => {
  const app = express();

  app.use(helmet());
  app.disable('x-powered-by');

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(routes);

  app.use(handleErrorTypeMiddleware);

  process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
  });

  process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
  });

  const closeSignals = ['SIGTERM', 'SIGINT', 'SIGUSR2', 'SIGQUIT'];
  closeSignals.forEach((s) =>
    process.on(s, async () => {
      process.exit(0);
    })
  );

  return app;
};
