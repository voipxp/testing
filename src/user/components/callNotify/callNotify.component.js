;(function() {
  angular.module('odin.user').component('userCallNotify', {
    templateUrl: 'user/components/callNotify/callNotify.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserCallNotifyService, Module, $q) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.activate = activate
    ctrl.reload = loadSettings

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

    function loadModule() {
      return Module.show('Call Notify').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserCallNotifyService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserCallNotify', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserCallNotifyService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function activate(criteria) {
      var activation = {
        userId: ctrl.userId,
        criteria: [
          {
            criteriaName: criteria.newCriteriaName || criteria.criteriaName,
            isActive: criteria.isActive
          }
        ]
      }
      return UserCallNotifyService.update(ctrl.userId, activation).then(
        loadSettings
      )
    }
  }
})()
