'use strict';

angular.module('smash.config', [])
  .factory('config',
  	[					
  	function Smashdata(	 ) {

        var production = false;

    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
    	production: production,
    	imagePath: production ? 'http://cdn.getvicci.com/ssb/' : 'http://cdn.getvicci.com/ssb/'
    };

  }]);
