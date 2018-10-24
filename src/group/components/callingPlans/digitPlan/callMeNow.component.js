;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanDigitPlanCallMeNow', {
      templateUrl:
        'group/components/callingPlans/digitPlan/callMeNow.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '<', groupId: '<' }
    })

  function Controller(
    Alert,
    GroupOutgoingCallingPlanDigitPlanCallMeNowService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = GroupOutgoingCallingPlanDigitPlanCallMeNowService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return GroupOutgoingCallingPlanDigitPlanCallMeNowService.show(
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
      Alert.modal.open(
        'editGroupOutgoingCallingPlanDigitPlanCallMeNow',
        function onSave(close) {
          update(ctrl.editDepartment, close)
        }
      )
    }

    function update(department, callback) {
      Alert.spinner.open()
      var plan = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        departments: [department]
      }
      GroupOutgoingCallingPlanDigitPlanCallMeNowService.update(
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
})()
