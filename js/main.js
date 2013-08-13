var app = angular.module('underwood', []);

var apiKey = '3cdfa27b289e4d4090fd1b176c45e6cf';

app.controller('LegislatorController', function($scope, $http) {
  $scope.state = 'al';
  $scope.chamber = 'lower';
  $scope.undecidedCount = null;

  var processNewData = function(data) {
    for (i=0; i<data.length; i++) {
      var id = data[i]['transparencydata_id'];
      $scope[id] = {};
      $scope[id]['id'] = data[i]['transparencydata_id'];
      $scope[id]['last_name'] = data[i]['last_name'];
      $scope[id]['party'] = data[i]['party'];
      $scope[id]['vote'] = 'undecided';
      $scope.undecidedCount += 1;
      $scope.legislators.push($scope[id]);
    };
  };

  $scope.changeVote = function(id) {
    $scope[id]['vote'] = 'leanYes';
  };

  var getNewList = function() {
    $scope.undecidedCount = null;
    $scope.legislators = [];
    $http({
      method: 'JSONP',
      url: 'http://openstates.org/api/v1/legislators/?state='+$scope.state+'&chamber='+$scope.chamber+'&active=true&apikey='+apiKey+'&callback=JSON_CALLBACK'
    }).success(function(data, status) {
      processNewData(data);
    }).error(function(data, status) {
      // Error
    });
  };

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
