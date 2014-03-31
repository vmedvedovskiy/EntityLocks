define(['app/modules/routes', 'app/modules/entities/optimistic/listView', 'app/modules/registration/registrationView'],
    function (Routes, OptimisticList, RegistrationView) {
    var ctrlr = {
        'create': function () {
            this.controller.initRoutes();
            Routes.navigateToModule('optimisticList');
        },
        initRoutes: function() {
            Routes.add('optimisticList', function () {
                this.append(new OptimisticList(), 'div.content');
            }.bind(this));

            Routes.add('registration', function () {
                this.append(new RegistrationView(), 'div.content');
            }.bind(this));
        }
    };

    return ctrlr;
})