var app = angular.module('legList', []);

var apiKey = '3cdfa27b289e4d4090fd1b176c45e6cf';

app.controller('LegislatorController', function($scope, $http) {
  $scope.state = 'al';
  $scope.chamber = 'lower';

  var getNewList = function() {
    $http({
      method: 'JSONP',
      url: 'http://openstates.org/api/v1/legislators/?state='+$scope.state+'&chamber='+$scope.chamber+'&active=true&apikey='+apiKey+'&callback=JSON_CALLBACK'
    }).success(function(data, status) {
      $scope.legislators = data;
    }).error(function(data, status) {
      // Error
    });
  }

  //Get list of states to populate the dropdown menu
  $http({
    method: 'JSONP',
    url: 'http://openstates.org/api/v1/metadata/?apikey='+apiKey+'&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.states = data;
  }).error(function(data, status) {
    // Error
  });

  // Update legislator list once a state is selected
  $scope.$watch('state', function() {
    getNewList();
  });

  // Update legislator list once a chamber is selected
  $scope.$watch('chamber', function() {
    getNewList();
  });
});
