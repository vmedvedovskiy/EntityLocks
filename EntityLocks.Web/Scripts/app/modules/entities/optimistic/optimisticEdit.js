define(['app/modules/server/optimisticRequestManager', 'app/modules/entities/optimistic/optimisticConflict'],
    function (requestManager, resolveConflictControl) {

        var editView =
        '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">\
          <div class="modal-dialog modal-sm">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">Edit</h4>\
                </div>\
                <div class="modal-body">\
                    <div role="form">\
                      <div class="form-group">\
                        <label for="version">Version</label>\
                        <input type="text" disabled class="form-control" data-bind="version">\
                      </div>\
                      <div class="form-group">\
                        <label for="objectsCount">Objects count</label>\
                        <input type="text" class="form-control" data-bind="objectsCount">\
                      </div>\
                      <div class="form-group">\
                        <label for="notes">Notes</label>\
                        <textarea class="form-control" data-bind="notes" />\
                      </div>\
                    </div>\
                </div>\
                <div class="modal-footer">\
                      <button type="button" class="btn btn-primary" save>Save</button>\
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>\
                </div>\
                </div>\
              </div>\
            </div>';


        return function (model) {
            return $$({
                model: model,
                view: {
                    format: editView
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

                    showModal: function (closeCallback) {
                        this.view.$().modal();
                        this._closeCallback = closeCallback;
                    },

                    update: function () {
                        requestManager.save(function (responce) {
                                this.view.$().modal('hide');
                                this._closeCallback(responce);
                            }.bind(this), 
                            function (error) {
                                if (error.status === 409) {
                                    this.view.$().modal('hide');
                                    this.controller.resolveConflict();
                                }
                            }.bind(this), this.model.get('id'), this.model.get());
                    },

                    resolveConflict: function () {
                        if (!this.resolveConflictControl) {
                            this.resolveConflictControl = new resolveConflictControl(this.model.get());
                        }

                        this.resolveConflictControl.controller.showModal();
                    },

                    new: function () {
                        requestManager.new(function (responce) {
                            this.view.$().modal('hide');
                            this._closeCallback(responce);
                        }.bind(this), null, this.model.get());
                    }
                }
            });
        }
    });