import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from '../../../docs/swagger.json';
import { getErrors } from '../errors/getErrors';
import { logger } from '../providers/logger/implementations/LoggerProvider';
import responseFormatter from './middleware/responseFormatter';
import { routes } from './routes';

import '../../containers';
import '../database/prisma';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseFormatter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);
app.use(getErrors);

app.listen(3333, () => logger.info('Server is running on port 3333'));
