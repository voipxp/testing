;(function() {
  angular.module('odin.user').component('userBroadWorksMobility', {
    templateUrl:
      'user/components/broadWorksMobility/broadWorksMobility.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $location,
    $routeParams,
    $q,
    Alert,
    UserBroadWorksMobilityService,
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.options = UserBroadWorksMobilityService.options
    ctrl.hasPermission = ACL.has
    console.log('ctrl.options.phonesToRing', ctrl.options.phonesToRing)
    console.log('ctrl.options.userSettingLevel', ctrl.options.userSettingLevel)

    function onInit() {
      ctrl.userId = $routeParams.userId
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
      return UserBroadWorksMobilityService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserBroadworksMobility', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      if (ACL.is('User')) {
        delete settings.isActive
        delete settings.mobilePhoneNumber
        delete settings.useSettingLevel
        delete settings.denyCallOriginations
        delete settings.denyCallTerminations
        console.log('USER', settings)
      }

      Alert.spinner.open()
      UserBroadWorksMobilityService.update(ctrl.userId, settings)
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
