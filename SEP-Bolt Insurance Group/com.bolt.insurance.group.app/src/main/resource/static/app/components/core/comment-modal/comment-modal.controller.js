(function() {
	'use strict';

	angular.module('bolt-insurance-group.core').controller('CommentClientController',
			CommentClientController);

	CommentClientController.$inject = ['$scope', '$http', '$fancyModal', '$uibModalInstance'];
	function CommentClientController($scope, $http, $fancyModal, $uibModalInstance) {
		
		var ccc = this;
		
		ccc.ok = ok;
		ccc.cancel = cancel;
		
		function cancel() {
			$uibModalInstance.dismiss();
		}
		
		function ok() {
			$http.post('https://localhost:8443/comment', ccc.clientComment).then(function(response) {
				$uibModalInstance.close(response.data);
			});
			
		}
		
		
	}
})();
