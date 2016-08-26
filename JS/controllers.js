hsgAdminApp.controller('StudentController', function($scope,$filter,studentService) {

	$scope.orderByField = 'dateOfCreation';
	$scope.reverseSort = false;

	var getStudents = function(){
		studentService.getStudents().then(function(allStudents){
			allStudents.allStudent.forEach(function(student) {
    		student.creationDate = new Date(student.creationDate).toLocaleString('en-GB');
				console.log(student);
			});
			$scope.students = allStudents;
		})
	};
	getStudents();
	$scope.ShowComment = false;
	var authenticatedPerson = "Andreas Lundsten";
	$scope.toggleComment = function(student){
		if(student.showComment=true) student.showComment=false;
		else student.showComment=true;
	}

	$scope.selectOrder = function (order) {
    order.IsSelectedOrder = true;
}
	$scope.addComment = function(studentId, commentText) {
		var commentData = buildCommentData(studentId, commentText);
		studentService.addComment(commentData).then(function(response){
			console.log(response);
			commentData.newComment.creationDate = new Date();
			findStudentById(studentId).comments.push(commentData.newComment);
		});
	};
$scope.deleteComment = function(studentId, commentId){
	studentService.deleteComment(studentId,commentId).then(function(response){
		var student = findStudentById(studentId)
		for (var i = 0; i < student.comments.length; i ++) {
		    if (student.comments[i]._id == commentId) {
		        student.comments.splice(i, 1);
		        break;
		    }
		}
	})
}

	var findStudentById = function(studentId){
		for (var i = 0; i < $scope.students.allStudent.length; i++) {
			if($scope.students.allStudent[i]._id == studentId){
				return $scope.students.allStudent[i];
			}
		}
	}
	var buildCommentData = function(studentId, commentText){
		var newCommentData = {
			studentId : studentId,
			newComment : {
				commentText : commentText,
				authur : authenticatedPerson
			}
		}
		return newCommentData;
	};
});
