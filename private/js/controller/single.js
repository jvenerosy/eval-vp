marvel.controller('heroController', function($scope, heroFactory, $routeParams) {

  $scope.loading = true;

  $scope.posts = heroFactory.getHero($routeParams.id).then(function(hero) {
    $scope.loading = false;
    $scope.hero = hero;

    console.log(hero);
  }, function(msg){
    alert(msg);
  });

});
