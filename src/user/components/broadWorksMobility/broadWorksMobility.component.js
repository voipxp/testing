;(function() {
  angular.module('odin.user').component('userBroadWorksMobility', {
    templateUrl:
      'user/components/broadWorksMobility/broadWorksMobility.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    $location,
    $q,
    Alert,
    UserBroadWorksMobilityService,
    ACL,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserBroadWorksMobilityService.options
    ctrl.hasPermission = ACL.has

    function onInit() {
      ctrl.loading = true
      $q.all([loadSettings(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('BroadWorks Mobility').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserBroadWorksMobilityService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserBroadworksMobility', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      if (ACL.is('User')) {
        delete settings.isActive
        delete settings.mobilePhoneNumber
        delete settings.useSettingLevel
        delete settings.denyCallOriginations
        delete settings.denyCallTerminations
      }

      Alert.spinner.open()
      UserBroadWorksMobilityService.update(ctrl.userId, settings)
        // .then(loadSettings)
        .then(function(data) {
          ctrl.settings = data
        })
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
