define(['app/modules/server/optimisticRequestManager',
    'app/modules/entities/optimistic/editView',
    'app/modules/entities/optimistic/conflictView',
    'app/modules/entities/optimistic/recordView',
    'app/modules/entities/base/baseListView',
    'app/common/enums'],
    function (requestManager, editView, conflictView,
        recordView, baseListView, Enums) {

        var listView =
        '<div>\
            <div class="toolbar">\
                <button class="btn btn-primary" new>New</button>\
                <button class="btn btn-primary" refresh>Refresh</button>\
            </div>\
            <table class="table table-bordered table-hover table-condensed">\
                <thead>\
                    <tr>\
                        <th></th>\
                        <th>Version</th>\
                        <th>Objects Count</th>\
                        <th>Notes</th>\
                    </tr>\
                </thead>\
                <tbody>\
                </tbody>\
            </table>\
        </div>';

        return function () {
            return $$(new baseListView(requestManager, editView, recordView, listView), {
                model: {
                    conflictView: new conflictView(requestManager)
                },
                controller: {
                    createInternal: function() {
                        var editView = this.model.get('editView'),
                            conflictView = this.model.get('conflictView');
                        
                        editView.bind(Enums.event.conflict, function () {
                            this.controller.handleConflict(editView.model.get());
                        }.bind(this));

                        conflictView.bind(Enums.event.conflict, function () {
                            this.controller.handleConflict(conflictView.model.get());
                        }.bind(this));

                        conflictView.bind(Enums.event.closed, function () {
                            this.controller.afterEdit(conflictView.model.get());
                        }.bind(this));
                    },

                    handleConflict: function(entity) {
                        this.controller.showConflictView(entity);
                    },

                    showConflictView: function (model) {
                        this.controller.showModalControl('conflictView', model);
                    }
                }
            });
        }
    });