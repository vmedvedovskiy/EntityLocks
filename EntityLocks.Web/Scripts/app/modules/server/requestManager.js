define(['app/common/error', 'app/common/enums'], function (errorHandler, Enums) {

    var serverUrl = "http://localhost:1578";
    var apiPrefix = "api";

    function RequestManager() {

    };

    RequestManager.prototype.sendGetQuery = function (controller, callback, parameters) {
        sendQuery(Enums.query.GET, controller, callback, parameters);
    };


    function sendQuery(method, controller, callback, parameters) {
        $.ajax({
            method: method,
            dataType: 'json',
            url: [serverUrl, apiPrefix, controller, parameters].join('/')
        })
        .done(function (responce) {
            callback(responce);
        })
        .fail(function (error) {
            errorHandler.onError(error.message || error);
        });
    }

    var instance = new RequestManager();
    return instance;
});