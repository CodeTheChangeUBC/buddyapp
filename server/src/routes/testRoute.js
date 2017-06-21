import RouteController from '../controllers/RouteController';
function testRoute(server) {
    var controller = new RouteController();
    server.get('/test', controller.get);
}
//# sourceMappingURL=testRoute.js.map