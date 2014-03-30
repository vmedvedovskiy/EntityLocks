define(['app/modules/server/optimisticRequestManager', 'app/modules/entities/optimistic/optimisticDisplay'],
    function (requestManager, displayEntityControl) {

        var editView =
        '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">\
          <div class="modal-dialog modal-sm">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">Edit conflict</h4>\
                </div>\
                <div class="modal-body">\
                    <div role="form">\
                      <div class="row">\
                          <div class="form-group left col-md-6"></div>\
                          <div class="form-group right col-md-6"></div>\
                      </div>\
                      <div class="row">\
                          <div class="form-group col-md-12">\
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

        return function (existingModel) {
            var copy = {};
            $.extend(copy, existingModel)
            return $$({
                model: copy,
                view: {
                    format: editView
                },
                controller: {
                    create: function () {
                        var left, right
                        requestManager.load(function(responce) {
                            this.controller.initialize(responce);
                        }.bind(this), null, existingModel.id)
                    },
                    initialize: function (responce) {
                        this.model.set({ version: responce.version });
                        left = this.append(new displayEntityControl(responce), 'div.left');
                        right = this.append(new displayEntityControl(existingModel), 'div.right');
                    },
                    showModal: function () {
                        this.view.$().modal();
                    },
                }
            });
        }
    });