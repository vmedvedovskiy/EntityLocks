﻿define(['app/modules/server/optimisticRequestManager', 'app/modules/entities/optimistic/conflictEditView', 'app/modules/entities/optimistic/simpleEditView'],
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

                    create: function() {
                        this.controller.createSimpleView();
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
                                this.controller.createSimpleView();
                                this.view.$().modal('hide');
                                this._closeCallback(responce);
                            }.bind(this), 
                            function (error) {
                                if (error.status === 409) {
                                    this.view.$('div.modal-body').empty();
                                    this.controller.createResolveConflictControl();
                                }
                            }.bind(this), id, this.model.get());
                    },

                    createResolveConflictControl: function () {
                        if (!this.resolveConflictControl) {
                            this.resolveConflictControl = new resolveConflictControl(this.model.get());
                        }

                        this.resolveConflictControl.bind('loaded', function () {
                            this.model.set({ version: this.resolveConflictControl.model.get('version') });
                        }.bind(this));

                        this.controller.resetView();
                        this.append(this.resolveConflictControl, 'div.modal-body');
                        this.controller.fullUpdate();
                    },

                    createSimpleView: function() {
                        if (!this.simpleEditView) {
                            this.simpleEditView = new simpleViewControl();
                        }

                        this.controller.resetView();
                        this.append(this.simpleEditView, 'div.modal-body');
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
                    }
                }
            });
        }
    });