define([], function () {
    var displayView =
            '<div role="form">\
                <div class="form-group">\
                    <label for="version">Version</label>\
                    <label class="form-control" data-bind="version">\
                </div>\
                <div class="form-group">\
                    <label for="objectsCount">Objects count</label>\
                    <label class="form-control" data-bind="objectsCount">\
                </div>\
                <div class="form-group">\
                    <label for="notes">Notes</label>\
                    <label class="form-control" data-bind="notes" />\
                </div>\
            </div>';

    return function (model) {
        return $$({
            model: model,
            view: {
                format: displayView
            },
            controller: {
                'click label': function (event) {
                    $(event.target).addClass('selected')
                    this.trigger('selected', event.target.getAttribute('data-bind'));
                }
            }
        })
    };
});