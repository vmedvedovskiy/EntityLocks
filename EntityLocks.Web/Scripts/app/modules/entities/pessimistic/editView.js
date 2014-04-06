define(['app/modules/entities/base/baseEditView', 'app/common/Enums'],
    function (baseEditView, Enums) {

        var editViewTemplate =
            '<form role="form" class="form-horizontal">\
                <div class="form-group">\
                    <label>Name</label>\
                    <input type="text" class="form-control" data-bind="name">\
                </div>\
                <div class="form-group">\
                    <label>Additional Info</label>\
                    <input type="text" class="form-control" data-bind="additionalInfo">\
                </div>\
            </form>';

        return function (requestManager) {
            return $$(new baseEditView(requestManager), {
                model: {
                    name: '',
                    additionalInfo: ''
                },
                view: {
                    customFormat: editViewTemplate
                },
                controller: {
                    showModalInternal: function (model) {
                        // we are creating new entity
                        if (model.id === undefined) {
                            return;
                        }

                        // set lock for editing entity
                        // update it in case it has been locked somewhere else
                        requestManager.load(function (response) {
                            this.model.set(response);
                        }.bind(this), function (response) {
                            this.model.set({ lockedBy: response.responseJSON.lockedBy });
                            this.trigger(Enums.event.locked);
                            this.controller.hideModal();
                            return;
                        }.bind(this), model.id);
                    },

                    update: function () {
                        requestManager.save(function (responce) {
                            this.model.set({ lockedBy: '' });
                            this.controller.close();
                        }.bind(this), null, this.model.get('id'), this.model.get())
                    },
                }
            });
        }
    });