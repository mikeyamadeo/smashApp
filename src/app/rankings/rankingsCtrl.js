'use strict';

angular.module('smash.rankings', [])
  .controller('rankingsCtrl',
  	[			'$scope', 'rankingsViewModel', 'config',
  	function (   $scope,   rankingsViewModel,   config ) {
  		$scope.viewModel = rankingsViewModel;
  		$scope.imgPath = config.imagePath;
    	$scope.rankings = rankingsViewModel.rankingList;
  	}]);
