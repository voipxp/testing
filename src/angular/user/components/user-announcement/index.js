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

controller.$inject = [
  'Alert',
  'UserAnnouncementService',
  'EventEmitter',
  '$scope',
  'UserAnnouncementDownloadService',
  'DownloadService',
  'Session'
]
function controller(Alert, UserAnnouncementService, EventEmitter, $scope, UserAnnouncementDownloadService, DownloadService, Session) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.onUpdateAnnouncement = onUpdateAnnouncement
  ctrl.onDeleteAnnouncement = onDeleteAnnouncement
  ctrl.download = download
  ctrl.announcementUrl = Session.data('announcementUrl')
   
  function onInit() {
    ctrl.loading = true
    return loadAnnouncement()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadAnnouncement() {
    return UserAnnouncementService.show(
      ctrl.userId,
      ctrl.name,
      ctrl.mediaType
    ).then(function(data) {
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

  function download() {
    ctrl.fileName =  'announcement_'+ctrl.userId+'_'+ctrl.name
    return UserAnnouncementDownloadService.show(
      ctrl.userId,
      ctrl.name,
      ctrl.mediaType
    )
    .then(function(data) {
      DownloadService.download(data, ctrl.fileName)
    })
  }
}
