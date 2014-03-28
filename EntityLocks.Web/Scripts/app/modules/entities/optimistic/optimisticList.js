define(['app/modules/server/requestManager', 'app/modules/entities/optimistic/optimisticModel'],
    function (requestManager, model) {

        var listView = 
        '<table>\
            <thead>\
                <th>Notes</th>\
                <th>Version</th>\
                <th>ObjectsCount</th>\
            </thead>\
            <tbody>\
            </tbody>\
        </table>',
        recordView = 
        '<tr>\
            <td><button edit>Edit</button></td>\
            <td data-bind="notes" />\
            <td data-bind="version" />\
            <td data-bind="objectsCount" />\
        </tr>';


        return function () {
            return $$({
                model: {},
                view: {
                    format: listView,
                },
                controller: {
                    'create': function () {
                        var ctx = this;
                        requestManager.sendGetQuery('optimisticEntity', function (responce) {
                            for (var i in responce) {
                                ctx.append($$({
                                    model: responce[i],
                                    view: {
                                        format: recordView
                                    },
                                    controller: {
                                        'td > button[edit] click': function () {
                                            // TODO show edit view
                                        }
                                    }
                                }), 'tbody');
                            }
                        });
                    }
                }
            });
        }
    });