import express from 'express';
import cors from 'cors';

import routes from './routes';
import { responseInterceptor } from './middlewares/response.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(responseInterceptor);

app.use('/api/v1', routes);

export default app;