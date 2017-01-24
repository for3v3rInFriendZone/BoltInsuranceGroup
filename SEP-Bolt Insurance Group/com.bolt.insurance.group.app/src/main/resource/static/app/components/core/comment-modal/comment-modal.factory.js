(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.core.comment-modal')
		.factory('commentModal', commentModal);

	commentModal.$inject = ['$uibModal'];
	function commentModal($uibModal) {
		return {
			open: openCommentModal
		};

		function openCommentModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/components/core/comment-modal/comment-modal.html',
				controller: 'CommentClientController',
				controllerAs: 'ccc'
			});
			
			return modalInstance.result.then(function(newComment) {
				return newComment;
			});
		}
	}
})();