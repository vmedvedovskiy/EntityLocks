define(['app/modules/server/requestManager'], function (BaseRequestManager) {
    var instance = new BaseRequestManager('optimisticEntity');
    return instance;
});