import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userIntegratedImp', {
  template,
  controller,
  bindings: {
    userId: '<'
  }
})

controller.$inject = ['Alert', 'UserIntegratedIMPService']
function controller(Alert, UserIntegratedIMPService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.edit = edit

  function onInit() {
    ctrl.loading = true
    return loadIntegratedImp()
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function onChanges(changes) {
    if (changes.userId) {
      ctrl.userId = changes.userId.currentValue
    }
  }

  function loadIntegratedImp() {
    return UserIntegratedIMPService.show(ctrl.userId).then(function(data) {
      ctrl.integratedImp = data
    })
  }

  function edit() {
    ctrl.editIntegratedImp = angular.copy(ctrl.integratedImp)
    Alert.modal.open('userIntegratedImpEditModal', close =>
      update(ctrl.editIntegratedImp, close)
    )
  }

  function update(service, callback) {
    Alert.spinner.open()
    UserIntegratedIMPService.update(ctrl.userId, service)
      .then(loadIntegratedImp)
      .then(() => {
        Alert.notify.success('Integrated Imp Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
