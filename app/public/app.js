var app = angular.module('TwitterApp', ['ngSanitize']);

app.controller('myCtrlSearch', function($scope, TwitterSearch){
  $scope.doSearch = function(searchQ){
    TwitterSearch.doSearch(searchQ)
    .then(function(data){
      $scope.twitterErrors = undefined;
      $scope.results = JSON.parse(data.result.userData);
    })
    .catch(function(error){
      $scope.twitterErrors = error.error;
    })
  }
});
app.factory('TwitterSearch', function($http, $q){
  var doSearch = function(filterQ){
    var d = $q.defer();
    $http.post('/twitter/search', {filterQ : filterQ})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };
  return {
    doSearch : doSearch
  }
});
// Customer Filter (buttons) Directive
app.directive('btnAttrClick', function(){
  function link(scope, element, attr, myCtrlSearch){
    element.on('click', function(){
      var filterQ = attr.filter;
      scope.doSearch(filterQ);
    })
  }
  return {
    link: link
  };
});