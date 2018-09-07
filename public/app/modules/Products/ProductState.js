app.config(function ($stateProvider) {
    $stateProvider
        .state('products', {
            url: "/products",
            views: {
                'header@': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Products/views/index.html",
                    controller: "ProductIndexController"
                },
                'hello@products' : {
                    templateUrl: "/app/modules/Products/views/hello.html",
                    controller: "ProductHelloController"
                },
                'footer@': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })

        .state('products.show', {
            url: "/show/:id",
            views: {
                'header@': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Products/views/show.html",
                    controller: "ProductShowController"
                },
                'hello@products.show' : {
                    templateUrl: "/app/modules/Products/views/hello.html",
                    controller: "ProductHelloController"
                },
                'footer@': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })

        .state('products.edit', {
            url: "/edit/:id",
            views: {
                'header@': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Products/views/edit.html",
                    controller: "ProductEditController"
                },
                'footer@': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
        .state('products.destroy', {
            url: "/destroy/:id",
            views: {
                'header@': {
                    templateUrl: "/app/modules/Header/views/index.html",
                    controller: "HeaderController"
                },
                'content@': {
                    templateUrl: "/app/modules/Products/views/delete.html",
                    controller: "ProductDestroyController"
                },
                'footer@': {
                    templateUrl: "/app/modules/Footer/views/index.html",
                    controller : "HomeIndexController"
                }
            },
        })
})