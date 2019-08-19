import angular from 'angular'
import template from './index.html'

angular.module('odin.events').component('odinEvents', {
  template,
  controller
})

controller.$inject = ['EventService', 'Alert', '$location']
function controller(EventService, Alert, $location) {
  var ctrl = this
  ctrl.open = open
  ctrl.refresh = activate
  ctrl.$onInit = activate
  ctrl.recent = 50

  function activate() {
    ctrl.loading = true
    ctrl.showNav = !/^\/resellers/.test($location.path())

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
