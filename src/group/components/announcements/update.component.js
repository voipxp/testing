;(function() {
  angular.module('odin.group').component('announcementUpdate', {
    templateUrl: 'group/components/announcements/update.component.html',
    controller: Controller,
    bindings: { announcement: '<', onUpdate: '&', onDelete: '&' }
  })

  function Controller(
    Alert,
    HashService,
    $scope,
    EventEmitter,
    UserAnnouncementService,
    GroupAnnouncementService,
    UtilityService
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.upload = upload
    ctrl.options = UserAnnouncementService.options

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function open() {
      ctrl.editAnnouncement = angular.copy(ctrl.announcement)
      ctrl.editAnnouncement.newName = ctrl.editAnnouncement.name
      var removeAction
      var usage = ctrl.editAnnouncement.usage || []
      if (usage.length < 1) {
        removeAction = function onDelete(close) {
          remove(ctrl.announcement, close)
        }
      }
      Alert.modal.open(
        ctrl.modalId,
        function(close) {
          update(ctrl.editAnnouncement, close)
        },
        removeAction
      )
    }

    function update(announcement, callback) {
      Alert.spinner.open()
      var action = ctrl.announcement.userId
        ? updateUser(announcement, callback)
        : updateGroup(announcement, callback)
      action
        .then(function() {
          Alert.notify.success('Announcement Updated')
          callback()
          sendUpdate(announcement)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function upload(file) {
      ctrl.editAnnouncement.content = file.content
      ctrl.editAnnouncement.mediaType = UtilityService.getMediaType(
        file.mimetype
      )
      ctrl.editAnnouncement.description = file.name
    }

    function updateUser(announcement) {
      return UserAnnouncementService.update(announcement.userId, announcement)
    }

    function updateGroup(announcement) {
      return GroupAnnouncementService.update(
        announcement.serviceProviderId,
        announcement.groupId,
        announcement
      )
    }

    function sendUpdate(announcement) {
      return ctrl.onUpdate(EventEmitter({ announcement: announcement }))
    }

    function remove(announcement, callback) {
      Alert.confirm
        .open('Are you sure you want to delete this Announcement?')
        .then(function() {
          Alert.spinner.open()
          var action = ctrl.announcement.userId
            ? removeUser(announcement, callback)
            : removeGroup(announcement, callback)
          action
            .then(function() {
              Alert.notify.success('Announcement Removed')
              callback()
              sendDelete(announcement)
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }

    function removeUser(announcement) {
      return UserAnnouncementService.destroy(announcement.userId, announcement)
    }

    function removeGroup(announcement) {
      return GroupAnnouncementService.destroy(
        announcement.serviceProviderId,
        announcement.groupId,
        announcement
      )
    }

    function sendDelete(announcement) {
      ctrl.onDelete(EventEmitter({ announcement: announcement }))
    }

    $scope.$on('announcementUpdate:load', open)
  }
})()
