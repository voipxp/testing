;(function() {
  angular.module('odin.user').component('userSharedCallAppearanceAdmin', {
    templateUrl:
      'user/components/sharedCallAppearance/sharedCallAppearanceAdmin.component.html',
    controller: Controller
  })

  function Controller(Alert, UserSharedCallAppearanceService, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    // used in children to reload sca
    ctrl.reload = loadSharedCallAppearance

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.options = {
      bridgeWarningTone: ['None', 'Barge-In', 'Barge-In and Repeat']
    }

    function onInit() {
      ctrl.loading = true
      return loadSharedCallAppearance()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.userId) {
        ctrl.userId = changes.userId.currentValue
      }
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
    }

    function loadSharedCallAppearance() {
      return UserSharedCallAppearanceService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.sharedCallAppearance = data
        console.log('sharedCallAppearance ', data)
      })
    }

    function edit() {
      ctrl.editSharedCallAppearance = angular.copy(ctrl.sharedCallAppearance)
      Alert.modal.open('userSharedCallAppearanceEditModal', function(close) {
        update(ctrl.editSharedCallAppearance, close)
      })
    }

    function update(service, callback) {
      Alert.spinner.open()

      UserSharedCallAppearanceService.update(ctrl.userId, service)
        .then(loadSharedCallAppearance)
        .then(function() {
          Alert.notify.success('Shared Call Appearance Updated')
          callback()
        })
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
