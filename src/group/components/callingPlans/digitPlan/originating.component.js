;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanDigitPlanOriginating', {
      templateUrl:
        'group/components/callingPlans/digitPlan/originating.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '<', groupId: '<' }
    })

  function Controller(
    Alert,
    GroupOutgoingCallingPlanDigitPlanOriginatingService
  ) {
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
        console.log('originating', data)
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
        'editGroupOutgoingCallingPlanDigitPlanOriginating',
        function onSave(close) {
          update(ctrl.editDepartment, close)
        }
      )
    }

    function update(department, callback) {
      Alert.spinner.open()
      var plan = { departments: [department] }
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
})()
