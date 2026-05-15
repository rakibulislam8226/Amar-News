import express from 'express';
import cors from 'cors';

import { setupSwagger } from "./config/swagger";
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);
app.use('/api/v1', routes);

export default app;