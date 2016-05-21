'use strict';

// Directives for common buttons
angular.module(ApplicationConfiguration.applicationModuleName).controller('ImportKeycloakUsersController', function ($scope, KcUser, Auth) {

  $scope.working = false;

  $scope.auth = Auth;

  $scope.user = {};
  $scope.usersString = undefined;
  $scope.usersJson = [];

  $scope.addUser = function () {
    $scope.usersJson.push($scope.user);
    $scope.user = {};
  };
  $scope.addToJson = function () {
    var usersString = JSON.parse($scope.usersString);
    if(angular.isArray(usersString)) {
      $scope.usersJson = $scope.usersJson.concat(usersString);
    } else {
      $scope.usersJson.push(usersString);
    }
  };
  $scope.removeFromJson = function (index) {
    $scope.usersJson.splice(index, 1);
  };


  $scope.save = function() {
    $scope.working = true;
    for(var i = 0; i < $scope.usersJson.length; i++) {
      $scope.singleSave(i);
    }
  };
  $scope.singleSave = function (index) {
    var row = $scope.usersJson[index];
    row.working = true;

    var user = KcUser.$build();
    user.username = row.username;
    user.enabled = true;
    
    user.$save().then(function (response) {
      row.working = false;
      row.createdResult = true;
      row.createdMessage = 'Created successfully';
      $scope.updateCredentials(index);
    }, function error(err) {
      row.working = false;
      row.createdResult = false;
      row.createdMessage = err.data.errorMessage;
      $scope.updateCredentials(index);
    });
  };

  $scope.updateCredentials = function (index) {
    var row = $scope.usersJson[index];
    row.working = true;

    KcUser.$getAll({username: row.username}).then(function (response) {
      response.forEach(function (user) {
        var userTosetCredential = KcUser.$build();
        userTosetCredential.id = user.id;
        userTosetCredential.$resetPassword({temporary: true, type: 'password', value: row.password}).then(function () {
          row.working = false;
          row.credentialResult = true;
          row.credentialMessage = 'Password setted successfully';
        }, function error(err) {
          row.working = false;
          row.credentialResult = false;
          row.credentialMessage = err.data.errorMessage;
        });
      });
    }, function error(err) {
      row.working = false;
      row.credentialResult = false;
      row.credentialMessage = err.data.errorMessage;
    });
  };



});
