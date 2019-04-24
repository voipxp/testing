import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('userCallControlApplications', {
  template,
  controller,
  bindings: { userId: '=' }
})

controller.$inject = ['Alert', 'UserOCICallControlApplicationService']
function controller(Alert, UserOCICallControlApplicationService) {
  var ctrl = this

  ctrl.$onInit = activate

  function activate() {
    ctrl.applications = []
    loadApplications().catch(function(error) {
      Alert.notify.danger(error)
    })
  }

  function loadApplications() {
    return UserOCICallControlApplicationService.show(ctrl.userId).then(function(
      data
    ) {
      ctrl.applications = data.applicationIdList
      return data
    })
  }
}
