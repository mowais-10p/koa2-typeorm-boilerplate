import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import ping from './ping';

const router = new Router();
const routes = router.routes();
const routesToExport = [routes, ping];

export default () => compose(routesToExport);
