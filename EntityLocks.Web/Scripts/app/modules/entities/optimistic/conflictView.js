define(['app/modules/entities/base/baseEditView',
    'app/modules/entities/optimistic/displayView',
    'app/common/Enums'],
    function (BaseEditView, displayView, Enums) {

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

        return function (requestManager) {

            return $$(new BaseEditView(requestManager), {
                model: {},
                view: {
                    customFormat: editView
                },
                controller: {
                    showModalInternal: function (model) {
                        // update existing entity (those, which user tried to save and got conflict)
                        requestManager.load(function (responce) {
                            this.controller.initialize(responce);
                        }.bind(this), null, model.id);
                    },

                    initialize: function (responce) {

                        // save an existing version of entity before we updated it
                        var existing = {};
                        $.extend(existing, this.model.get());

                        // update result version
                        this.model.set({ version: responce.version });
                        
                        // create and append merge controls only one time
                        if (!this.left && !this.right) {
                            this.controller.createMergeControls(existing, responce);
                        } else {
                            this.left.model.set(responce);
                            this.right.model.set(existing);
                        }
                    },

                    update: function () {
                        requestManager.save(function (responce) {
                            var newVersion = this.model.get('version') + 1;
                            this.model.set({ version: newVersion });
                            this.controller.close();
                        }.bind(this),
                        function (error) {
                            if (error.status === 409) {
                                this.controller.cancel();
                                this.trigger(Enums.event.conflict);
                            }
                        }.bind(this), this.model.get('id'), this.model.get());
                    },

                    createMergeControls: function(existing, newEnt) {
                        this.left = new displayView(newEnt);
                        this.right = new displayView(existing);

                        this.append(this.left, 'div.left')
                            .append(this.right, 'div.right');

                        this.left.bind(Enums.event.selected, function (ev, field) {
                            change.call(this, field, this.left, this.right);
                        }.bind(this));

                        this.right.bind(Enums.event.selected, function (ev, field) {
                            change.call(this, field, this.right, this.left);
                        }.bind(this));
                    }
                }
            });
        }

        function change(field, first, second) {
            second.controller.unselect(field);
            var obj = {};
            obj[field] = first.model.get(field);
            this.model.set(obj);
        };
    });