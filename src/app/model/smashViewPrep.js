'use strict';

angular.module('smash.viewPrep', [])

  .factory('smashViewPrep',
    [           'rankingsViewPrep', 'profileViewPrep',
    function (   rankingsViewPrep,   profileViewPrep ) {

        return {
            rankings : rankingsViewPrep,
            profile  : profileViewPrep.get
        };

    }])

  .factory('profileViewPrep',
    [         'smashData',
    function ( smashData ) {

        /**
         * @desc Constructor to be called with "new" operator. Represents basic 
         *     skeleton of what this factory produces to be used by the view. 
         * @return {Object}.
         */
        function ProfileViewModel() {

         return {
                user    : {},
                record  : {
                    total : { 
                        wins: null, 
                        losses: null
                    }
                },
                chars   : [],
                matches : []
            }
        }

        /**
         * @desc Returns a set of characters from an array of matches based on user
         *      id. Abstracts away the JS ForEach Array function.
         * @param {Array.<match>} arg1 List of user's matches
         * @param {string} arg2 Id used to know which character in the match belongs
         *     to the user.
         * @return {Object} set of characters user has had matches with.
         */
        function makeCharSet( matches, userId ){
            var charSet = {
                id : userId
            }

            matches.forEach( addCharToSetFromMatch, charSet );
            delete charSet.id;

            return charSet;
        }
            /**
             * @desc ForEach Array function used to Add the character associated with 
             *     user id found in this.id. Used by "makeCharSet". Char key is
             *     given a 'record' (wins/losses) value ( [ wins,losses ] ) which is
             *     either initialized or added to.
             * @param element value,  index, and array being traversed. Passed from
             *     ForEach Array function
             */
            function addCharToSetFromMatch( el ){
                var char = "";

                if ( isWinner( el, this.id ) ) {

                    char = el.wChar.toLowerCase();
                    this[ char ] = this[ char ] ? 
                                   combineRecords.call( this[ char ] , [ 1, 0 ] ) :
                                   [ 1, 0 ];
                } else {

                    char = el.lChar.toLowerCase();
                    this[ char ] = this[ char ] ? 
                                   combineRecords.call( this[ char ] , [ 0, 1 ] ) :
                                   [ 0, 1 ];
                }
            }

                /**
                 * @desc Adds two records together. A record takes the form of a two-
                 *    dimensional array. index 0 representing wins and index 1 repre-
                 *    senting losses. [ wins, losses ]. Currently set up to be "Called"
                 *    and passed a context to add to.
                 * @param {Array} arg1 Record to combine with.
                 * @return {Array} the result of the combined records.
                 */
                function combineRecords( record ) {

                    for (   var i = 0, 
                                l = this.length; 
                            i < l; i++) {

                        this[ i ] += record[ i ]; 
                    }

                    return this;
                }

        /**
         * @desc Abstraction for Map Array function in order to have user id available
         *      as 'this'.
         * @param {Array.<match>} arg1 List of matches user played in
         * @param {string} arg2 user Id
         * @return {Array} List of user's matches curated for profile view.
         */
        function makeUserMatchesModel( matches, userId ){

            return matches.map( convertMatch, { id : userId } );

        }
            /**
            * @desc Used by Map Array function to extract data from match and make one
            *      more friendly for user profile match list view.
            * @param {Array.<match>} arg1 List of matches user played in
            * @return {Object} New User match model object.
            */
            function convertMatch( el ) {

                if ( isWinner(el, this.id) ) {

                    return new UserMatchModel( smashData.char(el.wChar), 
                                               smashData.user(el.loser), 
                                               smashData.char(el.lChar), 
                                               true, 
                                               el.wStocksLeft);
                } else {

                    return new UserMatchModel( smashData.char(el.lChar), 
                                               smashData.user(el.winner), 
                                               smashData.char(el.wChar), 
                                               false, 
                                               el.wStocksLeft);
                }

            }

            /**
            * @desc Object used by user profile view in ng-repeat "match in matches"
            * @return {Object} User match model object.
            */
            function UserMatchModel (char, opp, oppChar, win, stocks) {
                return {
                    char         : char,
                    opponent     : opp,
                    opponentChar : oppChar,
                    win          : win,
                    stocksLeft   : stocks
                }
            }

        /**
         * @desc Simple function used as abstraction.
         * @param {Object} arg1 Match Object.
         * @param {string} arg2 id (phone number) of user.
         * @return {Boolean} true if id matches winner id, false if not.
        */            
        function isWinner( match, id ) {
            return match.winner === id;
        }
        return {
            get : function( user, matches ) {
                var profileViewModel = new ProfileViewModel();
                profileViewModel.user = user;
                // profileViewModel.matches = matches;

                var charSet = makeCharSet( matches, user.phoneNumber );

                for ( key in charSet ) {
                    profileViewModel.chars.push(smashData.char(  key  ));
                }


                profileViewModel.matches = makeUserMatchesModel( matches, user.phoneNumber );
                // console.log(profileViewModel);
                return profileViewModel;
            }
        };

    }])

  .factory('rankingsViewPrep',
    [         'smashData',
    function ( smashData ) {

        function combineRecords( record ) {

            for (   var i = 0, 
                        l = this.length; 
                    i < l; i++) {

                this[ i ] += record[ i ]; 
            }

            return this;
        }

        function updateSet( key , value ) {

            this[ key ] =   ( key in this ) ? 
                            combineRecords.call( this[ key ] , value ) :
                            value;
        }

        function makeUserCharSet( element, index, array ) {
            var winnerKey = element.winner + ":" + element.wChar.toLowerCase(),
                loserKey = element.loser + ":" + element.lChar.toLowerCase();

            updateSet.call( this, winnerKey, [ 1, 0 ] );
            updateSet.call( this, loserKey, [ 0, 1 ] );
        }

        function RankingObject( record, key ) {

            var ids = key.split(":");

            this.record = record;
            this.user   = smashData.user( ids[ 0 ] );
            this.char   = smashData.char( ids[ 1 ] ); 
        }

        /***********************************************************************
            [ 0 ] = wins
            [ 1 ] = losses
        ***********************************************************************/  
        function isBetter( record ) {
            var thisTotal = this[ 0 ] + this[ 1 ],
                recordTotal = record[ 0 ] + record[ 1 ],
                thisPercent = this[ 0 ] / thisTotal,
                recordPercent = record[ 0 ] / recordTotal;

            if ( thisPercent  <  recordPercent ) {
                return true;
            } else if ( thisPercent === recordPercent ) {
                //TODO: if they are equal, insert user with most recent match first
                return ( thisTotal < recordTotal ) ? true : false; 
            } else {
                return false;
            }
        }

        function insertRanking( ranking ) {
            var pos = this.length;
            for ( var i = 0, l = this.length; i < l; i++ ) {

                if ( isBetter.call( this[ i ].record, ranking.record ) ) {
                    // console.log( this[i].record )
                    // console.log( ranking.record )
                    pos = i;
                    break;
                }
            }
            this.splice( pos, 0, ranking );

        }

        function buildRankingsList( set, users ) {

            var rankings = [],
                rankingObj = {};

            for ( var key in set ) {

                //make ranking obj
                rankingObj = new RankingObject( set[ key ], key);
                insertRanking.call( rankings, rankingObj );
            }
            
            return rankings;
        }

        return {
            byUserCharacter : function( ) {

                //make userCharacters object
                var userCharRecords = {},
                    rankingsList = [];

                smashData.matches().forEach( makeUserCharSet, userCharRecords);

                //sort userCharacters object by win %
                rankingsList = buildRankingsList( userCharRecords );

                return {
                    bgImage : rankingsList[ 0 ].char.realisticImgPath,
                    rankingList : rankingsList
                };
            }
        };

    }]);
