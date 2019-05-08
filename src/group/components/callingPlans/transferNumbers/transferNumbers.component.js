;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanTransferNumbers', {
      templateUrl:
        'group/components/callingPlans/transferNumbers/transferNumbers.component.html',
      controller: Controller
    })

  function Controller(
    $routeParams,
    Alert,
    GroupOutgoingCallingPlanTransferNumberService
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.$onInit = activate
    ctrl.edit = edit

    function activate() {
      ctrl.loading = true
      loadDepartments()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDepartments() {
      return GroupOutgoingCallingPlanTransferNumberService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function edit(department) {
      ctrl.editDepartment = angular.copy(department)
      Alert.modal.open(
        'editGroupOutgoingCallingPlanTransferNumber',
        function onSave(close) {
          update(ctrl.editDepartment, close)
        }
      )
    }

    function update(department, callback) {
      var plan = { departments: [department] }
      Alert.spinner.open()
      GroupOutgoingCallingPlanTransferNumberService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        plan
      )
        .then(loadDepartments)
        .then(function() {
          Alert.notify.success('Department Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()