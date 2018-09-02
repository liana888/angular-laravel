app.factory('AuthService', ['$resource', ($resource) => {
    return $resource('/api/auth', {}, {
        login : {
            url: '/api/auth/login',
            method: 'POST',
            skipAuthorization: true
        },
        register : {
            url: '/api/auth/register',
            method: 'POST',
            skipAuthorization: true
        },
        me : {
            url: '/api/auth/me',
            method: 'POST'
        },
        refresh : {
            url: '/api/auth/refresh',
            method: 'POST'
        },
        verifyUser : {
            url: '/api/auth/verify/:token',
            method: 'GET'
        },
        forgot : {
            url: '/api/auth/forgot',
            method: 'POST'
        },
        newPassword : {
            url: '/api/auth/newPassword',
            method: 'POST'
        },



    });
}]);