;(function() {
  angular.module('odin.user').component('userAnnouncement', {
    templateUrl:
      'user/components/announcements/userAnnouncement.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      name: '<',
      mediaType: '<'
    }
  })

  function Controller(Alert, UserAnnouncementService, Route, $scope) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.edit = edit
    ctrl.onUpdate = onUpdate
    ctrl.onDelete = onDelete

    function onInit() {
      ctrl.loading = true
      return loadAnnouncement()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
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

    function open(announcement) {
      var name = _.get(announcement, 'newName')
      var mediaType = _.get(announcement, 'mediaType')
      return Route.open('announcements', 'users', ctrl.userId)(name, mediaType)
    }

    function onUpdate(event) {
      if (event.announcement.newName === ctrl.announcement.name) {
        onInit()
      } else {
        open(event.announcement)
      }
    }

    function onDelete() {
      open()
    }

    function edit() {
      $scope.$broadcast('announcementUpdate:load')
    }
  }
})()
