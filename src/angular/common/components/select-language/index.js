import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectLanguage', {
  template,
  controller,
  bindings: { ngRequired: '<', ngModel: '=' }
})

controller.$inject = ['Alert', 'SystemLanguageService']
function controller(Alert, SystemLanguageService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadLanguages()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadLanguages() {
    return SystemLanguageService.index().then(function(data) {
      ctrl.languages = data
      return data
    })
  }
}
