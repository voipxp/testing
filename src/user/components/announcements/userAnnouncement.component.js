;(function() {
  angular.module('odin.user').component('userAnnouncement', {
    templateUrl:
      'user/components/announcements/userAnnouncement.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      name: '<',
      mediaType: '<',
      onUpdate: '&',
      onDelete: '&'
    }
  })

  function Controller(Alert, UserAnnouncementService, EventEmitter, $scope) {
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
      return UserAnnouncementService.show(
        ctrl.userId,
        ctrl.name,
        ctrl.mediaType
      ).then(function(data) {
        console.log('announcement', data)
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
})()