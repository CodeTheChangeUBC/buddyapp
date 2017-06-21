var RouteController = (function () {
    function RouteController() {
    }
    RouteController.prototype.get = function (req, res, next) {
        console.info('Getting route');
        res.json(200, 'route');
        return next();
    };
    return RouteController;
}());
export default RouteController;
//# sourceMappingURL=RouteController.js.map