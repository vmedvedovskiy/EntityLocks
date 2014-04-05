define(['app/common/enums'], function (Enums) {
    return function (model, format) {
        return $$({
            model: model,
            view: {
                format: format
            },
            controller: {
                update: function (data) {
                    this.model.set(data);
                },

                'click button[edit]': function () {
                    this.controller.showEditView();
                },

                'click button[delete]': function () {
                    this.controller.deleteRow();
                },

                showEditView: function () {
                    this.trigger(Enums.event.edit, this.model.get());
                },

                deleteRow: function () {
                    this.trigger(Enums.event.delete, this);
                }
            }
        })
    }
})