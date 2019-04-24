import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterStrandedCall', {
  template,
  controller,
  bindings: { serviceUserId: '<' }
})

controller.$inject = ['GroupCallCenterStrandedCallService', 'Alert', 'Module']
function controller(GroupCallCenterStrandedCallService, Alert, Module) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.edit = edit
  ctrl.options = GroupCallCenterStrandedCallService.options
  ctrl.actionDescription = actionDescription
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

  function actionDescription(key) {
    var action = _.find(GroupCallCenterStrandedCallService.options.action, {
      key: key
    })
    if (action) {
      return action.description
    }
  }

  function loadService() {
    return GroupCallCenterStrandedCallService.show(ctrl.serviceUserId).then(
      function(data) {
        ctrl.service = data
      }
    )
  }

  function edit() {
    ctrl.editService = angular.copy(ctrl.service)
    Alert.modal.open('editGroupCallCenterStrandedCall', function onSave(close) {
      update(ctrl.editService, close)
    })
  }

  function update(service, callback) {
    Alert.spinner.open()
    GroupCallCenterStrandedCallService.update(ctrl.serviceUserId, service)
      .then(loadService)
      .then(function() {
        Alert.notify.success('Stranded Call Updated')
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
