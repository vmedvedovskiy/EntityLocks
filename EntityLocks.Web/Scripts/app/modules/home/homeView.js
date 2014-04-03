define(['app/modules/EventEmitter', 'app/common/enums'], function (EventEmitter, Enums) {

    var homeHtml = 
        '<div class="jumbotron">\
          <h1>Hello!</h1>\
          <p>This is an awesome home page with many awesome content, as you see. Do not waste your time and press one of the buttons below: <br /></p>\
          <p><a class="btn btn-primary btn-lg" role="button" module="optimisticList">Go to optimistic entities</a></p>\
          <p><a class="btn btn-danger btn-lg" role="button" module="pessimisticList">Go to pessimistic entities</a></p>\
        </div.';

    return function () {
        return $$({
            model: {},
            view: {
                format: homeHtml
            },
            controller: {
                'click a[module]': function (event) {
                    EventEmitter.emit(Enums.event.navigate, event.target.getAttribute('module'));
                }
            }
        });
    }
})