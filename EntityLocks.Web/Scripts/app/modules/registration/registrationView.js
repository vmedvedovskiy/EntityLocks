define(['app/modules/server/registerRequestManager', 'app/modules/EventEmitter', 'app/common/enums'], function (requestManager, EventEmitter, Enums) {

    var registrationFormTemplate =
        '<div>\
            <h2>Регистрация</h2>\
            <form class="form-horizontal" role="form">\
                <hr />\
                <div class="form-group">\
                    <label for="RegisterUserName" class="col-md-2 control-label">User name</label>\
                    <div class="col-md-10">\
                        <input type="text" id="RegisterUserName" class="form-control" data-bind="login" />\
                    </div>\
                </div>\
                <div class="form-group">\
                    <label for="RegisterPassword" class="col-md-2 control-label">Password</label>\
                    <div class="col-md-10">\
                        <input type="password" id="RegisterPassword" class="form-control" data-bind="password" />\
                    </div>\
                </div>\
                <div class="form-group">\
                    <label for="RegisterConfirmPassword" class="col-md-2 control-label">Password confirmation</label>\
                    <div class="col-md-10">\
                        <input type="password" id="RegisterConfirmPassword" class="form-control" data-bind="confirmPassword" />\
                    </div>\
                </div>\
                <div class="form-group">\
                    <div class="col-md-offset-2 col-md-10">\
                        <button type="button" register class="btn btn-default" >Register</button>\
                    </div>\
                </div>\
                <p><a href="#" click="login">Login</a>, if you already have an account.</p>\
            </form>\
        </div>';

    return function () {
        return $$({
            model: {
                login: '',
                password: '',
                confirmPassword: ''
            },
            view: {
                format: registrationFormTemplate
            },
            controller: {
                'click button[register]': function () {
                    if (!this.controller.validate()) {
                        return;
                    }

                    var hash = CryptoJS.SHA256(this.model.get('password'))
                        .toString(CryptoJS.enc.Hex),
                        userDto = {};

                    userDto.login = this.model.get('login');
                    userDto.password = hash;

                    requestManager.register(function (responce) {
                        EventEmitter.emit(Enums.event.navigate, Enums.module.home);
                    }.bind(this), function (error) {

                    }.bind(this), userDto);
                },

                validate: function () {
                    return true;
                }
            },
            'a click[login]': function () {
                EventEmitter.emit(Enums.event.navigate, Enums.module.login);
            }
        });
    }
})