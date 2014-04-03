define([], function () {

        var displayViewTemplate =
    '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">\
        <div class="modal-dialog modal-sm">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">View</h4>\
                </div>\
                <div class="modal-body">\
                    <div role="form">\
                        <div class="form-group">\
                            <label>Name</label>\
                            <label disabled class="form-control" data-bind="name">\
                        </div>\
                        <div class="form-group">\
                            <label>Create date</label>\
                            <label class="form-control" data-bind="createDate">\
                        </div>\
                        <div class="form-group">\
                            <label>AdditionalInfo</label>\
                            <label class="form-control" data-bind="additionalInfo" />\
                        </div>\
                        <div class="form-group">\
                            <label>Locked by</label>\
                            <label class="form-control" data-bind="userName" />\
                        </div>\
                    </div>\
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
                showModal: function (closeCallback) {
                    this.view.$().modal();
                    this._closeCallback = closeCallback;
                }
            }
        });
    }
});