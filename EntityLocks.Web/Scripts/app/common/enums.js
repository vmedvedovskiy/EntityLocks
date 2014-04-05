define([], function () {
    return {
        query: {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE'
        },
        event: {
            navigate: 'navigate',
            closed: 'closed',
            display: 'display',
            edit: 'edit'
        },
        module: {
            home: 'home',
            registration: 'registration',
            login: 'login',
            optimisticList: 'optimisticList',
            pessimisticList: 'pessimisticList'
        }
    };
})