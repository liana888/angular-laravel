app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('/', {
            url: "/",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Home/views/index.html",
                    controller: "HomeIndexController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
        .state('second', {
            url: "/second",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Home/views/second.html",
                    controller: "HomeSecondController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
})