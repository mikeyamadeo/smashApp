'use strict';

angular
  .module('smashApp', [
    'ui.router',
    'smash.config',
    'smash.model',
    'smash.viewPrep',
    'smash.rankings'
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
      .otherwise('/');

      $stateProvider

        .state('rankings', {
          url: '/',

          templateUrl: 'app/rankings/rankings.html',

          controller: 'rankingsCtrl',

          resolve: {
            users: function( smashAjax ) {
              return smashAjax.users();
            },
            matches: function( smashAjax ) {
              return smashAjax.matches();
            },
            chars: function( smashAjax ) {
              return smashAjax.chars();
            },
            rankingsViewModel: function( users, matches, chars, smashData, smashViewPrep ) {

              smashData.users( users.data );
              smashData.matches( matches.data );
              smashData.chars( chars.data );

              return smashViewPrep.rankings.byUserCharacter( );
            }

          }
        })

        .state('profile', {
          url: '/profile/:id',

          templateUrl: 'views/profile.html',
          controller: function( $scope, records ) {
            console.log(records);
            $scope.stats = records;
          },

          resolve: {
            records: function( $stateParams, smashAjax ) {
              console.log($stateParams);
              return smashAjax.users( $stateParams.id );
            }
          }
        });

    }]);
