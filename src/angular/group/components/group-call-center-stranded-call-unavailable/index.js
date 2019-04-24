import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupCallCenterStrandedCallUnavailable', {
    template,
    controller,
    bindings: { serviceUserId: '<' }
  })

controller.$inject = [
  'GroupCallCenterStrandedCallUnavailableService',
  'Alert',
  'Module'
]
function controller(
  GroupCallCenterStrandedCallUnavailableService,
  Alert,
  Module
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.edit = edit
  ctrl.options = GroupCallCenterStrandedCallUnavailableService.options
  ctrl.actionDescription = actionDescription
  ctrl.updateRestrictions = updateRestrictions
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
    var action = _.find(
      GroupCallCenterStrandedCallUnavailableService.options.action,
      { key: key }
    )
    if (action) {
      return action.description
    }
  }

  function updateRestrictions() {
    if (
      !ctrl.editService
        .conditionPolicyOnNumberOfAgentsWithSpecifiedUnavailableCode
    ) {
      ctrl.editService.numberOfAgentsWithSpecifiedUnavailableCode = null
      ctrl.editService.agentsUnavailableCode = null
    }
  }

  function loadService() {
    return GroupCallCenterStrandedCallUnavailableService.show(
      ctrl.serviceUserId
    ).then(function(data) {
      ctrl.service = data
    })
  }

  function edit() {
    ctrl.editService = angular.copy(ctrl.service)
    Alert.modal.open(
      'editGroupCallCenterStrandedCallUnavailable',
      function onSave(close) {
        update(ctrl.editService, close)
      }
    )
  }

  function update(service, callback) {
    Alert.spinner.open()
    GroupCallCenterStrandedCallUnavailableService.update(
      ctrl.serviceUserId,
      service
    )
      .then(loadService)
      .then(function() {
        Alert.notify.success('Stranded Call Updated Unavailable')
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
