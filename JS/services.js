hsgAdminApp.factory('studentService', function($http) {
  var studentService = {};
  var apiUrl = 'http://ec2-52-30-62-85.eu-west-1.compute.amazonaws.com:8080';
  studentService.getCities = function(callback) {
    return $http.get(apiUrl + '/api/cities').then(function(response) {
      return response.data;
    });
  };

  studentService.getRoles = function(callback) {
    return $http.get(apiUrl + '/api/roles').then(function(response) {
      return response.data;
    });
  };
  studentService.getStudents = function(data){
    return $http.get(apiUrl + '/api/students').then(function(response)
    {
        return response.data;
    });
  };

  studentService.addComment = function(data){
    var addCommentUrl = apiUrl + '/api/students/' + data.studentId + '/comments';
    return $http.post(addCommentUrl,data.newComment).then(function(data,status,headers){
      console.log("Comment Added");
      return data;
    })
  };

  studentService.deleteComment = function(studentId, commentId){
    var deleteCommentUrl = apiUrl + '/api/api/students/' + studentId + '/comments/' + commentId;
    console.log(deleteCommentUrl)
    return $http.delete(deleteCommentUrl).then(function(response){
      return response;
    });
  };

 return studentService;
});
