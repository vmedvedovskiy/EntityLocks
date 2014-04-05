define(['app/modules/server/pessimisticRequestManager',
    'app/modules/entities/base/baseModalView'],
    function (requestManager, baseModalView) {

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
                    </form>\
                </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-primary" save>Save</button>\
                        <button type="button" class="btn btn-danger" close>Cancel</button>\
                    </div>\
                </div>\
            </div>\
        </div>';

        return function (entity) {
            return $$(baseModalView, {
                model: entity,
                view: {
                    format: editViewTemplate
                },
                controller: {
                    'click button[save]': function () {
                        this.controller.save();
                    },

                    'click button[close]': function () {
                        this.controller.close();
                    },

                    save: function () {
                        var id = this.model.get('id');
                        if (id === undefined || id === null) {
                            requestManager.new(function (responce) {
                                this.model.set({ id: responce });
                                this.controller.close();
                            }.bind(this), null, this.model.get())
                        } else {
                            requestManager.save(function (responce) {
                                this.controller.close();
                            }.bind(this), null, id, this.model.get())
                        }
                    },

                    showModal: function () {
                        requestManager.load(function (responce) {
                            this.model.set(responce);
                            this.view.$().modal();
                        }.bind(this), null, this.model.get('id'));
                    }
                }
            });
        }
    });