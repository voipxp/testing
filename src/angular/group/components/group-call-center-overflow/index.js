import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterOverflow', {
  template,
  controller,
  bindings: { serviceUserId: '<' }
})

controller.$inject = ['GroupCallCenterOverflowService', 'Alert', 'Module']
function controller(GroupCallCenterOverflowService, Alert, Module) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.edit = edit
  ctrl.options = GroupCallCenterOverflowService.options
  ctrl.canUpdate = Module.update('Call Center')

  function onInit() {
    ctrl.loading = true
    loadService()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onChanges(changes) {
    if (changes.serviceUserId) {
      ctrl.serviceUserId = changes.serviceUserId.currentValue
    }
  }

  function loadService() {
    return GroupCallCenterOverflowService.show(ctrl.serviceUserId).then(
      function(data) {
        ctrl.service = data
      }
    )
  }

  function edit() {
    ctrl.editService = angular.copy(ctrl.service)
    Alert.modal.open('editGroupCallCenterOverflow', function onSave(close) {
      update(ctrl.editService, close)
    })
  }

  function update(service, callback) {
    Alert.spinner.open()
    GroupCallCenterOverflowService.update(ctrl.serviceUserId, service)
      .then(loadService)
      .then(function() {
        Alert.notify.success('Overflow Updated')
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
