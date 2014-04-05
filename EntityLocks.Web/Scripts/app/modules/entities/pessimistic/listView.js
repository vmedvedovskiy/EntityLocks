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
                        this.controller.updateRowControls();
                    },

                    update: function(data) {
                        this.model.set(data);
                        this.controller.updateRowControls();
                    },

                    updateRowControls: function() {
                        if (this.controller.isLocked(this.model.get())) {
                            this.view.$('button[delete]').hide();
                            this.view.$('button[edit]').html('View');
                        } else {
                            this.view.$('button[delete]').show();
                            this.view.$('button[edit]').html('Edit');
                        }
                    },

                    'click button[edit]': function () {
                        if (!this.controller.isLocked(this.model.get())) {
                            this.controller.showEditView();
                        } else {
                            this.controller.showDisplayView();
                        }
                    },

                    isLocked: function(row) {
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
                    }
                }
            })
        };

        return function () {
            return $$({
                model: {
                    newView: new editView(),
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
                        var newView = this.model.get('newView'),
                            editView = this.model.get('editView');

                        newView.bind(Enums.event.closed, function (event) {
                            this.append(this.controller.createRow(newView.model.get()), rowContainer);
                        }.bind(this));

                        editView.bind(Enums.event.closed, function (event) {
                            this.each(function () {
                                if (this.model.get('id') === editView.model.get('id')) {
                                    this.model.set(editView.model.get());
                                    return false;
                                }
                            });
                        }.bind(this));
                    },

                    'click button[new]': function () {
                        this.controller.showNewView();
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
                        obj.bind(Enums.event.display, function (event) {
                            this.controller.showDisplayView(obj.model.get());
                        }.bind(this));

                        obj.bind(Enums.event.edit, function (event) {
                            this.controller.showEditView(obj.model.get());
                        }.bind(this));
                        return obj;
                    },

                    refresh: function () {
                        requestManager.loadAll(function (responce) {
                            var idx = 0;
                            this.each(function () {
                                if (responce[idx]) {
                                    this.controller.update(responce[idx]);
                                } else {
                                    this.destroy();
                                }

                                idx++;
                            });

                        }.bind(this));
                    },

                    showEditView: function (model) {
                        this.model.get('editView').model.reset();
                        this.model.get('editView').model.set(model);
                        this.model.get('editView').controller.showModal();
                    },

                    showNewView: function () {
                        this.model.get('newView').model.reset();
                        this.model.get('newView').model.set({});
                        this.model.get('newView').controller.showModal();
                    },

                    showDisplayView: function (model) {
                        this.model.get('displayView').model.reset();
                        this.model.get('displayView').model.set(model);
                        this.model.get('displayView').controller.showModal();
                    }
                }
            });
        }
    });