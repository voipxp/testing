import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('userFeatureAccessCodes', {
  template,
  controller,
  bindings: { userId: '=' }
})

controller.$inject = ['Alert', 'UserFeatureAccessCodeService']
function controller(Alert, UserFeatureAccessCodeService) {
  var ctrl = this

  ctrl.$onInit = activate

  function activate() {
    ctrl.loading = true
    load()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function load() {
    return UserFeatureAccessCodeService.index(ctrl.userId).then(function(data) {
      ctrl.accessCodes = data
      return data
    })
  }
}
