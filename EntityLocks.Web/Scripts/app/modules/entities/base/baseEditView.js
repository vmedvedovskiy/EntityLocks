define(['app/modules/entities/base/baseModalView'],
    function (baseModalView) {

        var editViewTemplate =
    '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">\
        <div class="modal-dialog modal-sm">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">Edit</h4>\
                </div>\
                <div class="modal-body">\
                </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-primary" save>Save</button>\
                        <button type="button" class="btn btn-danger" close>Cancel</button>\
                    </div>\
                </div>\
            </div>\
        </div>';

        return function (requestManager) {
            return $$(baseModalView, {
                model: {},
                view: {
                    containerSelector: 'div.modal-body', 
                    format: editViewTemplate
                },
                controller: {
                    create: function() {
                        if (this.view.customFormat) {
                            this.view.$(this.view.containerSelector)
                                .append($(this.view.customFormat));
                        }

                        this.controller.createInternal();

                        this.view.bindings();
                        this.view.sync();
                    },

                    createInternal: function() {

                    },

                    'click button[save]': function () {
                        this.controller.save();
                    },

                    'click button[close]': function () {
                        this.controller.cancel();
                    },

                    save: function () {
                        var id = this.model.get('id');
                        if (id === undefined || id === null || id === '') {
                            this.controller.new();
                        } else {
                            this.controller.update();
                        }
                    },

                    new: function () {
                        requestManager.new(function (responce) {
                            this.model.set({ id: responce });
                            this.controller.close();
                        }.bind(this), null, this.model.get());
                    },

                    update: function () {
                        requestManager.save(function (responce) {
                            this.controller.close();
                        }.bind(this), null, this.model.get('id'), this.model.get())
                    },

                    showModal: function (model) {
                        this.model.set(model);
                        this.controller.showModalInternal(model);
                        this.controller.updateTitle();
                        this.view.$().modal();
                    },

                    showModalInternal: function(model) {

                    },

                    setTitle: function (title) {
                        this.view.$('h4.modal-title').html(title);
                    },

                    updateTitle: function () {
                        this.controller.setTitle(this.model.get('id') === undefined ? 'New' : 'Edit');
                    }
                }
            });
        }
    });