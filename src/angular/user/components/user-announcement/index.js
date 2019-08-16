import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userAnnouncement', {
  template,
  controller,
  bindings: {
    userId: '<',
    name: '<',
    mediaType: '<',
    onUpdate: '&',
    onDelete: '&'
  }
})

controller.$inject = ['Alert', 'UserAnnouncementService', 'EventEmitter', '$scope']
function controller(Alert, UserAnnouncementService, EventEmitter, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.onUpdateAnnouncement = onUpdateAnnouncement
  ctrl.onDeleteAnnouncement = onDeleteAnnouncement

  function onInit() {
    ctrl.loading = true
    return loadAnnouncement()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadAnnouncement() {
    return UserAnnouncementService.show(ctrl.userId, ctrl.name, ctrl.mediaType).then(function(
      data
    ) {
      ctrl.announcement = data
    })
  }

  function onUpdateAnnouncement(event) {
    ctrl.onUpdate(EventEmitter(event))
  }

  function onDeleteAnnouncement(event) {
    ctrl.onDelete(EventEmitter(event))
  }

  function edit() {
    $scope.$broadcast('announcementUpdate:load')
  }
}
