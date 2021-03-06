'use strict';

angular.module('smash.model', [])
.factory('smashAjax',
    [                   '$q', '$timeout', '$http', 'config',
    function smashAjax(  $q,   $timeout,   $http,   config ) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    var prod = config.production,
        getUsersUrl     =    prod ? 'http://localhost:4000/users'    : 'assets/json/players.json',
        getMatchesUrl   =    prod ? 'http://localhost:4000/matches'  : 'assets/json/records.json',
        getCharsUrl     =    prod ? 'assets/json/characters.json'    : 'assets/json/characters.json';

    var HttpObject = function( method, cache, url, postData ) {

        this.method = method;
        this.cache = cache;
        this.url = url;

        if ( postData ) {
            this.data = postData || {};
        }
    };

    var httpRequest = function( httpObject ) {

        return $http( httpObject )
            .then(function(response) {
// console.log(response)
                if (typeof response === 'object') {
                    return response;
                } else {
                    // invalid response
                    return $q.reject(response);
                }
            }, function(response) {

                if (response.status === 404) {
                    throw new Error("Got status: " + response.status + ". Call: " + httpObject.url);
                }
                // something went wrong
                return response;
            });

    };

    return {
        users : function( id ) {
            var url = id ? getUsersUrl + "/" + id : getUsersUrl,
                httpObject = new HttpObject( "get", true, url );

            return new httpRequest( httpObject );
        },
        matches : function( ) {
            var url = getMatchesUrl,
                httpObject = new HttpObject( "get", true, url );

            return new httpRequest( httpObject );
        },
        chars : function( ) {
            var url = getCharsUrl,
                httpObject = new HttpObject( "get", true, url );

            return new httpRequest( httpObject );
        }
    };

  }])

  .factory('smashData',
    [                   'smashAjax',
    function smashData(  smashAjax ) {
        var matches = null,
            users   = null,
            chars   = null;

    return {
        //acts as setter and getter
        users : function( data ) {

            if ( data && data instanceof Object ) {
                users = data;
            }
            return users;
        },
        //acts as setter and getter
        user : function( id ) {

            var user = users.find( function( element ) {
                return element.phoneNumber === id;
            });
            return user;
        },

        userMatches : function( id, matches ) {

            function matchesId( el ) {
                return id === el.winner || id === el.loser;
            }

            return matches.filter( matchesId );
        },

        //acts as setter and getter
        matches : function( data ) {

            if ( data && data instanceof Object ) {
                matches = data;
            } 
            return matches;
        },
        //acts as setter and getter
        chars : function( data ) {

            if ( data && data instanceof Object ) {
                chars = data;
            } 
            return chars;
        },

        char : function( id ) {
            id = id.toLowerCase();
            
            return chars[ id ];
        }

    };

  }]);
