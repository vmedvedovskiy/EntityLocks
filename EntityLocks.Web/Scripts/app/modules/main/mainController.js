define(['app/modules/routes',
    'app/modules/EventEmitter',
    'app/common/enums',
    'app/modules/entities/optimistic/listView',
    'app/modules/entities/pessimistic/listView',
    'app/modules/registration/registrationView',
    'app/modules/registration/loginView',
    'app/modules/home/homeView',
    'app/modules/server/loginRequestManager'],
    function (Routes, EventEmitter, Enums, OptimisticList, PessimisticList,
        RegistrationView, LoginView, HomeView, LoginProvider) {
    var ctrlr = {
        'create': function () {
            this.controller.initRoutes();
            EventEmitter.bind(Enums.event.navigate, function (path) {
                Routes.navigateToModule(path);
            }.bind(this));

            LoginProvider.getUserInfo(function (responce) {
                this.model.set({ userName: responce.userName });
                EventEmitter.emit(Enums.event.navigate, Enums.module.home);
            }.bind(this),
            function (error) {
                EventEmitter.emit(Enums.event.navigate, Enums.module.login);
            }.bind(this));

        },
        initRoutes: function() {
            this.controller.addRoute(Enums.module.optimisticList, OptimisticList);
            this.controller.addRoute(Enums.module.pessimisticList, PessimisticList);
            this.controller.addRoute(Enums.module.registration, RegistrationView);
            this.controller.addRoute(Enums.module.login, LoginView);
            this.controller.addRoute(Enums.module.home, HomeView);
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

        'click a[module]': function (event) {
            EventEmitter.emit(Enums.event.navigate, event.target.getAttribute('module'));
        },

        'click a[logout]': function () {
            this.model.reset();
            LoginProvider.logout(function (responce) {
                EventEmitter.emit(Enums.event.navigate, Enums.module.login);
            }.bind(this),
            function (error) {
                EventEmitter.emit(Enums.event.navigate, Enums.module.login);
            }.bind(this));
        }

    };

    return ctrlr;
})