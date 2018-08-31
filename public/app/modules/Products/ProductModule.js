app.controller('ProductIndexController', ($scope) => {
    $scope.search = 'sss';
    $scope.$watch('search', function (next, prev) {
        console.log(prev, next);
    })
})


app.controller('ProductShowController', ($scope, $rootScope, $stateParams) => {
    $scope.product = $rootScope.products.find(x => x.id === +$stateParams.id);

    $scope.open =  () => {
        alert($scope.product.name);
    }
})