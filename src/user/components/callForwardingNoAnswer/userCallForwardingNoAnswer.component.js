;(function() {
  angular.module('odin.user').component('userCallForwardingNoAnswer', {
    templateUrl:
      'user/components/callForwardingNoAnswer/userCallForwardingNoAnswer.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, UserCallForwardingNoAnswerService, $routeParams) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserCallForwardingNoAnswerService.options

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    function onInit() {
      ctrl.loading = true
      loadSettings()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return UserCallForwardingNoAnswerService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      console.log(
        'ctrl.settings.forwardToPhoneNumber',
        ctrl.settings.forwardToPhoneNumber
      )
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserCallForwardingNoAnswer', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      Alert.spinner.open()
      UserCallForwardingNoAnswerService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          if (_.isFunction(callback)) callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
