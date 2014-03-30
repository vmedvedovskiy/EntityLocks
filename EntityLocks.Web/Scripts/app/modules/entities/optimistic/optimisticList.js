define(['app/modules/server/optimisticRequestManager', 'app/modules/entities/optimistic/optimisticEdit'],
    function (requestManager, editView) {

        var listView =
        '<div>\
            <div class="toolbar">\
                <button class="btn btn-primary" new>New</button>\
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
        </div>',
        recordView = 
        '<tr>\
            <td>\
                <button class="btn btn-primary btn-xs" edit>Edit</button>\
                <button class="btn btn-danger btn-xs" delete>Delete</button>\
            </td>\
            <td data-bind="version" />\
            <td data-bind="objectsCount" />\
            <td data-bind="notes" />\
        </tr>';

        var rowObject = function (row) {
            return $$({
                model: row,
                view: {
                    format: recordView
                },
                controller: {
                    'click button[edit]': function () {
                        this.controller.showEditView();
                    },

                    'click button[delete]': function () {
                        requestManager.delete(function (responce) {
                            this.destroy();
                        }.bind(this), null, this.model.get('id'));
                    },

                    showEditView: function () {
                        if (!this._parent.editView) {
                            this._parent.editView = new editView(this.model.get());
                        } else {
                            this._parent.editView.model.set(this.model.get());
                        }

                        this._parent.editView.controller.showModal(function () {
                            this.controller.refresh();
                        }.bind(this));
                    },
                    refresh: function () {
                        requestManager.load(function (responce) {
                            this.model.set(responce);
                        }.bind(this), null, this.model.get('id'));
                    }
                }
            })
        };

        return function () {
            return $$({
                model: {
                    editView: new editView()
                },
                view: {
                    format: listView,
                    style: '& > thead > tr > th:nth-child(1) { width: 20px; }'
                },
                controller: {
                    'create': function () {
                        this.controller.createGrid();
                    },

                    'click button[new]': function() {
                        this.model.get('editView').controller.showModal(function (id) {
                            requestManager.load(function (responce) {
                                this.append(this.controller.createRow(responce), 'tbody');
                            }.bind(this), null, id);

                            this.model.get('editView').model.reset();
                        }.bind(this));
                    },

                    createGrid: function () {
                        requestManager.loadAll(function (responce) {
                            for (var i in responce) {
                                this.append(this.controller.createRow(responce[i]), 'tbody');
                            }
                        }.bind(this));
                    },

                    createRow: function (row) {
                        return rowObject(row);
                    },

                    refresh: function () {
                        requestManager.loadAll(function (responce) {
                            var idx = 0;
                            this.each(function () {
                                this.model.set(responce[idx]);
                                idx++;
                            });

                        }.bind(this));
                    }
                }
            });
        }
    });