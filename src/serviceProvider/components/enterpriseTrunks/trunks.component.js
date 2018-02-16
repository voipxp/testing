;(function() {
  angular
    .module('odin.serviceProvider')
    .component('enterpriseEnterpriseTrunks', {
      templateUrl:
        'serviceProvider/components/enterpriseTrunks/trunks.component.html',
      controller: Controller,
      bindings: { module: '<' }
    })

  function Controller(
    $routeParams,
    Route,
    Alert,
    EnterpriseEnterpriseTrunkService,
    $scope
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.open = open
    ctrl.add = add
    ctrl.onSave = onSave
    ctrl.$onInit = activate

    function activate() {
      ctrl.loading = true
      loadTrunks()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadTrunks() {
      return EnterpriseEnterpriseTrunkService.index(
        ctrl.serviceProviderId
      ).then(function(data) {
        ctrl.trunks = data
        console.log('trunks', data)
        return data
      })
    }

    function onSave(trunk) {
      open(trunk.enterpriseTrunkName)
    }

    function open(trunk) {
      var trunkName = (trunk && trunk.enterpriseTrunk) || trunk
      Route.open(
        'serviceProviders',
        ctrl.serviceProviderId,
        'enterpriseTrunks'
      )(trunkName)
    }

    function add() {
      $scope.$broadcast('enterpriseEnterpriseTrunkCreate:load')
    }
  }
})()
