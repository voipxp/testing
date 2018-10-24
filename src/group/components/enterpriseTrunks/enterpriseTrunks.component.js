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
      ctrl.canCreate = ctrl.module.permissions.create
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
        return data
      })
    }

    function onSave(trunk) {
      open(trunk.enterpriseTrunkName)
    }

    function open(trunk) {
      var trunkName = (trunk && trunk.enterpriseTrunkName) || trunk
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'enterpriseTrunks',
        trunkName
      )
    }

    function add() {
      if (!ctrl.canCreate) return
      $scope.$broadcast('groupEnterpriseTrunkCreate:load')
    }
  }
})()
