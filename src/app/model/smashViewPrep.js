'use strict';

angular.module('smash.viewPrep', [])

  .factory('smashViewPrep',
    [           'rankingsViewPrep',
    function (   rankingsViewPrep ) {

        return {
           rankings : rankingsViewPrep
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
