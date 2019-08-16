import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupOutgoingCallingPlanDigitPlanOriginating', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupOutgoingCallingPlanDigitPlanOriginatingService']
function controller(Alert, GroupOutgoingCallingPlanDigitPlanOriginatingService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = GroupOutgoingCallingPlanDigitPlanOriginatingService.options

  function onInit() {
    ctrl.loading = true
    loadPlan()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPlan() {
    return GroupOutgoingCallingPlanDigitPlanOriginatingService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.plan = data
      loadDigitPatterns()
      return data
    })
  }

  function loadDigitPatterns() {
    var department = ctrl.plan.departments[0]
    var patterns = _.get(department, 'digitPatterns', [])
    ctrl.digitPatterns = _.map(patterns, 'digitPatternName')
  }

  function edit(department) {
    ctrl.editDepartment = angular.copy(department)
    Alert.modal.open('editGroupOutgoingCallingPlanDigitPlanOriginating', function onSave(close) {
      update(ctrl.editDepartment, close)
    })
  }

  function update(department, callback) {
    Alert.spinner.open()
    var plan = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      departments: [department]
    }
    GroupOutgoingCallingPlanDigitPlanOriginatingService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      plan
    )
      .then(loadPlan)
      .then(function() {
        Alert.notify.success('Plan Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
