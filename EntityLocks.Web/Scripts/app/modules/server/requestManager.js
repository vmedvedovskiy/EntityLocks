define(['app/common/error', 'app/common/enums'], function (errorHandler, Enums) {

    var serverUrl = "http://localhost:1578";
    var apiPrefix = "api";

    function RequestManager(controllerName) {
        this.controller = controllerName;
    };

    RequestManager.prototype.loadAll = function (callback, errback) {
        sendQuery.call(this, Enums.query.GET, callback, errback);
    };

    RequestManager.prototype.load = function (callback, errback, id) {
        sendQuery.call(this, Enums.query.GET, callback, errback, id);
    };

    RequestManager.prototype.save = function (callback, errback, id, entity) {
        sendQuery.call(this, Enums.query.PUT, callback, errback, id, entity);
    };

    RequestManager.prototype.new = function (callback, errback, entity) {
        sendQuery.call(this, Enums.query.POST, callback, errback, undefined, entity);
    };

    RequestManager.prototype.delete = function (callback, errback, id) {
        sendQuery.call(this, Enums.query.DELETE, callback, errback, id);
    };


    function sendQuery(method, callback, errback, parameters, data) {
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