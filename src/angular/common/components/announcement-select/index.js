import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('announcementSelect', {
  template,
  controller,
  bindings: {
    userId: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'UserAnnouncementService',
  'EventEmitter',
  '$scope',
  'HashService'
]
function controller(
  Alert,
  UserAnnouncementService,
  EventEmitter,
  $scope,
  HashService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function loadAnnouncements() {
    return UserAnnouncementService.available(ctrl.userId).then(function(data) {
      ctrl.announcements = data.announcements
    })
  }

  function open() {
    Alert.spinner.open()
    loadAnnouncements()
      .then(function() {
        Alert.modal.open(ctrl.modalId)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function select(announcement) {
    Alert.modal.close(ctrl.modalId)
    ctrl.onUpdate(EventEmitter({ announcement: announcement }))
  }

  $scope.$on('announcementSelect:load', open)
}
