;(function() {
  angular.module('odin.group').component('groupTrunkGroup', {
    templateUrl: 'group/components/trunkGroups/trunkGroup.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, GroupTrunkGroupService, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.trunkName = $routeParams.trunkName
    ctrl.$onInit = onInit
    ctrl.update = update
    ctrl.destroy = destroy

    function onInit() {
      ctrl.loading = true
      loadTrunk()
        .then(loadTrunks)
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadTrunk() {
      return GroupTrunkGroupService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.trunkName
      ).then(function(data) {
        ctrl.trunk = data
        console.log('trunk', data)
        return data
      })
    }

    function loadTrunks() {
      return GroupTrunkGroupService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.trunks = _.filter(data, function(trunk) {
          return trunk.name !== ctrl.trunkName
        }).map(function(trunk) {
          return {
            serviceProviderId: ctrl.serviceProviderId,
            groupId: ctrl.groupId,
            name: trunk.name
          }
        })
      })
    }

    function update(trunk, callback) {
      Alert.spinner.open()
      return GroupTrunkGroupService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.trunkName,
        trunk
      )
        .then(loadTrunk)
        .then(function() {
          Alert.notify.success('Trunk Group Updated')
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

    function destroy(callback) {
      if (ctrl.trunk.pilotUserId) {
        Alert.notify.danger('You must first remove the Pilot User')
        return
      }
      Alert.confirm
        .open('Are you sure you want to delete this Trunk Group?')
        .then(function() {
          Alert.spinner.open()
          GroupTrunkGroupService.destroy(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.trunkName
          )
            .then(function() {
              Alert.notify.success('Trunk Group Removed')
              if (_.isFunction(callback)) {
                callback()
              }
              Route.open(
                'groups',
                ctrl.serviceProviderId,
                ctrl.groupId,
                'trunkGroups'
              )
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }
  }
})()
