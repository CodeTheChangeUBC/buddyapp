import RouteController from '../controllers/RouteController'

function testRoute(server: any) {
  let controller = new RouteController();
  server.get('/test', controller.get);
}
