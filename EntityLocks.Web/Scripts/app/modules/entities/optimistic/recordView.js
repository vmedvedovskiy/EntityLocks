define(['app/common/enums', 'app/modules/entities/base/baseRow'],
    function (Enums, BaseRow) {

    var recordView =
        '<tr>\
            <td>\
                <button class="btn btn-primary btn-xs" edit>Edit</button>\
                <button class="btn btn-danger btn-xs" delete>Delete</button>\
            </td>\
            <td data-bind="version" />\
            <td data-bind="objectsCount" />\
            <td data-bind="notes" />\
        </tr>';

    return function (model) {
        return $$(new BaseRow(model, recordView), {});
    }
})