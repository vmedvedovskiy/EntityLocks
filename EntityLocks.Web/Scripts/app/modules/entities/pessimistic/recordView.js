define(['app/common/enums', 'app/modules/entities/base/baseRow'], function (Enums, BaseRow) {

    var recordView =
        '<tr>\
            <td>\
                <button class="btn btn-primary btn-xs" edit >Edit</button>\
                <button class="btn btn-danger btn-xs" delete >Delete</button>\
            </td>\
            <td data-bind="name" />\
            <td data-bind="additionalInfo" />\
            <td data-bind="lockedBy" />\
        </tr>'

    return function (model) {
        return $$(new BaseRow(model, recordView), {
            controller: {
                create: function () {
                    this.controller.updateRowControls();
                },

                update: function (data) {
                    this.model.set(data);
                    this.controller.updateRowControls();
                },

                updateRowControls: function () {
                    if (this.controller.isLocked(this.model.get())) {
                        this.view.$('button[delete]').hide();
                        this.view.$('button[edit]').html('View');
                    } else {
                        this.view.$('button[delete]').show();
                        this.view.$('button[edit]').html('Edit');
                    }
                },

                'click button[edit]': function () {
                    if (!this.controller.isLocked(this.model.get())) {
                        this.controller.showEditView();
                    } else {
                        this.controller.showDisplayView();
                    }
                },

                isLocked: function (row) {
                    var result = row.hasOwnProperty('lockedBy')
                        && row.lockedBy !== ''
                        && row.lockedBy !== null
                        && row.lockedBy !== "";
                    return result;
                },

                showDisplayView: function () {
                    this.trigger(Enums.event.display, this.model.get());
                }
            }
        })
    }
})