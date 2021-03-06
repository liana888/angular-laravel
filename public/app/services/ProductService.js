app.factory('ProductService', ['$resource', ($resource) => {
    return $resource('/api/products/:id', {id : '@id'}, {
        query : {
            method : 'GET',
            cancellable: true
        },
        get : {
            method : 'GET'
        },
        update : {
            method : 'PUT'
        },
        destroy : {
            method : 'DELETE'
        },
        store : {
            method : 'POST'
        }
    });
}]);