app.config(function ($stateProvider) {
    $stateProvider
        .state('products', {
            url: "/products",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Products/views/index.html",
                    controller: "ProductIndexController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })

        .state('show', {
            url: "/show/:id",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Products/views/show.html",
                    controller: "ProductShowController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })

        .state('edit', {
            url: "/edit/:id",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Products/views/edit.html",
                    controller: "ProductEditController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
        .state('destroy', {
            url: "/destroy/:id",
            views: {
                'header': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content': {
                    templateUrl: "/app/modules/Products/views/delete.html",
                    controller: "ProductDestroyController"
                },
                'footer': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
})