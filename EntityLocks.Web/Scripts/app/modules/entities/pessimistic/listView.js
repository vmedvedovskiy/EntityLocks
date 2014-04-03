define(['app/modules/server/optimisticRequestManager', 'app/modules/entities/optimistic/templateEditView'],
    function (requestManager, editView) {

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
                        <th>Create date</th>\
                        <th>Additional Info</th>\
                        <th>Locked by</th>\
                    </tr>\
                </thead>\
                <tbody>\
                </tbody>\
            </table>\
        </div>',
        recordView = 
        '<tr>\
            <td>\
                <button class="btn btn-primary btn-xs" edit ></button>\
                <button class="btn btn-danger btn-xs" delete >Delete</button>\
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
                    create: function() {
                        if (row.userName === '' || row.userName === null) {
                            this.view.$('button[delete]').remove();
                            this.view.$('button[edit]').html('View');
                        }
                    },

                    'click button[edit]': function () {
                        if (row.userName === '' || row.userName === null) {
                            this.controller.showEditView();
                        } else {
                            this.controller.showDisplayView();
                        }
                    },

                    'click button[delete]': function () {
                        requestManager.delete(function (responce) {
                            this.destroy();
                        }.bind(this), null, this.model.get('id'));
                    },

                    showEditView: function () {
                        this._parent.controller.updateEditViewModel(this.model.get());
                        this._parent.controller.showEditView(function () {
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
                    editView: new editView(),
                    displayView: new displayView()
                },
                view: {
                    format: listView,
                    style: '& > thead > tr > th:nth-child(1) { width: 20px; }'
                },
                controller: {
                    'create': function () {
                        this.controller.createGrid();
                    },

                    'click button[new]': function () {
                        this.model.get('editView').model.reset();
                        this.model.get('editView').controller.showModal(function (id) {
                            requestManager.load(function (responce) {
                                this.append(this.controller.createRow(responce), 'tbody');
                            }.bind(this), null, id);

                            this.model.get('editView').model.reset();
                        }.bind(this));
                    },

                   'click button[refresh]': function () {
                       this.controller.refresh();
                    },

                    createGrid: function () {
                        requestManager.loadAll(function (responce) {
                            for (var i in responce) {
                                this.append(this.controller.createRow(responce[i]), 'tbody');
                            }
                        }.bind(this));
                    },

                    createRow: function (row) {
                        return new rowObject(row);
                    },

                    refresh: function () {
                        requestManager.loadAll(function (responce) {
                            var idx = 0;
                            this.each(function () {
                                this.model.set(responce[idx]);
                                idx++;
                            });

                        }.bind(this));
                    },

                    showEditView: function (callbck) {
                        this.model.get('editView').controller.showModal(callbck);
                    },
                    updateEditViewModel: function (model) {
                        this.model.get('editView').model.set(model);
                    }
                }
            });
        }
    });