define(['app/common/enums'], function (Enums) {
        var rowContainer = 'tbody';

        return function (requestManager, editView, rowObject, format) {
            return $$({
                model: {
                    requestManager: requestManager,
                    newView: new editView(requestManager),
                    editView: new editView(requestManager),
                },
                view: {
                    format: format,
                    style: '& > thead > tr > th:nth-child(1) { width: 20px; }'
                },
                controller: {
                    create: function () {
                        this.controller.createGrid();
                        var newView = this.model.get('newView'),
                            editView = this.model.get('editView');

                        // create new row with updated data
                        newView.bind(Enums.event.closed, function () {
                            this.append(this.controller.createRow(newView.model.get()), rowContainer);
                        }.bind(this));

                        // update existing row
                        editView.bind(Enums.event.closed, function () {
                            this.controller.afterEdit(editView.model.get());
                        }.bind(this));

                        this.controller.createInternal();
                    },

                    createInternal: function() {

                    },

                    'click button[new]': function () {
                        this.controller.showNewView();
                    },

                    'click button[refresh]': function () {
                        this.controller.refresh();
                    },

                    createGrid: function () {
                        this.model.get('requestManager').loadAll(function (responce) {
                            for (var i in responce) {
                                this.append(this.controller.createRow(responce[i]), rowContainer);
                            }
                        }.bind(this));
                    },

                    createRow: function (row) {
                        var obj = new rowObject(row);

                        // just handle edit end delete events
                        obj.bind(Enums.event.edit, function (event) {
                            this.controller.showEditView(obj.model.get());
                        }.bind(this));

                        obj.bind(Enums.event.delete, function (event) {
                            this.controller.deleteRecord(obj);
                        }.bind(this));

                        this.controller.createRowInternal(obj);
                        return obj;
                    },
                    
                    createRowInternal: function(row) {

                    },

                    deleteRecord: function (row) {
                        this.model.get('requestManager').delete(function (responce) {
                            row.destroy();
                        }.bind(this), null, row.model.get('id'));
                    },

                    afterEdit: function(controlModel) {
                        this.each(function () {
                            if (this.model.get('id') === controlModel.id) {
                                this.model.set(controlModel);
                                return false;
                            }
                        });
                    },

                    refresh: function () {
                        this.model.get('requestManager').loadAll(function (responce) {
                            var idx = 0;
                            this.each(function () {
                                if (responce[idx]) {
                                    this.controller.update(responce[idx]);
                                } else {
                                    this.destroy();
                                }

                                idx++;
                            });

                            if (idx < responce.length) {
                                var left = responce.slice(idx);
                                for (var i in left) {
                                    this.append(this.controller.createRow(left[i]), rowContainer);
                                }
                            }

                        }.bind(this));
                    },

                    showModalControl: function(control, model) {
                        this.model.get(control).model.reset();
                        this.model.get(control).controller.showModal(model);
                    },

                    showEditView: function (model) {
                        this.controller.showModalControl('editView', model);
                    },

                    showNewView: function () {
                        this.controller.showModalControl('newView', {});
                    }
                }
            });
        }
    });