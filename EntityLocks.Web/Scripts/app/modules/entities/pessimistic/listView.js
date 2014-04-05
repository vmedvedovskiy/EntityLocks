define(['app/modules/server/pessimisticRequestManager',
    'app/modules/entities/pessimistic/editView',
    'app/modules/entities/pessimistic/displayView',
    'app/common/enums'],
    function (requestManager, editView, displayView, Enums) {

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
        </div>',
        recordView =
        '<tr>\
            <td>\
                <button class="btn btn-primary btn-xs" edit >Edit</button>\
                <button class="btn btn-danger btn-xs" delete >Delete</button>\
            </td>\
            <td data-bind="name" />\
            <td data-bind="additionalInfo" />\
            <td data-bind="lockedBy" />\
        </tr>',
        rowContainer = 'tbody';

        var rowObject = function (row) {
            return $$({
                model: row,
                view: {
                    format: recordView
                },
                controller: {
                    create: function() {
                        if (this.controller.isLocked()) {
                            this.view.$('button[delete]').remove();
                            this.view.$('button[edit]').html('View');
                        }
                    },

                    'click button[edit]': function () {
                        if (!this.controller.isLocked()) {
                            this.controller.showEditView();
                        } else {
                            this.controller.showDisplayView();
                        }
                    },

                    isLocked: function() {
                        var result = row.hasOwnProperty('lockedBy')
                            && row.lockedBy !== ''
                            && row.lockedBy !== null
                            && row.lockedBy !== "";
                        return result;
                    },

                    'click button[delete]': function () {
                        requestManager.delete(function (responce) {
                            this.destroy();
                        }.bind(this), null, this.model.get('id'));
                    },

                    showEditView: function () {
                        this.trigger(Enums.event.edit, this.model.get());
                    },

                    showDisplayView: function () {
                        this.trigger(Enums.event.display, this.model.get());
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
                        var editView = this.model.get('editView');
                        editView.model.reset();
                        editView.controller.showModal();

                        editView.bind(Enums.event.closed, function (event) {
                            this.append(this.controller.createRow(editView.model.get()), rowContainer);
                            editView.model.reset();
                        }.bind(this));
                    },

                   'click button[refresh]': function () {
                       this.controller.refresh();
                    },

                    createGrid: function () {
                        requestManager.loadAll(function (responce) {
                            for (var i in responce) {
                                this.append(this.controller.createRow(responce[i]), rowContainer);
                            }
                        }.bind(this));
                    },

                    createRow: function (row) {
                        var obj = new rowObject(row);
                        obj.bind(Enums.event.display, function (event, model) {
                            this.controller.showDisplayView(model);
                        }.bind(this));

                        obj.bind(Enums.event.edit, function (event, model) {
                            this.controller.showEditView(model);
                        }.bind(this));
                        return obj;
                    },

                    refresh: function () {
                        requestManager.loadAll(function (responce) {
                            var idx = 0;
                            this.each(function () {
                                if (responce[idx]) {
                                    this.model.set(responce[idx]);
                                } else {
                                    this.destroy();
                                }

                                idx++;
                            });

                        }.bind(this));
                    },

                    showEditView: function (model) {
                        this.model.get('editView').model.set(model);
                        this.model.get('editView').controller.showModal();
                    },

                    showDisplayView: function (model) {
                        this.model.get('displayView').model.set(model);
                        this.model.get('displayView').controller.showModal();
                    }
                }
            });
        }
    });