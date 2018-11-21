;(function() {
  angular.module('odin.user').component('userAutomaticHoldRetrieve', {
    templateUrl:
      'user/components/automaticHoldRetrieve/userAutomaticHoldRetrieve.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    $location,
    $q,
    Alert,
    UserAutomaticHoldRetrieveService,
    Module
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadSettings(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return UserAutomaticHoldRetrieveService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
      })
    }

    function loadModule() {
      return Module.show('Automatic Hold/Retrieve').then(function(data) {
        ctrl.module = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserAutomaticHoldRetrieve', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserAutomaticHoldRetrieveService.update(ctrl.userId, settings)
        .then(function(data) {
          ctrl.settings = data
        })
        // .then(loadSettings)
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
