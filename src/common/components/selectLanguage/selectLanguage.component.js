;(function() {
  angular.module('odin.common').component('selectLanguage', {
    templateUrl:
      'common/components/selectLanguage/selectLanguage.component.html',
    controller: Controller,
    bindings: { ngRequired: '<', ngModel: '=' }
  })

  function Controller(Alert, SystemLanguageService) {
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
        console.log('languages', data)
        ctrl.languages = data
        return data
      })
    }
  }
})()
