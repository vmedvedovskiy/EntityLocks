define(['app/modules/entities/base/baseModalView'], function (baseModalView) {

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
                            <label>AdditionalInfo</label>\
                            <label class="form-control" data-bind="additionalInfo" />\
                        </div>\
                        <div class="form-group">\
                            <label>Locked by</label>\
                            <label class="form-control" data-bind="lockedBy" />\
                        </div>\
                    </div>\
                </div>\
                <div class="modal-footer">\
                    <button type="button" class="btn btn-danger" close>Close</button>\
                </div>\
            </div>\
        </div>\
    </div>';

    return function (entity) {
        return $$(baseModalView, {
            model: entity,
            view: {
                format: displayViewTemplate
            },
            contoller: {
                'click button[close]': function () {
                    this.contoller.close();
                }
            }
        });
    }
});