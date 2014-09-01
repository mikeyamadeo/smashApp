'use strict';

angular
  .module('smashApp', [
    'ui.router',
    'smash.config',
    'smash.model',
    'smash.viewPrep',
    'smash.rankings',
    'smash.profile'
  ])

  .run(function() {
    //Polyfill to remove click delays on browsers with touch UIs
    FastClick.attach(document.body);
  })

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

          templateUrl: 'app/profile/profile.html',
          controller: 'profileCtrl',

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
            profileViewModel: function( users, matches, chars, $stateParams, smashData, smashViewPrep ) {

              smashData.users( users.data );
              smashData.matches( matches.data );
              smashData.chars( chars.data );

              var userId  = $stateParams.id,
                  user    = smashData.user( userId ),
                  matches = smashData.userMatches( userId, smashData.matches( userId ));

              return smashViewPrep.profile( user, matches );
              
            }
          }
        });

    }]);
