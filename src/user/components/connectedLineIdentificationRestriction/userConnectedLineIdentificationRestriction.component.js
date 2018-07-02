;(function() {
  angular
    .module('odin.user')
    .component('userConnectedLineIdentificationRestriction', {
      templateUrl:
        'user/components/connectedLineIdentificationRestriction/userConnectedLineIdentificationRestriction.component.html',
      controller: Controller,
      bindings: { userId: '<' }
    })

  function Controller(
    Alert,
    UserConnectedLineIdentificationRestrictionService,
    $q,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserConnectedLineIdentificationRestrictionService.options

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
      return Module.show('Connected Line Identification Restriction').then(
        function(data) {
          ctrl.module = data
        }
      )
    }

    function loadSettings() {
      return UserConnectedLineIdentificationRestrictionService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open(
        'editUserConnectedLineIdentificationRestriction',
        function onSave(close) {
          update(ctrl.editSettings, close)
        }
      )
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      Alert.spinner.open()
      UserConnectedLineIdentificationRestrictionService.update(
        ctrl.userId,
        settings
      )
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
