define(['libs/router'], function (Router) {

    function Routes() {
    };

    Routes.prototype.add = function (name, callback) {
        Router.route(name, callback);
    };

    Routes.prototype.navigateToModule = function (modName) {
        Router.navigate(modName);
    };

    var instance = new Routes();
    return instance;
});