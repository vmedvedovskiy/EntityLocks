define(['app/common/Enums'], function (Enums) {

    return $$({
        model: {},
        view: {},
        controller: {
            showModal: function () {
                this.view.$().modal();
            },

            close: function () {
                this.view.$().modal('hide');
                this.trigger(Enums.event.closed);
            }
        }
    });
})