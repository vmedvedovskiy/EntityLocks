define(['app/modules/server/optimisticRequestManager',
    'app/modules/entities/optimistic/conflictEditView',
    'app/modules/entities/optimistic/simpleEditView'],
    function (requestManager, resolveConflictControl, simpleViewControl) {

        var editViewTemplate =
    '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">\
        <div class="modal-dialog modal-sm">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">Edit</h4>\
                </div>\
                <div class="modal-body"></div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-primary" save>Save</button>\
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>\
                    </div>\
                </div>\
            </div>\
        </div>';

        var containerSelector = 'div.modal-body';

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
                            this.controller.update();
                        }
                    },

                    create: function() {
                        this.controller.createSimpleView();
                    },

                    showModal: function (closeCallback) {
                        this.controller.updateTitle();
                        this.view.$().modal();
                        this._closeCallback = closeCallback;
                    },

                    hideModal: function(responce) {
                        this.view.$().modal('hide');
                        this._closeCallback(responce);
                    },
              
                    new: function () {
                        requestManager.new(function (responce) {
                            this.controller.hideModal(responce);
                        }.bind(this), null, this.model.get());
                    },

                    update: function () {
                        requestManager.save(function (responce) {
                                this.controller.createSimpleView();
                                this.controller.hideModal(responce);
                            }.bind(this), 
                            function (error) {
                                if (error.status === 409) {
                                    this.view.$(containerSelector).empty();
                                    this.controller.createResolveConflictControl(error.responseJSON.message);
                                }
                            }.bind(this), this.model.get('id'), this.model.get());
                    },

                    createResolveConflictControl: function (title) {
                        this.controller.setTitle(title);
                        if (!this.resolveConflictControl) {
                            this.resolveConflictControl = new resolveConflictControl(this.model.get());
                        }

                        this.resolveConflictControl.bind('loaded', function () {
                            this.model.set({ version: this.resolveConflictControl.model.get('version') });
                            this.controller.resetView();
                            this.append(this.resolveConflictControl, containerSelector);
                            this.controller.fullUpdate();
                        }.bind(this));
                    },

                    createSimpleView: function () {
                        if (!this.simpleEditView) {
                            this.simpleEditView = new simpleViewControl();
                        }

                        this.controller.resetView();
                        this.append(this.simpleEditView, containerSelector);
                        this.controller.fullUpdate();
                    },

                    fullUpdate: function() {
                        // update bindings - replace references from nodes of added control to result model
                        this.view.bindings();
                        this.view.sync();
                    },

                    resetView: function() {
                        this.each(function () {
                            this.destroy();
                        })
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