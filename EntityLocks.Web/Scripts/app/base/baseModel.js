define([], function () {
    function BaseModel() {
        this.id = null;
    };

    BaseModel.prototype.extend = function (properties) {
        return $.extend(this, properties);
    };

    var instance = new BaseModel();
    return instance;
});