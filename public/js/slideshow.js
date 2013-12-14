// Angular app sits here. 
var slideshow = angular.module('slideshow', []).config(
		['$routeProvider', function( $routeProvider ) {
			$routeProvider.when('/');
		}]
 	)

// Create slideshow controller
slideshow.controller(
		'slideshow', function ( $scope, $http, $timeout, $route ) {

			// set the api url
			var url = 'https://api.instagram.com/v1/tags/ladieslearningcode/media/recent?access_token=257058201.9af4692.3d68e63b114944a0be332da732923a23&callback=JSON_CALLBACK',
				newReq, refreshApi;

			$scope.fetchImages = function() {

				$scope.imgCurrent = 0;

				if ( ! $route.current )
					$location.path( url );
				else if ( angular.isDefined( $route.current.params.tag ) )
					$scope.tag = $route.current.params.tag;
     
      // Use jsonp to interact with api 
				$http.jsonp(url
				).success( function( data ) {
					delete $scope.loadingClass;

					$scope.images = data.data;

					// Set the first image active
					if ( data.data.length )
						$scope.makeActiveSlide( $scope.imgCurrent );

					// Cancel the previous update request
					if ( refreshApi )
						$timeout.cancel( refreshApi );

					// Check for new images on every loop
					if ( data.data.length )
						refreshApi = $timeout( $scope.fetchImages, 6000 * data.data.length );
				}).error( function() {
					delete $scope.loadingClass;
					refreshApi = $timeout( $scope.fetchImages, 2000 );
				});
			}

			$timeout( $scope.fetchImages );

			$scope.advanceSlide = function() {
				// Use a classname to highlight the current active slide
				if ( angular.isDefined( $scope.images ) && $scope.images.length )
					$scope.makeActiveSlide( $scope.imgCurrent + 1 );
      // Set time for advancing slide
				$timeout( $scope.advanceSlide, 7000 );
			}

			// Advance slides
			$timeout( $scope.advanceSlide );

			$scope.makeActiveSlide = function( index ) {
				// Inactivate the previous slide
				delete $scope.images[ $scope.imgCurrent ].isActive;
				// Select the next slide
				$scope.imgCurrent = ( index ) % $scope.images.length;
				// Activate the next slide
				$scope.images[ $scope.imgCurrent ].isActive = true;
			}
		}
	);



