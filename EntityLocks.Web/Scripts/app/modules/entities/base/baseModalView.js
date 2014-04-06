define(['app/common/Enums'], function (Enums) {

    return $$({
        model: {},
        view: {},
        controller: {
            showModal: function (model) {
                this.model.set(model);
                this.view.$().modal();
            },

            cancel: function () {
                this.controller.hideModal();
                this.trigger(Enums.event.cancelled);
            },

            close: function () {
                this.view.$().modal('hide');
                this.trigger(Enums.event.closed);
            },

            hideModal: function () {
                this.view.$().modal('hide');
            }
        }
    });
})