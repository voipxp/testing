;(function() {
  angular.module('odin.user').component('userHotelingGuest', {
    templateUrl:
      'user/components/hotelingGuest/userHotelingGuest.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller($q, Alert, UserHotelingGuestService, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.availableUsers = {}
    ctrl.options = UserHotelingGuestService.options

    function onInit() {
      ctrl.loading = true
      $q
        .all([loadSettings(), loadAvailableUsers(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          console.log('ctrl.userId : ', ctrl.userId)
          var object = {
            hiraganaFirstName: '',
            hiraganaLastName: '',
            userId: ''
          }
          ctrl.availableUsers.push(object)

          if (ctrl.settings.hostUserId && ctrl.settings.hostUserId.length > 0) {
            var obj = {
              hiraganaFirstName: ctrl.settings.hostFirstName,
              hiraganaLastName: ctrl.settings.hostLastName,
              userId: ctrl.settings.hostUserId
            }
            ctrl.availableUsers.push(obj)
          }
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Hoteling Guest').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserHotelingGuestService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function loadAvailableUsers() {
      return UserHotelingGuestService.index(ctrl.userId).then(function(data) {
        ctrl.availableUsers = data
        console.log('availableUsers: ', ctrl.availableUsers)
        return ctrl.availableUsers
      })
    }

    function edit() {
      console.log('ctrl.settings:', ctrl.settings)
      ctrl.editSettings = angular.copy(ctrl.settings)
      console.log('ctrl.editSettings:', ctrl.editSettings)
      Alert.modal.open('editUserHotelingGuest', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      console.log('ctrl.userId', ctrl.userId)
      Alert.spinner.open()
      UserHotelingGuestService.update(ctrl.userId, settings)
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
