angular.module("imageLazyLoader", [])
.directive(
    "lazyLoadBgSrc", 
    [        '$location', "$timeout", 
    function( $location,   $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                //watch for when image is finished loading
                //make it bg image of the element

                attrs.$observe(
                        "fancyImageLoad",
                        function( newSource ) {
                            var image = new Image();
                            image.onload = function () {
                                var bg = "url(" + newSource + ")";

                                element.css("background-image", bg );
                                
                            }

                            image.src = newSource;


 
                        }
                    );
                
            }
        };
}])
.directive(
    "lazyLoadSrc", 
    [        '$location', "$timeout", 
    function( $location,   $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                //watch for when image is finished loading
                //make it bg image of the element

                attrs.$observe(
                        "lazyLoadSrc",
                        function( newSource ) {
                            var image = new Image();
                            image.onload = function () {

                                element[ 0 ].src = newSource;
                                
                            }

                            image.src = newSource;


 
                        }
                    );
                
            }
        };
}])