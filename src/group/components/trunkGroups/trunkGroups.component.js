;(function() {
  angular.module('odin.group').component('groupTrunkGroupTrunkGroups', {
    templateUrl: 'group/components/trunkGroups/trunkGroups.component.html',
    controller: Controller,
    require: { parent: '^groupTrunkGroups' },
    bindings: { serviceProviderId: '=', groupId: '=', module: '<' }
  })

  function Controller(
    $routeParams,
    Route,
    $location,
    Alert,
    GroupTrunkGroupService
  ) {
    var ctrl = this
    ctrl.$onInit = activate

    function activate() {
      ctrl.open = ctrl.parent.open
      ctrl.add = ctrl.parent.add
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
      return GroupTrunkGroupService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.trunks = data
        console.log('trunks', data)
        return data
      })
    }
  }
})()
