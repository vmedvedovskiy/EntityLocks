define(['app/modules/server/requestManager'], function (BaseRequestManager) {
    var instance = new BaseRequestManager('user');
    return instance;
});