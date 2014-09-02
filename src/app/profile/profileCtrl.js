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

        /**
         * @desc ng-repeat requires a collection to work, but viewModel.stocksLeft
         *     is a number. Used by stocks left html partial.
         * @return {Array} array the size of the number of stocks left
         */
        $scope.numOfStocks = function( size ) {
            return new Array( size );
        }
    }]);