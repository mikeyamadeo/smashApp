'use strict';

angular.module('smash.profile', [])
  .controller('profileCtrl',
    [           '$scope', 'profileViewModel', 'config',
    function (   $scope,   profileViewModel,   config ) {
        // console.log(profileViewModel)
        $scope.viewModel = profileViewModel;
        $scope.imgPath = config.imagePath;
    }]);