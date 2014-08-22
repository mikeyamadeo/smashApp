'use strict';

angular.module('smash.config', [])
  .factory('config',
  	[					
  	function Smashdata(	 ) {



    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
    	production: false,
    	imagePath: this.production ? 'http://cdn.getvicci.com/ssb/' : 'assets/images/'
    };

  }]);
