;(function() {
  angular.module('odin.group').component('groupEnterpriseTrunk', {
    templateUrl:
      'group/components/enterpriseTrunks/enterpriseTrunk.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route, Alert, GroupEnterpriseTrunkService) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.trunkName = $routeParams.trunkName
    ctrl.$onInit = activate
    ctrl.update = update
    ctrl.destroy = destroy

    function activate() {
      ctrl.loading = true
      loadTrunk()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadTrunk() {
      return GroupEnterpriseTrunkService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.trunkName
      ).then(function(data) {
        ctrl.trunk = data
        return data
      })
    }

    function update(trunk, callback) {
      Alert.spinner.open()
      GroupEnterpriseTrunkService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.trunkName,
        trunk
      )
        .then(loadTrunk)
        .then(function() {
          Alert.notify.success('Enterprise Trunk Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(callback) {
      Alert.spinner.open()
      GroupEnterpriseTrunkService.destroy(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.trunkName
      )
        .then(function() {
          Alert.notify.warning('Enterprise Trunk Removed')
          callback()
          Route.open(
            'groups',
            ctrl.serviceProviderId,
            ctrl.groupId,
            'enterpriseTrunks'
          )
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
