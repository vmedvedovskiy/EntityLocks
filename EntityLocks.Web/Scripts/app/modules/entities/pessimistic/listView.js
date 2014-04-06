define(['app/modules/server/pessimisticRequestManager',
    'app/modules/entities/pessimistic/editView',
    'app/modules/entities/pessimistic/displayView',
    'app/modules/entities/pessimistic/recordView',
    'app/modules/entities/base/baseListView',
    'app/common/enums'],
    function (requestManager, editView, displayView,
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
                        <th>Name</th>\
                        <th>Additional Info</th>\
                        <th>Locked by</th>\
                    </tr>\
                </thead>\
                <tbody>\
                </tbody>\
            </table>\
        </div>';

        return function () {
            return $$(new baseListView(requestManager, editView, recordView, listView), {
                model: {
                    displayView: new displayView()
                },
                view: {
                    style: '& > thead > tr > th:nth-child(1) { width: 20px; }'
                },
                controller: {
                    createInternal: function () {
                        var editView = this.model.get('editView');

                        editView.bind(Enums.event.locked, function () {
                            this.controller.showDisplayView(editView.model.get());
                            this.controller.afterEdit(editView.model.get());
                        }.bind(this));

                        editView.bind(Enums.event.cancelled, function () {
                            editView.model.set({ lockedBy: '' });
                            requestManager.unlock(function (responce) {
                                this.controller.afterEdit(editView.model.get());
                            }.bind(this), null, editView.model.get('id'), editView.model.get());
                        }.bind(this));
                    },

                    createRowInternal: function (obj) {
                        obj.bind(Enums.event.display, function (event) {
                            this.controller.showDisplayView(obj.model.get());
                        }.bind(this));
                    },

                    showDisplayView: function (model) {
                        this.model.get('displayView').model.set(model);
                        this.controller.showModalControl('displayView', model);
                    },

                    afterEdit: function (model) {
                        this.each(function () {
                            if (this.model.get('id') === model.id) {
                                this.controller.update(model);
                                return false;
                            }
                        });
                    }
                }
            });
        }
    });