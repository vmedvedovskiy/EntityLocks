define(['app/modules/server/requestManager', 'app/common/Enums'], function (BaseRequestManager, Enums) {
    var instance = new BaseRequestManager('register');

    instance.register = function (callback, errback, entity) {
        instance.new(callback, errback, entity);
    };

    return instance;
});