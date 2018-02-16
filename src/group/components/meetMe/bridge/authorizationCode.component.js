;(function() {
  angular
    .module('odin.group')
    .component('outgoingCallingPlanAuthorizationCode', {
      templateUrl:
        'group/components/meetMe/bridge/authorizationCode.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanAuthorizationCodeService,
    $scope,
    $q,
    Module
  ) {
    var ctrl = this

    ctrl.$onInit = function() {
      ctrl.plan = {}
      ctrl.codes = []
    }

    ctrl.update = update
    ctrl.add = add
    ctrl.remove = remove

    function activate() {
      Alert.spinner.open()
      load()
        .then(function() {
          Alert.modal.open('editOutgoingCallingPlanAuthorizationCode')
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
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
        console.log('plan', data)
        return data
      })
    }

    function loadCodes() {
      return UserOutgoingCallingPlanAuthorizationCodeService.index(
        ctrl.userId
      ).then(function(data) {
        ctrl.codes = data
        console.log('codes', data)
        return data
      })
    }

    function addCode(code, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanAuthorizationCodeService.create(ctrl.userId, code)
        .then(loadCodes)
        .then(function() {
          Alert.notify.success('Authorization Code Added')
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

    function update() {
      Alert.spinner.open()
      UserOutgoingCallingPlanAuthorizationCodeService.update(
        ctrl.userId,
        ctrl.plan
      )
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Authorization Code Updated')
          if (!ctrl.plan.useCustomSettings) {
            Alert.modal.closeAll()
          }
        })
        .catch(function(error) {
          ctrl.plan.useCustomSettings = !ctrl.plan.useCustomSettings
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function add() {
      ctrl.newCode = {}
      Alert.modal.open(
        'addOutgoingCallingPlanAuthorizationCode',
        function onSave(close) {
          addCode(ctrl.newCode, close)
        }
      )
    }

    function remove(code) {
      if (!Module.update('Meet-Me Conferencing')) return
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
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }

    $scope.$on('outgoingCallingPlanAuthorizationCode:load', function(
      event,
      data
    ) {
      ctrl.userId = data
      activate()
    })
  }
})()
