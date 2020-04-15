import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroup', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' , trunkName: '<' }
})

controller.$inject = ['ACL', '$location', 'Alert', 'GroupTrunkGroupService', 'Route']
function controller(ACL, $location, Alert, GroupTrunkGroupService, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.update = update
  ctrl.destroy = destroy
  ctrl.back = back
  function onInit() {
    // ctrl.trunkName = $location.search().trunkName
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

  function back() {
    if(ACL.is('Group Department')) {
      Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'trunkGroups')
    } else if(ACL.is('Group')){
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'groupService')
    }else{
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'trunkGroups')
    }
  }

}
