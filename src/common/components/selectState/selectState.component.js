;(function() {
  angular.module('odin.common').component('selectState', {
    templateUrl: 'common/components/selectState/selectState.component.html',
    controller: Controller,
    bindings: { ngRequired: '<', ngModel: '=' }
  })

  function Controller(Alert, SystemStateService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      loadStates()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadStates() {
      return SystemStateService.index().then(function(data) {
        ctrl.states = data
        return data
      })
    }
  }
})()
