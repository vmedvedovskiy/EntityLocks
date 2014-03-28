define(['app/modules/main/mainModel', 'app/modules/main/mainController'], function (appModel, appController) {

    var mainHTML = '<div class="container body-content">\
        <div class="navbar navbar-inverse navbar-fixed-top">\
            <div class="container">\
                <div class="navbar-header">\
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\
                        <span class="icon-bar"></span>\
                        <span class="icon-bar"></span>\
                        <span class="icon-bar"></span>\
                    </button>\
                    <a href="#" class="navbar-brand">Plarium test app</a>\
                </div>\
                <div>\
                    <ul class="nav navbar-nav">\
                        <li><a href="#">Сущности с оптимистической блокировкой</a></li>\
                        <li><a href="#">Сущности с пессимистической блокировкой</a></li>\
                    </ul>\
                    <ul class="nav navbar-nav navbar-right" data-bind="with: user">\
                        <li>\
                            <span class="navbar-text nofloat">Здравствуйте, <a href="#" class="navbar-link"></a>!</span>\
                        </li>\
                        <li><a href="#">Выход</a></li>\
                    </ul>\
                </div>\
            </div>\
        </div>\
        <div class="content"></div>\
        <hr />\
        <footer>\
            <p>&copy; 2014 – приложение ASP.NET</p>\
        </footer>\
    </div>'


    return $$({
        model: appModel,
        view: {
            format: mainHTML
        },
        controller: appController
    });
})