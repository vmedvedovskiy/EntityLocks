define([], function () {
    function Error() {

    };

    Error.prototype.onError = function (reason) {
        console.log(reason);
    };

    var instance = new Error();
    return instance;
});