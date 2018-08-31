app.controller('RegisterController', function ($scope, $rootScope, AuthService, toastr) {
    $scope.user = {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
    };

    $scope.message = null;
    $scope.errors = {};

    $scope.register = () => {
        AuthService.register($scope.user, (res) => {
            $scope.message = res.message;
            $scope.user = {
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            };

        }, (err) => {
            toastr.error('Please fix errors');
            $scope.errors = err.data.errors;
        })
    }
});

app.controller('LogoutController', function ($state, authManager) {
    localStorage.removeItem('jwtToken');
    authManager.unauthenticate();
    $state.go('login');
});

app.controller('LoginController', function ($scope, AuthService, toastr, $state) {
    $scope.user = {
        email: null,
        password: null
    };

    $scope.login = () => {
        AuthService.login($scope.user, function (res) {
            toastr.success('Successfully logged in.');
            localStorage.setItem('jwtToken', res.access_token);
            $state.go('/');
        }, function (err) {
            toastr.error('Wrong email or password.');
        })
    }
});


app.controller('VerifyEmailController', function ($stateParams, AuthService, toastr, $state) {
    AuthService.verifyUser({token: $stateParams.token}, (res) => {
        toastr.success(res.message);
        $state.go('login');
    }, (err) => {
        toastr.error(err);
    });
})

app.controller('ForgotController', function ($scope, AuthService) {
    $scope.email = null;
    $scope.forgot = () => {
        AuthService.forgot({email: $scope.email}, (res) => {

        }, (err) => {

        })
    }

})