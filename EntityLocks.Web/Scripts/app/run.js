(function (curl) {

    var config = {
        baseUrl: '/Scripts'
    };

    curl(config, ['app/main'])
        .then(function (main) {
            $$.document.append(main);
        });
})(curl)