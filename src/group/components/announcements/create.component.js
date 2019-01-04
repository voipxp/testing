;(function() {
  angular.module('odin.group').component('announcementCreate', {
    templateUrl: 'group/components/announcements/create.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      groupId: '<',
      serviceProviderId: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    Alert,
    HashService,
    $scope,
    EventEmitter,
    UserAnnouncementService,
    GroupAnnouncementService
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.upload = upload
    ctrl.options = UserAnnouncementService.options

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function open() {
      ctrl.announcement = { level: 'User' }
      if (ctrl.userId) {
        ctrl.announcement.userId = ctrl.userId
      } else {
        ctrl.announcement.serviceProviderId = ctrl.serviceProviderId
        ctrl.announcement.groupId = ctrl.groupId
      }
      Alert.modal.open(ctrl.modalId, function(close) {
        create(ctrl.announcement, close)
      })
    }

    function create(announcement, callback) {
      Alert.spinner.open()
      var action = ctrl.userId
        ? createUser(announcement, callback)
        : createGroup(announcement, callback)
      action
        .then(function() {
          Alert.notify.success('Announcement Uploaded')
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
      ctrl.announcement.name = file.name
      ctrl.announcement.content = file.content
      ctrl.announcement.mediaType = 'WAV'
      ctrl.announcement.description = file.name
    }

    function createUser(announcement) {
      return UserAnnouncementService.store(ctrl.userId, announcement)
    }

    function createGroup(announcement) {
      return GroupAnnouncementService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        announcement
      )
    }

    function sendUpdate(announcement) {
      return ctrl.onUpdate(EventEmitter({ announcement: announcement }))
    }

    $scope.$on('announcementCreate:load', open)
  }
})()
