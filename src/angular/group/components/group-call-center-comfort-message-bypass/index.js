import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterComfortMessageBypass', {
  template,
  controller,
  bindings: { serviceUserId: '<' }
})

controller.$inject = ['GroupCallCenterComfortMessageBypassService', 'Alert']
function controller(GroupCallCenterComfortMessageBypassService, Alert) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.edit = edit

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
    return GroupCallCenterComfortMessageBypassService.show(
      ctrl.serviceUserId
    ).then(function(data) {
      ctrl.service = data
    })
  }

  function edit() {
    ctrl.editService = angular.copy(ctrl.service)
    Alert.modal.open('editGroupCallCenterComfortMessageBypass', function(
      close
    ) {
      update(ctrl.editService, close)
    })
  }

  function update(service, callback) {
    Alert.spinner.open()
    GroupCallCenterComfortMessageBypassService.update(
      ctrl.serviceUserId,
      service
    )
      .then(loadService)
      .then(function() {
        Alert.notify.success('Comfort Message Bypass Updated')
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
