marvel.controller('homeController', function($scope, heroFactory, $routeParams, $route) {

  $scope.loading = true;

  var offset = ($routeParams.offset) ?  $routeParams.offset : 0;


  $scope.posts = heroFactory.getHeroes(offset).then(function(heroes) {
	  $scope.loading = false;
	  $scope.heroes = heroes.results;
	  $scope.numPerPage = 50;
	  $scope.offset = offset;

	  var total = heroes.total;
	  var numberPage = Math.ceil(total/$scope.numPerPage);
	  var pages = [];

	  for(i=0; i< numberPage; i++) {
	  	pages.push(i);
	  }

	  $scope.pages = pages;

	}, function(msg){
	  alert(msg);
});

$scope.reloadRoute = function() {
  window.location.reload();
}

});
