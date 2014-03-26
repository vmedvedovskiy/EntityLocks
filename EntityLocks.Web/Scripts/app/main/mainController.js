define(['app/server/requestManager'], function (requestManager) {
    var ctrlr = {
        'create': function() {
            requestManager.sendGetQuery('optimisticEntity', function (responce) {
                console.log(responce);
            });
        }
    };

    return ctrlr;
})