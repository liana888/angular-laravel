app.controller('ProductIndexController', ($scope, $rootScope, ProductService, toastr) => {
    $scope.products = {};
    $scope.pages = [];

    $rootScope.$on('getData', function (res, args) {
        $scope.products = args.products;
        $scope.pagination = args.pagination;
        $scope.pages = new Array(Math.ceil($scope.pagination.total / $scope.pagination.per_page));
    });
    $scope.changePage = (page) => {
        ProductService.query({page: page}, (res) => {
            $rootScope.$broadcast('getData', {products: res.products, pagination: res.pagination});
        })
    }

    // let getProducts = () => {
    //     ProductService.query({},  (res) => {
    //         $scope.products = res.products;
    //     }, (err) => {
    //         toastr.error('Error in loading products.')
    //     })
    // }

    $scope.deleteProduct = (el, productId) => {
        if(confirm('a')){
            ProductService.destroy ({id : productId}, (res) => {
                toastr.success('Successfully deleted')
                el.currentTarget.parentElement.parentElement.remove();
            }, (err) => {
                toastr.error('Error')
            })
        }
    }
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


app.controller('ProductEditController', ($scope, $rootScope, $stateParams, ProductService, toastr, $state, Upload, authManager) => {
    $scope.product = {
        name : null,
        description : null,
        short_description : null,
        price : null,
        avatar : null
    };

    $scope.uploadChange = function (file) {
        console.log(file, $scope.product.avatar);
    }


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
                $scope.upload($scope.product.avatar, res.id )
                toastr.success('Successfully Created.');
                $state.go('products');
            }, (err) => {
                toastr.error('Oops.')
            })
        }
    }


    // upload on file select or drop
    $scope.upload = function (file, product_id) {
        Upload.upload({
            url: 'api/product-avatar/' + product_id,
            data: {avatar: file, token: 'bearer ' + authManager.getToken()}
        }).then(function (res) {

        }, function (res) {

        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
});


app.controller('ProductDestroyController', ($scope, $rootScope, $stateParams, ProductService, $state) => {
    let id = $stateParams.id;
    $scope.delete = () => {
        ProductService.destroy({id : id}, (res) => {
            $state.go('products')
        }, (err) => {

        })
    }

    $scope.cancel = () => {
        $state.go('products')
    }
});

app.controller('ProductHelloController', ($scope, $rootScope, $stateParams, ProductService, $state) => {

});

