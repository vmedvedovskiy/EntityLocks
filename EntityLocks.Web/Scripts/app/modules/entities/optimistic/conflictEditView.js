define(['app/modules/server/optimisticRequestManager', 'app/modules/entities/optimistic/displayView'],
    function (requestManager, displayEntityControl) {

        var editView =
        '<div role="form">\
            <div class="row">\
                <div class="form-group left col-md-6"><h3>Theirs:</h3></div>\
                <div class="form-group right col-md-6"><h3>Yours:</h3></div>\
            </div>\
            <div class="row">\
                <div class="form-group col-md-12">\
                <div role="form" class="form-horizontal">\
                    <div class="form-group">\
                        <label class="col-sm-2">Version</label>\
                        <input type="text" disabled class="form-control col-sm-6" data-bind="version">\
                    </div>\
                    <div class="form-group">\
                        <label class="col-sm-2">Objects count</label>\
                        <input type="text" class="form-control col-sm-6" data-bind="objectsCount">\
                    </div>\
                    <div class="form-group">\
                        <label class="col-sm-2">Notes</label>\
                        <textarea class="form-control col-sm-6" data-bind="notes" />\
                    </div>\
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
                        var left = new displayEntityControl(responce),
                            right = new displayEntityControl(existingModel);
                        this.append(left, 'div.left')
                            .append(right, 'div.right');
                        left.bind('selected', function (ev, field) {
                            change.call(this, ev, field, left, right);
                        }.bind(this));

                        right.bind('selected', function (ev, field) {
                            change.call(this, ev, field, right, left);
                        }.bind(this));
                        this.trigger('loaded');
                    }
                }
            });
        }

        function change(event, field, first, second) {
            second.controller.unselect(field);
            var obj = {};
            obj[field] = first.model.get(field);
            this.model.set(obj);
        };
    });