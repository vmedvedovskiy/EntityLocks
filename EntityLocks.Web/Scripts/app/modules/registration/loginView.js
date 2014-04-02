define(['app/modules/server/loginRequestManager', 'app/modules/EventEmitter', 'app/common/enums'],
    function (requestManager, EventEmitter, Enums) {
    var loginHtml =
        '<h2>Log in</h2>\
        <div class="row" style="width:500px">\
            <center class="">\
                <form class="form-horizontal" role="form">\
                    <h4>Use local account.</h4>\
                    <hr />\
                    <div class="form-group">\
                        <label for="LoginUserName" class="col-md-2 control-label">User name</label>\
                        <div class="col-md-10">\
                            <input type="text" id="LoginUserName" class="form-control" data-bind="userName" />\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <label for="LoginPassword" class="col-md-2 control-label">Password</label>\
                        <div class="col-md-10">\
                            <input type="password" id="LoginPassword" class="form-control" data-bind="password" />\
                        </div>\
                    </div>\
                    <div class="form-group">\
                        <div class="col-md-offset-2 col-md-10">\
                            <button type="button" class="btn btn-default" login>Log in</button>\
                        </div>\
                    </div>\
                    <p><a module="registration">Register</a>, if you do not have an account.</p>\
                </form>\
            </center>\
        </div>';

    return function () {
        return $$({
            model: {
                userName: '',
                password: ''
            },
            view: {
                format: loginHtml
            },
            controller: {
                'click a[module=registration]': function (event) {
                    EventEmitter.emit(Enums.event.navigate, Enums.module.registration);
                },

                'click button[login]': function () {
                    if (!this.controller.validate()) {
                        return;
                    }

                    var hash = CryptoJS.SHA256(this.model.get('password'))
                        .toString(CryptoJS.enc.Hex),
                        userDto = {};

                    userDto.login = this.model.get('userName');
                    userDto.password = hash;

                    requestManager.login(function (responce) {
                        EventEmitter.emit(Enums.event.navigate, Enums.module.home);
                    }.bind(this), function (error) {

                    }.bind(this), userDto);
                },

                validate: function () {
                    return true;
                }
            }
        })
    }
});