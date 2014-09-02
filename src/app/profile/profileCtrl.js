'use strict';

angular.module('smash.profile', [])
  .controller('profileCtrl',
    [           '$scope', 'profileViewModel', 'config',
    function (   $scope,   profileViewModel,   config ) {
        console.log(profileViewModel)
        $scope.viewModel = profileViewModel;
        $scope.record = $scope.viewModel.record;
        $scope.imgPath = config.imagePath;

        $scope.setRecord = function setRecord( rec ){
            $scope.record = rec;
        }

        $scope.numOfStocks = function( size ) {
            return new Array( size );
        }
    }]);