;(function() {
  angular.module('odin.group').component('groupIncomingCallingPlan', {
    templateUrl:
      'group/components/callingPlans/incoming/incoming.component.html',
    controller: Controller
  })

  function Controller(
    $routeParams,
    Alert,
    GroupIncomingCallingPlanService,
    Module
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.$onInit = activate

    ctrl.options = GroupIncomingCallingPlanService.options
    ctrl.edit = edit

    function activate() {
      Module.show('Incoming Calling Plan').then(function(module) {
        ctrl.module = module
      })
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return GroupIncomingCallingPlanService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('plan', data)
        ctrl.plan = data
        return data
      })
    }

    function edit(department) {
      ctrl.editDepartment = angular.copy(department)
      Alert.modal.open('editGroupIncomingCallingPlan', function onSave(close) {
        update(ctrl.editDepartment, close)
      })
    }

    function update(department, callback) {
      var plan = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        departments: [department]
      }
      Alert.spinner.open()
      GroupIncomingCallingPlanService.update(
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
