(function() {
	'use strict';

	angular.module('bolt-insurance-group.core').controller('BigController',
			BigController);

	BigController.$inject = ['$scope', '$http', '$translate', '$fancyModal', 'commentModal'];
	function BigController($scope, $http, $translate, $fancyModal, commentModal) {

		$scope.listOfComments = [];
		$scope.newCommentsFlag = false;
		
		$http.get('https://localhost:8443/comment').then(function(response) {
			$scope.listOfComments = response.data;
		});

		$scope.animateElementIn = function($el) {

			var animation = $el.attr('data-animation');

			// For some browsers, `attr` is undefined; for others, `attr` is
			// false. Check for both.
			if (typeof animation !== typeof undefined && animation !== false) {
				$el.removeClass('not-visible');
				$el.addClass('animated ' + animation);
			}

		};

		$scope.changeLanguage = function(key) {
			$translate.use(key);
		};
		
		$scope.newComment = function() {
			/*$fancyModal.open({ templateUrl: 'app/components/core/comment-modal/comment-modal.html',
							   controller: 'CommentClientController as ccc'});   
			$http.get('https://localhost:8443/comment').then(function(response) {
				$scope.listOfComments = response.data;
			});
			*/
			commentModal.open().then(function(comment){
				$scope.listOfComments.push(comment);
			});
		}
		
	}
})();
