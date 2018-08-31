app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('404', {
            url: "/404",
            views: {
                'content': {
                    templateUrl: "/app/modules/Errors/views/404.html",
                    controller: "Error404Controller"
                }
            },
        })
})