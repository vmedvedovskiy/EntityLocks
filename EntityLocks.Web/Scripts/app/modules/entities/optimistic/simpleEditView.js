define([], function () {

        var simpleViewTemplate =
        '<form role="form" class="form-horizontal">\
            <div class="form-group">\
                <label >Version</label>\
                <input type="text" disabled class="form-control" data-bind="version">\
            </div>\
            <div class="form-group">\
                <label >Objects count</label>\
                <input type="text" class="form-control" data-bind="objectsCount">\
            </div>\
            <div class="form-group">\
                <label >Notes</label>\
                <textarea class="form-control" data-bind="notes" />\
            </div>\
        </form>';


        return function () {
            return $$({
                model: {},
                view: {
                    format: simpleViewTemplate
                },
                controller: {

                }
            });
        }
    });