import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCollaborateBridge', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserCollaborateService']
function controller(Alert, UserCollaborateService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadBridge()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadBridge() {
    return UserCollaborateService.bridge(ctrl.userId).then(function(data) {
      ctrl.bridge = data
    })
  }
}
