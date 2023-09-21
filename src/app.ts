import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import listAllRoutes, { Endpoint } from 'express-list-endpoints';
import Table from 'cli-table';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middlewares/error';
import routes from './routes';
import { Data } from './interface';
import logger from './helpers/logger';
import connectDb from './config/db';
import { Env, validateEnv } from './config/index';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

(async () => {
  connectDb();
})();

const app = express();
validateEnv();
const env = Env();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//set security headers
app.use(helmet());
//Prevent xss attack
app.use(xss());
//Enable Cors
app.use(cors());
//Prevent http param pollution
app.use(hpp());

app.use('/api', routes);

app.use(ErrorMiddleware.notFound);

const allRoutes = listAllRoutes(app);

const routesList = allRoutes.map((route: Endpoint) => {
  const obj = {} as Data;
  obj[route.path] = route.methods.join(' | ');
  return obj;
});

const table = new Table();
table.push({ Endpoints: 'Methods' }, ...routesList);

logger.info(table.toString());

export { app };
