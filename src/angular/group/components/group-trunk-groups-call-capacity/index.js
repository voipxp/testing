import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupsCallCapacity', {
  template,
  controller,
  bindings: { serviceProviderId: '=', groupId: '=', module: '<' }
})

controller.$inject = ['Alert', 'GroupTrunkGroupCallCapacityService', 'ACL']
function controller(Alert, GroupTrunkGroupCallCapacityService, ACL) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.displayMax = displayMax
  ctrl.calcMax = calcMax
  ctrl.calcMin = calcMin
  ctrl.edit = edit
  ctrl.settings = {}
  ctrl.hasPermission = ACL.has

  function activate() {
    ctrl.loading = true
    loadCallCapacity()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function displayMax(attribute) {
    var value = ctrl.settings[attribute]
    return value === -1 ? 'Unlimited' : value
  }

  function calcMax(attribute) {
    var value = ctrl.settings[attribute]
    return value === -1 ? 99999 : value
  }

  function calcMin(attribute) {
    var value = ctrl.settings[attribute]
    return value === -1 ? -1 : 0
  }

  function loadCallCapacity() {
    return GroupTrunkGroupCallCapacityService.show(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.settings = data
        return data
      }
    )
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupTrunkGroupCallCapacity', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    GroupTrunkGroupCallCapacityService.update(ctrl.serviceProviderId, ctrl.groupId, settings)
      .then(loadCallCapacity)
      .then(function() {
        Alert.notify.success('Call Capacity Updated')
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
