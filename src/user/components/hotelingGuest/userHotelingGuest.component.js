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
    ctrl.userDescription = userDescription
    ctrl.options = UserHotelingGuestService.options

    function onInit() {
      ctrl.loading = true
      $q.all([loadSettings(), loadAvailableUsers(), loadModule()])
        .then(function() {
          ctrl.availableUsers.push({ userId: '' })
          if (ctrl.settings.hostUserId) {
            ctrl.availableUsers.push({
              userId: ctrl.settings.hostUserId,
              firstName: ctrl.settings.hostFirstName,
              lastName: ctrl.settings.hostLastName
            })
          } else {
            ctrl.settings.hostUserId = ''
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function userDescription(user) {
      if (!user.userId) return '--NONE--'
      return user.firstName + ' ' + user.lastName + ' (' + user.userId + ')'
    }

    function loadModule() {
      return Module.show('Hoteling Guest').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserHotelingGuestService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        if (ctrl.settings.hostUserId) {
          ctrl.settings.hostDescription = userDescription({
            userId: ctrl.settings.hostUserId,
            lastName: ctrl.settings.hostLastName,
            firstName: ctrl.settings.hostFirstName
          })
        }
      })
    }

    function loadAvailableUsers() {
      return UserHotelingGuestService.index(ctrl.userId).then(function(data) {
        ctrl.availableUsers = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserHotelingGuest', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserHotelingGuestService.update(ctrl.userId, settings)
        .then(onInit)
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
