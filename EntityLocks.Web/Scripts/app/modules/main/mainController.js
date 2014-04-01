define(['app/modules/routes',
    'app/modules/EventEmitter',
    'app/common/enums',
    'app/modules/entities/optimistic/listView',
    'app/modules/registration/registrationView',
    'app/modules/registration/loginView'],
    function (Routes, EventEmitter, Enums, OptimisticList, RegistrationView, LoginView) {
    var ctrlr = {
        'create': function () {
            this.controller.initRoutes();
            EventEmitter.bind(Enums.event.navigate, function (path) {
                Routes.navigateToModule(path);
            }.bind(this));
            Routes.navigateToModule('login');
        },
        initRoutes: function() {
            this.controller.addRoute('optimisticList', OptimisticList);
            this.controller.addRoute('registration', RegistrationView);
            this.controller.addRoute('login', LoginView);
        },

        clearContent: function() {
            this.each(function() {
                this.destroy();
            })
        },

        addRoute: function(route, module) {
            Routes.add(route, function () {
                this.controller.clearContent();
                this.append(new module(), 'div.content');
            }.bind(this));
        },

        'click a': function (event) {
            EventEmitter.emit(Enums.event.navigate, event.target.getAttribute('module'));
        }

    };

    return ctrlr;
})