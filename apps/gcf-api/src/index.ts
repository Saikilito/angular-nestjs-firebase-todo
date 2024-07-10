import * as functions from 'firebase-functions';

import routes from './routes';
import { makeExpressApp } from './core';

const app = makeExpressApp(routes);
export const api = functions.https.onRequest(app);
