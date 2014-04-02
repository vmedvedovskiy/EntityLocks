define(['app/modules/server/requestManager', 'app/common/Enums'], function (BaseRequestManager, Enums) {
    var instance = new BaseRequestManager('login');

    instance.login = function (callback, errback, entity) {
        instance.sendQuery(Enums.query.POST, callback, errback, undefined, entity);
    };

    instance.getUserInfo = function (callback, errback) {
        instance.sendQuery(Enums.query.GET, callback, errback, 'getUserInfo');
    };

    instance.logout = function (callback, errback) {
        instance.sendQuery(Enums.query.GET, callback, errback, 'logout');
    };

    return instance;
});