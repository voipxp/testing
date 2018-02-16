;(function() {
  angular.module('odin.user').component('userSharedCallAppearance', {
    templateUrl:
      'user/components/sharedCallAppearance/sharedCallAppearance.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, UserSharedCallAppereanceService) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.$onInit = activate
    ctrl.update = update
    ctrl.edit = edit

    function activate() {
      ctrl.loading = true
      return loadInstance()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
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
