import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCollaborateBridge', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserCollaborateService', 'Module', '$q' ]
function controller(Alert, UserCollaborateService, Module , $q) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    //loadBridge()
    $q.all([loadBridge(), loadModule()])
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

  function loadModule() {
    return Module.show('Collaborate - Audio').then(function(data) {
      ctrl.module = data
    })
  }

}
