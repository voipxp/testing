;(function() {
  angular.module('odin.trunkgroup', [])

  angular
    .module('odin.trunkgroup')
    .config(function routeConfig($routeProvider) {
      $routeProvider
        .when('/trunking/enterprise', {
          templateUrl: 'trunkgroup/enterprise-trunks.tpl.html',
          controller: 'EnterpriseTrunksController',
          controllerAs: 'vm'
        })
        .when('/trunking/enterprise/:trunkName', {
          templateUrl: 'trunkgroup/enterprise-trunk.tpl.html',
          controller: 'EnterpriseTrunkController',
          controllerAs: 'vm'
        })
        .when('/trunking/group', {
          templateUrl: 'trunkgroup/group-trunks.tpl.html',
          controller: 'GroupTrunksController',
          controllerAs: 'vm'
        })
        .when('/trunking/group/:trunkName', {
          templateUrl: 'trunkgroup/group-trunk.tpl.html',
          controller: 'GroupTrunkController',
          controllerAs: 'vm'
        })
    })
})()
