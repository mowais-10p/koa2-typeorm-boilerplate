import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as koaBodyparser from 'koa-bodyparser';
import * as cors from 'koa2-cors';
import * as jsonMiddleware from 'koa-json';
import * as staticServe from 'koa-static-server';
import * as path from 'path';
import * as Boom from 'boom';
import config from '../config';

// middlewares
import routeMiddleware from './routes/index';
import errorMiddleware from './middlewares/error';
import responseMiddleware from './middlewares/response';

const docPath = path.join(__dirname, '../doc');
const app = new Koa();

app.use(staticServe({ rootDir: docPath, rootPath: '/api/docs' }));
app.use(helmet());
app.use(
  koaBodyparser({
    onerror: (err, ctx) => {
      console.error(err);
      ctx.throw('Cannot parse body', 422);
    },
  }),
);
app.use(
  cors({
    // TODO
    // origin: ,
    // allowHeaders: [],
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  }),
);
app.use(errorMiddleware());
app.use(jsonMiddleware());
app.use(routeMiddleware());
app.use(responseMiddleware());

app.listen(config.server.port, () => {
  console.info('server started on port %d', config.server.port);
});

app.on('error', err => {
  console.error('server error', err);
});
