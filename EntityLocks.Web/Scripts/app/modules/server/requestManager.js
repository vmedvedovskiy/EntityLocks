define(['app/common/error', 'app/common/enums', 'app/modules/EventEmitter'], function (errorHandler, Enums, EventEmitter) {

    var serverUrl = "http://localhost:1578";
    var apiPrefix = "api";

    function RequestManager(controllerName) {
        this.controller = controllerName;
    };

    RequestManager.prototype.loadAll = function (callback, errback) {
        this.sendQuery(Enums.query.GET, callback, errback);
    };

    RequestManager.prototype.load = function (callback, errback, id) {
        this.sendQuery(Enums.query.GET, callback, errback, id);
    };

    RequestManager.prototype.save = function (callback, errback, id, entity) {
        this.sendQuery(Enums.query.PUT, callback, errback, id, entity);
    };

    RequestManager.prototype.new = function (callback, errback, entity, action) {
        this.sendQuery(Enums.query.POST, callback, errback, action, entity);
    };

    RequestManager.prototype.delete = function (callback, errback, id) {
        this.sendQuery(Enums.query.DELETE, callback, errback, id);
    };

    // make it public to reuse later in descendants, if needed
    RequestManager.prototype.sendQuery = function(method, callback, errback, parameters, data) {
        $.ajax({
            method: method,
            contentType: "application/json",
            data: JSON.stringify(data),
            url: [serverUrl, apiPrefix, this.controller, parameters].join('/')
        })
        .done(function (responce) {
            callback(responce);
        })
        .fail(function (error) {
            if (errback && errback !== null) {
                errback(error);
            }

            errorHandler.onError(error.message || error);
        });
    }

    return RequestManager;
});