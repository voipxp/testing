;(function() {
  angular.module('odin.group').component('groupEnterpriseTrunks', {
    templateUrl:
      'group/components/enterpriseTrunks/enterpriseTrunks.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Route,
    Alert,
    GroupEnterpriseTrunkService,
    $scope,
    ACL
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.add = add
    ctrl.onSave = onSave
    ctrl.$onInit = activate
    ctrl.isServiceProvider = ACL.has('Service Provider')

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
      return GroupEnterpriseTrunkService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.trunks = data
        console.log('Trunks', data)
        return data
      })
    }

    function onSave(trunk) {
      open(trunk.enterpriseTrunkName)
    }

    function open(trunk) {
      var trunkName = (trunk && trunk.enterpriseTrunk) || trunk
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'enterpriseTrunks',
        trunkName
      )
    }

    function add() {
      $scope.$broadcast('groupEnterpriseTrunkCreate:load')
    }
  }
})()
