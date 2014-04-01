define(['app/modules/server/requestManager'], function (BaseRequestManager) {
    var instance = new BaseRequestManager('user');

    instance.login = function (callback, errback, entity) {
        instance.new(callback, errback, entity, 'login');
    };

    return instance;
});