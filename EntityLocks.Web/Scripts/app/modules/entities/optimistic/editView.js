define(['app/modules/entities/base/baseEditView',
    'app/common/Enums'],
    function (baseEditView, Enums) {

        var template =
        '<form role="form" class="form-horizontal">\
            <div class="form-group">\
                <label >Version</label>\
                <input type="text" disabled class="form-control" data-bind="version">\
            </div>\
            <div class="form-group">\
                <label >Objects count</label>\
                <input type="text" class="form-control" data-bind="objectsCount">\
            </div>\
            <div class="form-group">\
                <label >Notes</label>\
                <textarea class="form-control" data-bind="notes" />\
            </div>\
        </form>';

        return function (requestManager) {
            return $$(new baseEditView(requestManager), {
                model: {},
                view: {
                    customFormat: template
                },
                controller: {
                    update: function () {
                        requestManager.save(function (responce) {
                            var newVersion = this.model.get('version') + 1;
                            this.model.set({ version: newVersion });
                            this.controller.close();
                        }.bind(this), 
                        function (error) {
                            if (error.status === 409) {
                                this.controller.cancel();
                                this.trigger(Enums.event.conflict);
                            }
                        }.bind(this), this.model.get('id'), this.model.get());
                    }
                }
            });
        }
    });