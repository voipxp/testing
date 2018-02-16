;(function() {
  angular.module('odin.events').component('odinEvents', {
    templateUrl: 'events/events.component.html',
    controller: Controller
  })

  function Controller(EventService, Alert) {
    var ctrl = this
    ctrl.open = open
    ctrl.refresh = activate
    ctrl.$onInit = activate
    ctrl.recent = 50

    function activate() {
      ctrl.loading = true
      EventService.index(ctrl.recent)
        .then(function(data) {
          ctrl.events = data
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function open(event) {
      ctrl.event = event
      Alert.modal.open('showOdinEvent')
    }
  }
})()
