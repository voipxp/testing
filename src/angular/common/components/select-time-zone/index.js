import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectTimezone', {
  template,
  controller,
  bindings: { ngRequired: '<', ngModel: '=' }
})

controller.$inject = ['Alert', 'SystemTimeZoneService']
function controller(Alert, SystemTimeZoneService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadTimeZones()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadTimeZones() {
    return SystemTimeZoneService.index().then(function(data) {
      ctrl.timezones = data
      return data
    })
  }
}
