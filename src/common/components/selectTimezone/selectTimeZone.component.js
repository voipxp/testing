;(function() {
  angular.module('odin.common').component('selectTimezone', {
    templateUrl:
      'common/components/selectTimezone/selectTimezone.component.html',
    controller: Controller,
    bindings: { ngRequired: '<', ngModel: '=' }
  })

  function Controller(Alert, SystemTimeZoneService) {
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
})()
