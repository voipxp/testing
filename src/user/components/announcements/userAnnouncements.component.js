;(function() {
  angular.module('odin.user').component('userAnnouncements', {
    templateUrl:
      'user/components/announcements/userAnnouncements.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      serviceProviderId: '<',
      groupId: '<'
    }
  })

  function Controller(Alert, UserAnnouncementService, $scope, $timeout) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.open = open
    ctrl.onUpdate = onUpdate
    ctrl.onDelete = onDelete

    function onInit() {
      ctrl.repository = { announcements: [] }
      ctrl.loading = true
      return loadAnnouncements()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadAnnouncements() {
      return UserAnnouncementService.index(ctrl.userId).then(function(data) {
        ctrl.repository = data
      })
    }

    function onUpdate(event) {
      ctrl.selectedAnnouncement = null
      var announcement = event.announcement
      $timeout(function() {
        open({
          name: announcement.newName || announcement.name,
          mediaType: announcement.mediaType,
          level: announcement.level
        })
      }, 1)
    }

    function onDelete() {
      ctrl.selectedAnnouncement = null
      onInit()
    }

    function open(announcement) {
      console.log('open', announcement)
      ctrl.selectedAnnouncement = announcement
    }

    function add() {
      $scope.$broadcast('announcementCreate:load')
    }
  }
})()
