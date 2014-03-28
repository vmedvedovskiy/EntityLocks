define(['app/base/baseModel'], function (baseModel) {

    // some default values
    var model = {
        objectsCount: 0,
        notes: 'cat',
        version: 0
    };

    var optimisticModel = baseModel.extend(model);
    return optimisticModel;
})