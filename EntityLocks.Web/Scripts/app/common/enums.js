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
            edit: 'edit',
            cancelled: 'cancelled',
            selected: 'selected',
            loaded: 'loaded',
            delete: 'delete',
            conflict: 'conflict',
            locked: 'locked'
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