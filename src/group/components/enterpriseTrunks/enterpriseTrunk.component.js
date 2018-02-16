;(function() {
  angular.module('odin.group').component('groupEnterpriseTrunk', {
    templateUrl:
      'group/components/enterpriseTrunks/enterpriseTrunk.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Route,
    $location,
    Session,
    Alert,
    GroupEnterpriseTrunkService
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.trunkName = $routeParams.trunkName
    ctrl.$onInit = activate
    ctrl.update = update

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
        console.log('loadTrunk', data)
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
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
