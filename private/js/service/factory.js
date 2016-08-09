marvel.factory('heroFactory', function($http, $q) {

  var ts =  Date.now();
  var baseURL = 'http://gateway.marvel.com:80';
  var charURL = '/v1/public/characters';
  var pub = '298bab46381a6daaaee19aa5c8cafea5';
  var priv = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
  var hash = calcMD5(ts+priv+pub);

  var factory = {
      heroes : false,

      getHeroes : function(offset){
        var deferred = $q.defer();
    

        if(factory.heroes != false) {
          deferred.resolve(factory.heroes.data);
        } else {
          $http.get(baseURL + charURL, {
            params: {
              limit: 50,
              offset: offset,
              ts: ts,
              apikey: pub,
              hash: hash
            }
          })
          .success(function(data, status){
            factory.heroes = data;

            deferred.resolve(factory.heroes.data)
          })
          .error(function(data, status){
            deferred.reject('Impossible de récupérer les données')
          });
        }

        return deferred.promise;
      },

      getHero : function(id){
        var deferred = $q.defer();

        var hero = {};

        var heroes = factory.getHeroes().then(function(heroes){
          angular.forEach(heroes.results, function(value, key) {
            if(value.id == id) {
              hero = value;
            }
          });
          deferred.resolve(hero);
        }, function(msg){
          deferred.reject(msg);
        });

        return deferred.promise;
      },



    }

    return factory;
});
