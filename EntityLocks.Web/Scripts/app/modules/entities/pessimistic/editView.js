define(['app/modules/server/pessimisticRequestManager',
    'app/modules/entities/pessimistic/editView'],
    function (requestManager, simpleViewControl) {

        var editViewTemplate =
    '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">\
        <div class="modal-dialog modal-sm">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">Edit</h4>\
                </div>\
                <div class="modal-body">\
                    <form role="form" class="form-horizontal">\
                        <div class="form-group">\
                            <label>Name</label>\
                            <input type="text" class="form-control" data-bind="name">\
                        </div>\
                        <div class="form-group">\
                            <label>Additional Info</label>\
                            <input type="text" class="form-control" data-bind="additionalInfo">\
                        </div>\
                        <div class="form-group">\
                            <label >Notes</label>\
                            <textarea class="form-control" data-bind="notes" />\
                        </div>\
                    </form>\
                </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-primary" save>Save</button>\
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>\
                    </div>\
                </div>\
            </div>\
        </div>';

        return function (entity) {
            return $$({
                model: entity,
                view: {
                    format: editViewTemplate
                },
                controller: {
                    'click button[save]': function () {
                        var id = this.model.get('id');
                        if (id === undefined || id === null || id === '') {
                            this.controller.new();
                        } else {
                            this.controller.update(id);
                        }
                    },

                    showModal: function (closeCallback) {
                        this.view.$().modal();
                        this._closeCallback = closeCallback;
                    },
              
                    new: function () {
                        requestManager.new(function (responce) {
                            this.view.$().modal('hide');
                            this._closeCallback(responce);
                        }.bind(this), null, this.model.get());
                    },

                    update: function (id) {
                        requestManager.save(function (responce) {
                                this.controller.resetView();
                                this.view.$().modal('hide');
                                this._closeCallback(responce);
                            }.bind(this), 
                            null, id, this.model.get());
                    }
                }
            });
        }
    });