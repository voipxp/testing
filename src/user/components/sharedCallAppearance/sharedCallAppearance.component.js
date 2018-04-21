;(function() {
  angular.module('odin.user').component('userSharedCallAppearance', {
    templateUrl:
      'user/components/sharedCallAppearance/sharedCallAppearance.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, UserSharedCallAppereanceService, Module, $q) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.update = update
    ctrl.edit = edit

    function activate() {
      ctrl.loading = true
      return $q
        .all([loadInstance(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Shared Call Appearance').then(function(data) {
        ctrl.module = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.sharedCallAppereance)
      Alert.modal.open('editSharedCallAppearanceModal', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function loadInstance() {
      return UserSharedCallAppereanceService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.sharedCallAppereance = data
        console.log('instance', data)
        return data
      })
    }

    function update(instance, callback) {
      Alert.spinner.open()
      UserSharedCallAppereanceService.update(ctrl.userId, instance)
        .then(loadInstance)
        .then(function() {
          Alert.notify.success('Shared Call Appereance Updated')
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
  }
})()
