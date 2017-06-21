import * as restify from 'restify';

export default class RouteController {
  public get(req: any, res: any, next: any) {
    console.info('Getting route');
    res.json(200, 'route');
    return next();
  }
}
