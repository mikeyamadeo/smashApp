'use strict';

angular.module('smash.profile', [])
  .controller('profileCtrl',
    [           '$scope', 'profileViewModel', 'config',
    function (   $scope,   profileViewModel,   config ) {

        $scope.viewModel                = profileViewModel;
        $scope.viewModel.selectedRecord = $scope.viewModel.record;
        $scope.imgPath                  = config.imagePath;

        /**
         * @desc ng-repeat requires a collection to work, but viewModel.stocksLeft
         *     is a number. Used by stocks left html partial.
         * @return {Array} array the size of the number of stocks left
         */
        $scope.numOfStocks = function( size ) {
            return new Array( size );
        }
    }]);
