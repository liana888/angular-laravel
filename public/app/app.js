const app = angular.module('app', ['ui.router', 'angular-jwt', 'ngResource', 'ngAnimate', 'toastr']);

app.run(function ($rootScope, authManager, $transitions, AuthService, $state, $q) {
    authManager.checkAuthOnRefresh();

    $transitions.onStart({}, (transition) => {
        if($rootScope.isAuthenticated && transition.to().name !== 'logout') {
            let deferredPromise = $q.defer();

            AuthService.refresh({}, (res) =>{
                localStorage.setItem('jwtToken', res.access_token);
                deferredPromise.resolve();
            }, (err) => {
                authManager.unauthenticate();
                localStorage.removeItem('jwtToken');
                $state.go('login');
                deferredPromise.reject();
            });

            return deferredPromise.promise;
        }
    });
});

app.config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
        tokenGetter: function() {
            return localStorage.getItem('jwtToken');
        }
    });

    $httpProvider.interceptors.push('jwtInterceptor');
});


app.config(($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/404');
});