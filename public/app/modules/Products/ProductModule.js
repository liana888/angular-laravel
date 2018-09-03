app.controller('ProductIndexController', ($scope, ProductService, toastr) => {
    $scope.products = {};

    let getProducts = () => {
        ProductService.query({},  (res) => {
            $scope.products = res.products;
        }, (err) => {
            toastr.error('Error in loading products.')
        })
    }

    getProducts();
});


app.controller('ProductShowController', ($scope, $rootScope, $stateParams, ProductService) => {
    $scope.product = {};

    let showProduct = () => {
        ProductService.get({id : $stateParams.id}, (res) => {
            $scope.product = res.product;
        }, (err) => {

        })
    }

    showProduct();
});


app.controller('ProductEditController', ($scope, $rootScope, $stateParams, ProductService, toastr, $state) => {
    $scope.product = {
        name : null,
        description : null,
        short_description : null,
        price : null
    };

    let getProduct = () => {
        ProductService.get({id : $stateParams.id}, (res) => {
            $scope.product = res.product;
        }, (err) => {
            toastr.error('Oops.')
        })
    }

    if(+$stateParams.id) {
        getProduct();
    }

    $scope.save = function () {
        if(+$stateParams.id) {
            ProductService.update($scope.product,  $stateParams.id , (res) => {
                toastr.success('Successfully Updated.');
                $state.go('products');
            }, (err) => {
                toastr.error('Oops.')
            })
        } else {
            ProductService.store($scope.product,  (res) => {
                toastr.success('Successfully Created.');
                $state.go('products');
            }, (err) => {
                toastr.error('Oops.')
            })
        }
    }

});