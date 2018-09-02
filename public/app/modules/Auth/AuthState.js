app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('register', {
            url: "/register",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Auth/views/register.html",
                    controller: "RegisterController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
        .state('login', {
            url: "/login",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Auth/views/login.html",
                    controller: "LoginController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })

        .state('logout', {
            url: "/logout",
            views: {
                'content': {
                    controller: "LogoutController"
                }
            },
        })

        .state('activate-profile', {
            url: "/activate-profile/:token",
            views: {
                'content': {
                    controller: "VerifyEmailController"
                }
            },
        })
        .state('forgot', {
            url: "/forgot",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Auth/views/forgot.html",
                    controller: "ForgotController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })

        .state('newPassword', {
            url: "newPassword/:token",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Auth/views/newPassword.html",
                    controller: "NewPasswordController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
})

