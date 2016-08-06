marvel.controller('homeController', function($scope, heroFactory) {

  $scope.loading = true;

  $scope.posts = heroFactory.getHeroes().then(function(heroes) {
    $scope.loading = false;
    $scope.heroes = heroes;

    var numPerPage = 20;
    var numberPage = Math.ceil(2/8);

  }, function(msg){
    alert(msg);
  });

});
