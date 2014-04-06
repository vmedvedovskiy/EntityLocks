define(['app/modules/server/requestManager', 'app/common/Enums'],
    function (BaseRequestManager, Enums) {
    var instance = new BaseRequestManager('pessimisticEntity');

    instance.lock = function (callback, errback, id) {
        // no time to redesing requestManager :(
        instance.sendQuery(Enums.query.GET, callback, errback, ['lock', id].join('/'));
    };

    // use PUT query to unlock - it does right the thing we needed
    instance.unlock = function (callback, errback, id, entity) {
        // no time to redesing requestManager :(
        instance.save(callback, errback, id, entity);
    };

    return instance;
});