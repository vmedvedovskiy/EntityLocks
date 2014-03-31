define(['app/modules/routes', 'app/modules/entities/optimistic/listView'], function (Routes, OptimisticList) {
    var ctrlr = {
        'create': function () {
            this.controller.initRoutes();
            Routes.navigateToModule('optimisticList');
        },
        initRoutes: function() {
            Routes.add('optimisticList', function () {
                this.append(new OptimisticList(), 'div.content');
            }.bind(this));
        }
    };

    return ctrlr;
})