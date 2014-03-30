define([], function () {
    var displayView =
            '<div role="form">\
                <div class="form-group">\
                    <label>Version</label>\
                    <label disabled class="form-control" data-bind="version">\
                </div>\
                <div class="form-group">\
                    <label>Objects count</label>\
                    <label class="form-control" data-bind="objectsCount">\
                </div>\
                <div class="form-group">\
                    <label>Notes</label>\
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
                'click label[data-bind]': function (event) {
                    $(event.target).toggleClass('selected');
                    this.trigger('selected', event.target.getAttribute('data-bind'));
                },
                select: function (field) {
                    this.view.$('[data-bind="' + field + '"]').addClass('selected')
                },
                unselect: function (field) {
                    this.view.$('[data-bind="' + field + '"]').removeClass('selected')
                }
            }
        })
    };
});