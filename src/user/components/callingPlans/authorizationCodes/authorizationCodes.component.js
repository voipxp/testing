;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanAuthorizationCodes', {
      templateUrl:
        'user/components/callingPlans/authorizationCodes/authorizationCodes.component.html',
      controller: Controller,
      bindings: { userId: '<' }
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanAuthorizationCodeService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.toggle = toggle
    ctrl.remove = remove

    function onInit() {
      ctrl.loading = true
      load()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function load() {
      return $q.all([loadSettings(), loadCodes()])
    }

    function loadSettings() {
      return UserOutgoingCallingPlanAuthorizationCodeService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
        ctrl.editPlan = angular.copy(ctrl.plan)
        console.log('plan', data)
      })
    }

    function loadCodes() {
      return UserOutgoingCallingPlanAuthorizationCodeService.index(
        ctrl.userId
      ).then(function(data) {
        ctrl.codes = data
        console.log('codes', data)
      })
    }

    function toggle() {
      ctrl.isUpdating = true
      UserOutgoingCallingPlanAuthorizationCodeService.update(
        ctrl.userId,
        ctrl.editPlan
      )
        .then(load)
        .then(function() {
          Alert.notify.success('Authorization Code Updated')
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.isUpdating = false
        })
    }

    function add() {
      ctrl.newCode = {}
      Alert.modal.open('addOutgoingCallingPlanAuthorizationCode', function(
        close
      ) {
        create(ctrl.newCode, close)
      })
    }

    function create(code, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanAuthorizationCodeService.create(ctrl.userId, code)
        .then(loadCodes)
        .then(function() {
          Alert.notify.success('Authorization Code Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function remove(code) {
      Alert.confirm
        .open('Are you sure you want to remove this code?')
        .then(function() {
          Alert.spinner.open()
          UserOutgoingCallingPlanAuthorizationCodeService.destroy(
            ctrl.userId,
            code.code
          )
            .then(loadCodes)
            .then(function() {
              Alert.notify.success('Authorization Code Removed')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }
  }
})()
